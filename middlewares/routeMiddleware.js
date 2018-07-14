const mongoose = require('mongoose');
const OrderModel = mongoose.model('order')
const shortId = require('short-id')
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');


//Checks if cart id is present and valid. If not present creates a cart id and appends to the req object
let checkCart = function (req, res, next) {
    //if the request does not have a cart id it is a new request and a cart id is added
    if (!req.body.cartId) {
        req.body.cartId = shortId.generate();
        next();
    } else {
        OrderModel.find({ cartId: req.body.cartId }).count((err, count) => {
            if (err) {
                logger.error(err.message, "Product Controller: getAllProducts", 10);
                let apiResponse = response.generate(true, "Some Error Occured", 500, null)
                res.send(apiResponse);
            } else if (count) {
                //if alteast 1 order with the cart id is present then it is valid
                next();
            } else {
                let apiResponse = response.generate(true, "cart not found", 404, null)
                res.send(apiResponse);
            }
        })
    }
}



module.exports = {
    checkCart: checkCart
}