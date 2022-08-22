import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FieldRow from "../../components/form/FieldRow";
import ErrorRow from "../../components/form/ErrorRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IssueSchema } from "./schema/IssueSchma";
import { ImSpinner6 } from "react-icons/im";
import { createIssue } from "./../../services/api";
import { useNavigate, Navigate } from "react-router-dom";
import FileLoader from "./../../components/FileLoader";

const New = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation((newIssue) => createIssue(newIssue), {
    onSuccess: (data) => {
      // Invalidate and refetch
      if (data.error) {
      } else {
        queryClient.invalidateQueries(["issues"]);
        navigate(`/issues/${data.id}`);
      }
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl underline">Create Issue</h1>
      <Formik
        initialValues={{
          title: "",
          file: undefined,
        }}
        validationSchema={IssueSchema}
        onSubmit={(values) => {
          mutation.mutate({
            title: values.title,
            file: values.file,
          });
        }}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <FieldRow>
              <label>Title</label>
              <Field
                name="title"
                className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
              />
              {touched.title && errors.title && (
                <div className="text-xs text-red-600">{errors.title}</div>
              )}
            </FieldRow>
            <FieldRow>
              <input
                type="file"
                onChange={(e) =>
                  setFieldValue("file", e.currentTarget.files[0])
                }
              />
              <FileLoader file={values.file} />
            </FieldRow>
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-500 px-2 py-3 rounded w-full max-w-sm flex items-center justify-center gap-2 text-white"
            >
              {isSubmitting && !errors && (
                <ImSpinner6 className="animate-spin inline-block" />
              )}
              <span className="">Create</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default New;
