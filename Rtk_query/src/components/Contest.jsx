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

  if (!data) return null;

  const {
    totalContests,
    ranking,
    globalRanking,
    rating,
    topPercentage,
    contestBadge,
    contests,
  } = data;

  return (
    <div className="flex flex-col items-center gap -12">
      <div className="mt-10 p-6 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg max-w-2xl w-full text-white font-mono flex flex-col items-center justify-around">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-200 border-b-1">
          CONTEST STATS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <p>
            <strong className="text-[#7471F7]">Rating:</strong>{" "}
            {Math.ceil(data?.userContestRanking?.rating)}
          </p>
          <p>
            <strong className="text-[#7471F7]">Ranking:</strong>{" "}
            {data?.userContestRanking?.globalRanking}
          </p>
          <p>
            <strong className="text-[#7471F7]">Global Ranking:</strong>{" "}
            {data?.userContestRanking?.globalRanking}
          </p>
          <p>
            <strong className="text-[#7471F7]">Top %:</strong>{" "}
            {data?.userContestRanking?.topPercentage}%
          </p>
          <p>
            <strong className="text-[#7471F7]">Contests Attended:</strong>{" "}
            {data?.userContestRanking?.attendedContestsCount}
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-900 p-6 mt-4 overflow-y-scroll rounded-lg shadow-md h-[650px]">
        {(data || !data)?.userContestRankingHistory
          .filter((post) => post.attended == true)
          .map((item, index) => (
            <div
              key={index}
              className=" bg-gradient-to-br from-gray-800 to-gray-800 p-4 rounded-xl shadow hover:scale-[1.03] transform transition"
            >
              
              <div className="badge badge-outline badge-accent p-2 m-2 font-bold">Contest {index+1}</div>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Rating:</strong> {Math.floor(item.rating)}
              </p>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Problem solved :</strong> {Math.floor(item.problemsSolved)}
              </p>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Rating Down/up :</strong> {(item.trendDirection)}
              </p>
              <p className="text-lg  font-mono">
                <strong className="text-[#7471F7]">Total problems :</strong> {Math.floor(item.totalProblems)}
              </p>
              <p className="text-lg font-mono">
                <strong className="text-[#7471F7]">Rank : </strong>{Math.floor(item.ranking)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contest;
