const Jobs = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Jobs.find(
        {createdBy: req.user.userID}
    ).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}
const getJob = async (req, res) => {
    const {user:{userID}, params:{id: jobID}} = req
    const job = await Jobs.findOne({
        _id:jobID, createdBy:userID
    })
    if(!job) {
        throw new NotFoundError(`No job with job id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req, res) => {
    const {
        body:{company, position},
        user:{userID},
        params:{id: jobID}
    } = req
    if(company === '' || position === ''){
        throw new BadRequestError("Please provide company name and position")
    }
    const job = await Jobs.findOneAndUpdate(
        {_id: jobID, createdBy: userID},
        req.body,
        {new: true, runValidators: true}
    )
    if(!job) {
        throw new NotFoundError(`No job with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({job})
}
const deleteJob = async (req, res) => {
    const {
        user:{userID},
        params:{id:jobID}
    } = req
    const job = await Jobs.findOneAndDelete({_id: jobID, createdBy: userID})
    if(!job) {
        throw new NotFoundError(`No user with the job id ${jobID}`)
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllJobs, getJob, createJob, updateJob, deleteJob
}