import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { search } from "./../services/api";
import { Link } from "react-router-dom";

const ListItemSearch = ({ issue }) => {
  return (
    <Link
      to={`/issues/${issue.id}`}
      className="block text-black hover:bg-slate-300 dark:text-white p-1 px-2 my-1 rounded cursor-pointer hover:dark:bg-slate-600"
    >
      {issue.title}
    </Link>
  );
};

const SearchList = ({ issues, isLoading }) => {
  return (
    <div>
      <div className="text-bold text-black dark:text-white">Issues</div>
      {issues.map((issue) => {
        return <ListItemSearch key={issue.id} issue={issue} />;
      })}
    </div>
  );
};

const Search = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery(
    ["search"],
    () => search(text),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    // if (text.length > 2) {
    refetch();
    // }
  }, [text]);

  const onChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  return (
    <div className="mx-8">
      <div className="flex gap-2 items-center justify-between bg-gray-100 appearance-none border-2 border-gray-100 rounded px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:ring-0 cursor-pointer">
        <AiOutlineSearch />
        <input
          type="text"
          value={text}
          placeholder="Search"
          onChange={onChange}
          className="flex-1 bg-gray-100 appearance-none border-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:ring-0"
        />
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        data.length > 0 && (
          <div className="dark:bg-slate-700 rounded shadow my-2 p-2">
            <SearchList isLoading={isLoading} issues={data} />
          </div>
        )
      )}
    </div>
  );
};

export default Search;
