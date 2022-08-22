import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getIssue, getIssues, deleteIssue } from "../../services/api";
import IssueDetails from "./components/IssueDetails.tsx";
import { formatDate } from "../../utils/textUtils";

const Show = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(["issue"], () => getIssue(id));
  const navigate = useNavigate();

  const mutation = useMutation((_id) => deleteIssue(_id), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["todos"]);
      navigate(`/issues`);
    },
  });

  const onClickDelete = () => {
    mutation.mutate(id);
  };

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Not Found</div>;

  return (
    <div className="pb-16">
      <div className="flex justify-between items-center m-8">
        <div className="text-4xl ">Details</div>
        <div className="flex justify-between gap-2">
          <Link
            to={`/issues/${id}/edit`}
            className="block bg-blue-500 rounded px-3 py-2 text-white"
          >
            Edit
          </Link>
          <button
            onClick={onClickDelete}
            className="block bg-red-500 rounded px-3 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-4 items-center m-8">
        <IssueDetails issue={data} />
      </div>
    </div>
  );
};

export default Show;
