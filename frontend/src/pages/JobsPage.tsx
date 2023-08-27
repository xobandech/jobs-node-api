import { useEffect, useState } from "react";
import { Job } from "../types/types";
import JobCard from "../components/JobCard";
import NewJobForm from "../components/NewJobForm";

const JobsPage = () => {
  const [jobsData, setJobsData] = useState<{ jobs: Job[]; count: number }>();
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
      console.log(jobsData)
    };
    fetchJobsData();
  }, []);

  return (
    <div>
      {jobsData &&
        jobsData.jobs &&
        jobsData.jobs.map((job) => {
          return <JobCard {...job} />;
        })}
      <NewJobForm />
    </div>
  );
};

export default JobsPage;
