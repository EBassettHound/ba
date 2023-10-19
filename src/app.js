if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const notFound = require("./utils/notFound");
const errorHandler = require("./utils/errorHandler");


app.use("/movies", moviesRouter);
//app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
