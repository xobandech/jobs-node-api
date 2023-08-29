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
        setJobsData((prevJobsData) => {
          if (!prevJobsData?.jobs) return prevJobsData;

          const existingJobs = prevJobsData.jobs;
          const updatedJobs = [...existingJobs];

          const updatedJobIndex = updatedJobs.findIndex(
            (job) => job._id === updatedJob._id
          );
          if (updatedJobIndex !== -1) {
            updatedJobs[updatedJobIndex] = updatedJob;
          }

          return {
            jobs: updatedJobs,
            count: (prevJobsData.count || 0) + 1,
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
    <div className="flex max-md:w-full max-md:flex-col-reverse bg-[#6A759B] h-[95vh] max-md:items-center max-md:h-full">
      <div className="w-2/3 max-lg:w-[55%]">
        <p className=" flex justify-center text-xl font-semibold">Jobs</p>
        <div className="grid grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 max-lg:flex max-lg:items-center max-lg:flex-col max-sm:justify-center max-xl:grid-cols-2">
          {jobsData &&
            jobsData.jobs &&
            jobsData.jobs.map((job) => {
              return <JobCard {...job} />;
            })}
        </div>
      </div>
      <NewJobForm />
    </div>
  );
};

export default JobsPage;
