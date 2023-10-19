const service = require("./theaters.service");
const asyncErrorBoundary = require("../utils/asyncErrorBoundary");

async function list(req, res, next) {
    const response = await service.list()
    res.json({ data: response });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    
  };