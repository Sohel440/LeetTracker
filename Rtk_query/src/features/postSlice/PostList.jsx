import React, { useState } from "react";
import { useGetLeetCodeProfileQuery } from "./postApi";
import Contest from "../../components/Contest";

export default function PostsList() {
  const [inputData, setInputData] = useState({
    username: "",
  });

  const [submitData, setSubmitData] = useState("");

  const handleChangeData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    setSubmitData(inputData.username);
  };

  const { data, isLoading, isError } = useGetLeetCodeProfileQuery(submitData, {
    skip: !submitData,
  });

  return (
    <div className=" min-h-screen flex flex-col items-center py-8">
      <form onSubmit={handleSubmitData} className="flex flex-col items-center gap-5">
        <p className="animate-pulse  text-3xl text-center md:text-4xl lg:text-6xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Enter your LeetCode Username
        </p>
        <div className="flex flex-col items-center p-5 m-5 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter your Username"
            name="username"
            onChange={handleChangeData}
            className="sm:w-[300px] lg:w-[400px] input input-bordered input-primary border-blue-600 focus:ring-blue-600"
          />
          <button className="btn btn-primary m-3 w-full" type="submit">
            Submit
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex gap-2">
          <span className="loading loading-bars loading-xs text-blue-600"></span>
          <span className="loading loading-bars loading-sm text-blue-600"></span>
          <span className="loading loading-bars loading-md text-blue-600"></span>
          <span className="loading loading-bars loading-lg text-blue-600"></span>
          <span className="loading loading-bars loading-xl text-blue-600"></span>
        </div>
      ) : (data ) ? (
        <div className="p-6 rounded-lg  bg-gradient-to-tr from-gray-700 to-gray-800 shadow-lg flex flex-col gap-6 items-center max-w-2xl w-full  ">
          <div className="text-center">
            <p className=" text-4xl  font-extrabold p-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500">
              Total <span className="">Number of<br />Questions</span> Solved: <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">{data ? data.totalSolved : "1000"}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 border-t-2 border-purple-600 border-dashed p-3 md:grid-cols-2 gap-6 font-bold font-mono">
            <p className="text-xl">
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-600 to-white p-2 font-mono">Easy</span>: <span className=" light: text-white">{data ? `${data.easySolved} out of ${data.totalEasy}` : "400 out of 600"}</span> 
            </p>
            <p className="text-xl">
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-amber-500 to-white p-2 font-mono">Medium</span>: <span className=" light: text-white">{data ? `${data.mediumSolved} out of ${data.totalMedium}` : "500 out of 1200"}</span>
            </p>
            <p className="text-xl">
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-white p-2 font-mono">Hard</span>: <span className=" light: text-white"> {data ? `${data.hardSolved} out of ${data.totalHard}` : "100 out of 300"}</span>
            </p>
            <p className="text-xl">
              <span className="font-bold text-[#7471f7] p-1 font-mono">Acceptance Rate</span>: <span className=" light: text-white">{data ? data.acceptanceRate : "85%"}</span> 
            </p>
            <p className="text-xl">
              <span className="font-bold text-[#7471f7] p-1 font-mono">Ranking</span>: <span className=" light: text-white">{data ? data.ranking : "12,345"}</span> 
            </p>
            <p className="text-xl">
              <span className="font-bold text-[#7471f7] p-1 font-mono">Contribution Points</span><span className=" light: text-white">: {data ? data.contributionPoints : "250"}</span> 
            </p>
            <p className="text-xl">
              <span className="font-bold text-[#7471f7] p-1 font-mono">Likes</span>: <span className=" light: text-white">{data ? data.reputation : "50"}</span> 
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <Contest submitData={submitData}/>
    </div>
  );
}