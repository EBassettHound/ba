const asyncErrorBoundary = require("../utils/asyncErrorBoundary");
const service = require("./reviews.service");


async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
  
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: `Review cannot be found: ${reviewId}.` });
  }
  
  async function update(req, res) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    await service.update(updatedReview);
    const {review} = res.locals
    const response = await service.returnUpdate(review.review_id);
   
    res.json({ data: response });
  }

  
  
  async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review);
    res.sendStatus(204);
  }
  
module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  };