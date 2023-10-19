const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/asyncErrorBoundary");

function queryChecker(req,res,next) {
    const queryCheck = req.query.is_showing
    if (queryCheck === "true") {
        res.locals.queryCheck = true;
        next();
    }
    else {
        res.locals.queryCheck = false;
        next();
    }
}

async function list(req, res, next) {
    const response = await service.list(res.locals.queryCheck)
    res.json({ data: response });
}

async function movieValidate(req,res,next) {
    const response = await service.read(req.params.movieId)
    if (!response) {
        next({status: 404, message: "Movie cannot be found."})
    }
    else {
        res.locals.movie = response;
        next();
    }
}

function read(req, res, next) {
    response = res.locals.movie;
    res.json({ data: response });
}
async function theaterList(req, res, next) {
    const response = await service.theaterList(req.params.movieId);
    res.json({ data: response });
}
async function reviewList(req, res, next) {
    const response = await service.reviewList(req.params.movieId);
    res.json({ data: response });
}
  module.exports = {
    list: [queryChecker,asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieValidate), read],
    theaterList: [asyncErrorBoundary(movieValidate), asyncErrorBoundary(theaterList)],
    reviewList: [asyncErrorBoundary(movieValidate), asyncErrorBoundary(reviewList)]
  };
  