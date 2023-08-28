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
      socket.on("sendUpdatedJob", function (updatedJob: Job) {
        setJobsData(prevJobsData => {
          if (!prevJobsData?.jobs) return prevJobsData;
      
          const existingJobs = prevJobsData.jobs;
          const updatedJobs = [...existingJobs];
          
          const updatedJobIndex = updatedJobs.findIndex(job => job._id === updatedJob._id);
          if (updatedJobIndex !== -1) {
            updatedJobs[updatedJobIndex] = updatedJob;
          }
      
          return {
            jobs: updatedJobs,
            count: (prevJobsData.count || 0) + 1
          };
        });
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
    <div className="">
      <NewJobForm />
      <div className="w-full">
        <div className="flex justify-center text-xl font-semibold">Jobs</div>
        <div className="grid grid-cols-4 max-xl:grid-cols-3 max-sm:flex max-sm:items-center max-sm:flex-col max-sm:justify-center max-lg:grid-cols-2">
          {jobsData &&
            jobsData.jobs &&
            jobsData.jobs.map((job) => {
              return <JobCard {...job} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
