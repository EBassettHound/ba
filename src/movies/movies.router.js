const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../utils/methodNotAllowed");
//const theaterRouter = require("../theaters/theaters.router");

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);


// or router.use("/:movieId/theaters", theaterRouter)
router.route("/:movieId/theaters")
    .get(controller.theaterList)
    .all(methodNotAllowed);

router.route("/:movieId/reviews")
    .get(controller.reviewList)
    .all(methodNotAllowed);

module.exports = router;
