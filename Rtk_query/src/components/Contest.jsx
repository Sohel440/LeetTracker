import React from "react";
import { useGetContestDetailsQuery } from "../features/contest/ContestApi";

const Contest = ({ submitData }) => {
  const { data, isLoading, isError } = useGetContestDetailsQuery(submitData, {
    skip: !submitData,
  });

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <span className="loading loading-bars loading-xs text-blue-600"></span>
        <span className="loading loading-bars loading-sm text-blue-600"></span>
        <span className="loading loading-bars loading-md text-blue-600"></span>
        <span className="loading loading-bars loading-lg text-blue-600"></span>
        <span className="loading loading-bars loading-xl text-blue-600"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8 text-center text-red-500 font-bold">
        Failed to load contest data.
      </div>
    );
  }

  const ranking = data?.userContestRanking;
  const history = data?.userContestRankingHistory?.filter((post) => post.attended);

  return (
    <div className="flex flex-col items-center gap-12">
      {!ranking && (
        <div className="mt-8 text-gray-400 text-xl font-semibold">
          Not attended any contest
        </div>
      )}

      {ranking && (
        <div className="mt-10 p-6 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg max-w-2xl w-full text-white font-mono flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-200 border-b-2 border-gray-600 pb-2">
            CONTEST STATS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <p>
              <strong className="text-[#7471F7]">Rating:</strong>{" "}
              {Math.ceil(ranking.rating)}
            </p>
            <p>
              <strong className="text-[#7471F7]">Ranking:</strong>{" "}
              {ranking.globalRanking}
            </p>
            <p>
              <strong className="text-[#7471F7]">Top %:</strong>{" "}
              {ranking.topPercentage}%
            </p>
            <p>
              <strong className="text-[#7471F7]">Contests Attended:</strong>{" "}
              {ranking.attendedContestsCount}
            </p>
          </div>
        </div>
      )}

      {history && history.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-900 p-6 mt-4 rounded-lg shadow-md max-h-[650px] overflow-y-auto w-full">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-800 p-4 rounded-xl shadow hover:scale-[1.03] transform transition"
            >
              <div className="badge badge-outline badge-accent p-2 m-2 font-bold">
                Contest {index + 1}
              </div>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Rating:</strong>{" "}
                {Math.floor(item.rating)}
              </p>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Problem Solved:</strong>{" "}
                {Math.floor(item.problemsSolved)}
              </p>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Rating Change:</strong>{" "}
                {item.trendDirection}
              </p>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Total Problems:</strong>{" "}
                {Math.floor(item.totalProblems)}
              </p>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Rank:</strong>{" "}
                {Math.floor(item.ranking)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contest;
