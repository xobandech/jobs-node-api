const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
  res.status(StatusCodes.OK).json({jobs, count: jobs.length})
};

const createJob = async (req, res) => {

  req.body.createdBy = req.user.userId
  console.log(req.body);
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json(job)
};

const getJob = async (req, res) => {
  const user = req.user
  const jobId = req.params.id
  const job = await Job.find({_id: jobId, createdBy: user.userId})
  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json(job)
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
