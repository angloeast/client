import React, { ReactComponentElement } from "react";
import { getIssues } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "./../models/index";
import { formatDate } from "../utils/textUtils";

const Issues = () => {
  const { data, isLoading, isError } = useQuery<Issue[] | undefined>(
    ["issues"],
    getIssues
  );
  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Error Occured</div>;
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4 items-center m-8">
      {data.map((d) => {
        return (
          <div key={d.id} className="flex gap-2 flex-col">
            <div>
              <img
                src={d.imageUri}
                alt="cover"
                className="w-96 h-40 cover-fill"
              />
            </div>
            <div className="flex flex-col py-2">
              <div>
                <span className="text-slate-900 font-bold dark:text-slate-300">
                  Issue {d.issueNumber}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-slate-500">Issue {d.issueNumber}</span>
                <span className="w-0.5 h-4 bg-slate-500"></span>
                <span className="text-slate-500">
                  {formatDate(new Date(d.issueDate))}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const IndexPage = () => {
  return (
    <div>
      <div>
        <div className="text-4xl m-8">Past Issues</div>
        <div>Create Issue</div>
      </div>
      <Issues />
    </div>
  );
};

export default IndexPage;
