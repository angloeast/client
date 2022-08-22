import React from "react";
import { Issue } from "../../../models";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/textUtils";
import { fileServerUploadPath } from "../../../utils/constants";
const IssueDetails = ({ issue }) => {
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

export default IssueDetails;
