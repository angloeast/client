import React from "react";
import { getIssues } from "./../../services/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/textUtils";
import Search from "../../components/Search";
import { fileServerUploadPath } from "./../../utils/constants";

const ListItemIssue = ({ issue }) => {
  return (
    <div className="flex gap-2 flex-col hover:shadow cursor-pointer p-2 rounded-lg">
      <Link to={`/issues/${issue.id}`}>
        <div>
          <img
            src={`${fileServerUploadPath}/${issue.imageUri}`}
            alt="cover"
            className="w-96 h-40 cover-fill"
          />
        </div>
        <div className="flex flex-col py-2">
          <div>
            <span className="text-slate-900 font-bold dark:text-slate-300">
              {issue.title}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-slate-500">Issue {issue.issueNumber}</span>
            <span className="w-0.5 h-4 bg-slate-500"></span>
            <span className="text-slate-500">
              {formatDate(new Date(issue.issueDate))}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Issues = () => {
  const { data, isLoading, error } = useQuery(["issues"], getIssues);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-x-2 gap-y-4 items-center m-8">
        <div>Loading</div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4 items-center m-8">
      {data.map((d) => (
        <ListItemIssue key={d.id} issue={d} />
      ))}
    </div>
  );
};

const IndexPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center m-8">
        <div className="text-4xl ">Past Issues</div>
        <Link
          to="/issues/new"
          className="block bg-blue-500 rounded px-3 py-2 text-white"
        >
          Create Issue
        </Link>
      </div>
      <Search />
      <Issues />
    </div>
  );
};

export default IndexPage;
