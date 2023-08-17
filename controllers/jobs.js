const getAllJobs = (req, res) => {
  res.send("getAllJobs");
};

const createJob = (req, res) => {
  res.send("createJob");
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
