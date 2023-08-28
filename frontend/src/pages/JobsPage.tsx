import { useEffect, useState } from "react";
import { Job } from "../types/types";
import JobCard from "../components/JobCard";
import NewJobForm from "../components/NewJobForm";
import { io } from "socket.io-client"
const JobsPage = () => {
  const [jobsData, setJobsData] = useState<{ jobs: Job[]; count: number }>();
  const socket = io("http://localhost:3001");
  useEffect(() => {
    socket.on("connect", function () {
      socket.on("sendJob", function (job) {
        setJobsData((prevJobsData) => (prevJobsData && {
          jobs: [...prevJobsData.jobs, job],
          count: prevJobsData.count + 1
        }));
      });
    });
  }, []);
  
  
  useEffect(() => {
    const fetchJobsData = async () => {
      const response = await fetch("http://localhost:3001/api/v1/jobs", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        },
      });
      const jobsData = await response.json();
      setJobsData(jobsData);
    };
    fetchJobsData();
  }, []);

  return (
    <div className="flex">
      <div className="max-w-[320px] w-full">
        {jobsData &&
          jobsData.jobs &&
          jobsData.jobs.map((job) => {
            return <JobCard {...job} />;
          })}
      </div>
      <NewJobForm />
    </div>
  );
};

export default JobsPage;
