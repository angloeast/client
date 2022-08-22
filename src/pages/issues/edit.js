import React from "react";
import { updateIssue, getIssue } from "./../../services/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import FieldRow from "../../components/form/FieldRow";
import { EditIssueSchema } from "./schema/IssueSchma";
import { ImSpinner6 } from "react-icons/im";
import FileLoader from "../../components/FileLoader";
import { fileServerUploadPath } from "./../../utils/constants";

const Edit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(["issues"], () => getIssue(id));

  const mutation = useMutation((editIssue) => updateIssue(editIssue), {
    onSuccess: (res) => {
      // Invalidate and refetch
      if (res.error) {
      } else {
        queryClient.invalidateQueries(["issues"]);
        navigate(`/issues/${res.id}`);
      }
    },
  });

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Not Found</div>;
  return (
    <div className="pb-16">
      <div className="flex justify-between items-center m-8">
        <div className="text-4xl ">Edit</div>
        <div className="flex justify-between gap-2"></div>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-4 items-center m-8">
        <Formik
          initialValues={{
            title: data.title,
            id: data.id,
          }}
          validationSchema={EditIssueSchema}
          onSubmit={(values) => {
            mutation.mutate({
              title: values.title,
              id: values.id,
            });
          }}
        >
          {({ errors, values, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <Field type="hidden" name="id" />
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
                <img
                  src={`${fileServerUploadPath}/${data.imageUri}`}
                  className="object-fit max-w-full md:max-w-md"
                />
              </FieldRow>
              <button
                type="submit"
                className="bg-blue-500 px-2 py-3 rounded w-full max-w-sm text-white"
              >
                {isSubmitting && !errors && (
                  <ImSpinner6 className="animate-spin" />
                )}
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Edit;
