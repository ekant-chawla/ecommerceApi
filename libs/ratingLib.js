//A simple logic to calculate new avg rating. Could have been better if I made a rating modle in mongoose.
let increaseRating = function (newRating, currentAvgRating, currentRatingCount) {
    let newRatingCount = currentRatingCount+1;
    let  newAvgRating = (currentAvgRating * currentRatingCount + newRating)/(newRatingCount);
    newAvgRating = Number(newAvgRating.toFixed(1));
    return {
        avgRating:newAvgRating,
        ratingCount:newRatingCount
    }

}

module.exports = {
    increaseRating: increaseRating
}