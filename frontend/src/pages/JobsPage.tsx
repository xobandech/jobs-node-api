import { useEffect, useState } from "react";
import { Job } from "../types/types";
import JobCard from "../components/JobCard";
import NewJobForm from "../components/NewJobForm";
import socket from "../modules/socket";
const JobsPage = () => {
  const [jobsData, setJobsData] = useState<{ jobs: Job[]; count: number }>();
  useEffect(() => {
    socket.on("connect", function () {
      socket.on("sendJob", function (job) {
        setJobsData(
          (prevJobsData) =>
            prevJobsData && {
              jobs: [...prevJobsData.jobs, job],
              count: prevJobsData.count + 1,
            }
        );
      });
      socket.on("sendDeletedJob", function (deletedJobId) {
        console.log(deletedJobId);
        deletedJobId &&
          setTimeout(() => {
            setJobsData(
              (prevJobsData) =>
                prevJobsData && {
                  jobs: prevJobsData.jobs.filter((job) => {
                    return job._id != deletedJobId;
                  }),
                  count: prevJobsData.count - 1,
                }
            );
          }, 1500);
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
