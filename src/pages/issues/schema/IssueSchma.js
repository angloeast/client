import * as Yup from "yup";

export const IssueSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  file: Yup.mixed().required(),
});

export const EditIssueSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  id: Yup.string()
    .required("Required"),
});
