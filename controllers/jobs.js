const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job")

const getAllJobs = async (req, res) => {
  const userId = req.user.userId
  const jobs = await Job.find()
  const filteredJobs = jobs.filter(job => {
    return (job.createdBy == userId);
  })
  res.status(StatusCodes.OK).json(filteredJobs)
};

const createJob = async (req, res) => {

  req.body.createdBy = req.user.userId
  console.log(req.body);
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json(job)
};

const getJob = (req, res) => {
  res.send("getJob");
};

const updateJob = (req, res) => {
  res.send("updateJob");
};

const deleteJob = (req, res) => {
  res.send("deleteJob");
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob
};
