const knex = require("../db/connection");
const { addCritic } = require("../reviews/reviews.service");

function list(isShowing) {
    if (!isShowing) {
        return knex("movies")
        .select("*")
    }
    else {
        return knex("movies as m")
        .distinct()
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({"mt.is_showing": true })
    }   
}

function read(movieId) {
    return knex("movies")
    .select("*")
    .where({"movies.movie_id":movieId})
    .first()
}

function theaterList(movieId){
    return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id")
    .where({"mt.movie_id":movieId})
}



function reviewList(movieId){
    return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where("m.movie_id", movieId)
    .then((critic) => critic.map(addCritic));
    
}
module.exports = {
    list,
    read,
    theaterList,
    reviewList
  };