const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");

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

const updateJob = async (req, res) => {
  const user = req.user
  const jobId = req.params.id
  const job = await Job.findOne({_id: jobId, createdBy: user.userId})
  if(!job) {
    throw new NotFoundError(`You dont have access to job with id ${jobId}`)
  }
  const data = req.body
  if (!data.company && !data.position) throw new BadRequestError("Please provide company and/or position")
  const modifiedJob = await Job.findByIdAndUpdate(jobId, data, { new: true });
  res.status(StatusCodes.OK).json(modifiedJob)
};

const deleteJob = async (req, res) => {
  const user = req.user
  const jobId = req.params.id
  const deletedJob = await Job.findByIdAndDelete({_id: jobId, createdBy: user.userId})
  console.log(deletedJob);
  if(!deletedJob) {
    throw new NotFoundError(`You dont have access to job with id ${jobId}`)
  }
  res.status(StatusCodes.NO_CONTENT).json({msg: "Job deleted successfully"})
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob
};
