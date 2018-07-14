const mongoose = require('mongoose');
const response = require('./../libs/responseLib');
const shortId = require('short-id')
const logger = require('./../libs/loggerLib');
const cartTotal = require('./../libs/cartTotalLib')

const OrderModel = mongoose.model('order')
const ProductModel = mongoose.model('product')

let createOrder = function (req, res) {

    ProductModel.findOne({ id: req.body.productId })
        .select("_id")
        .lean()
        .exec((err, result) => {
            let apiResponse;
            if (err) {
                logger.error(err.message, "Cart Controller: createOrder", 10);
                apiResponse = response.generate(true, "internal server error", 500, null);
                res.send(apiResponse);
            } else if (!result) {
                apiResponse = response.generate(true, "invalid product id", 404, null);
                res.send(apiResponse);
            } else {
                //check if the product exists in this cartid already
                req.product_id = result._id;
                OrderModel.findOne({ cartId: req.body.cartId, productShortId: req.body.productId })
                    .exec((err, result) => {
                        if (err) {
                            logger.error(err.message, "Cart Controller: createOrder", 10);
                            apiResponse = response.generate(true, "internal server error", 500, null);
                            res.send(apiResponse);
                        } else if (!result) {
                            console.log("creating new cart")
                            //create add product in cart and send response
                            let orderId = shortId.generate();

                            let order = new OrderModel({
                                orderId: orderId,
                                cartId: req.body.cartId,
                                product: req.product_id,
                                productShortId: req.body.productId,
                                quantity: req.body.quantity,
                            })

                            //save the order
                            order.save((err, result) => {
                                if (err) {
                                    logger.error(err.message, "Cart Controller: createOrder", 10);
                                    if (err.name === "ValidationError") {
                                        apiResponse = response.generate(true, err.message, 403, null);
                                    } else {
                                        apiResponse = response.generate(true, "internal server error", 500, null);
                                    }
                                    res.send(apiResponse);
                                } else {
                                    ProductModel.populate(result, { path: "product", select: "-_id name price sellerName" }, (err, result) => {
                                        if (err) {
                                            apiResponse = response.generate(true, "internal server error", 500, null);
                                            res.send(apiResponse);
                                        } else {
                                            apiResponse = response.generate(false, "product added to cart", 200, result);
                                            res.send(apiResponse);
                                        }
                                    });

                                }
                            })//new order saved end

                        } else {
                            console.log("updating cart")

                            //update existing one
                            result.quantity = req.body.quantity;
                            result.updateDate = Date.now();

                            //save the updated product
                            result.save((err, result) => {
                                if (err) {
                                    logger.error(err.message, "Cart Controller: createOrder", 10);
                                    if (err.name === "ValidationError") {
                                        apiResponse = response.generate(true, err.message, 403, null);
                                    } else {
                                        apiResponse = response.generate(true, "internal server error", 500, null);
                                    }
                                    res.send(apiResponse)
                                } else {
                                    ProductModel.populate(result, { path: "product", select: "-_id name price sellerName" }, (err, result) => {
                                        if (err) {
                                            apiResponse = response.generate(true, "internal server error", 500, null);
                                            res.send(apiResponse);
                                        } else {
                                            apiResponse = response.generate(false, "product updated in cart", 200, result);
                                            res.send(apiResponse);
                                        }
                                    });
                                }

                            })
                        }
                    })
            }
        })

}

let deleteOrder = function (req, res) {
    console.log(req.body)
    OrderModel.deleteOne({ productShortId: req.body.productId, cartId: req.body.cartId }, (err, result) => {
        let apiResponse;
        if (err) {
            logger.error(err.message, "Cart Controller: deleteOrder", 10);
            apiResponse = response.generate(true, "internal server error", 500, null);
            res.send(apiResponse);
        } else if (result.n == 0) {
            apiResponse = response.generate(true, "product not present in cart", 404, null);
            res.send(apiResponse);
        } else {
            apiResponse = response.generate(false, "product removed from cart", 200, null);
            res.send(apiResponse);
        }
    })
}


let viewCart = function (req, res) {
    OrderModel.find({ cartId: req.params.id })
        .select("-_id -__v -updateDate -createDate -cartId")
        .populate('product', "-_id name price sellerName")
        .exec((err, result) => {
            let apiResponse;
            if (err) {
                logger.error(err.message, "Cart Controller: getCart", 10);
                apiResponse = response.generate(true, "internal server error", 500, null);
                res.send(apiResponse);
            } else if (!result || result.length == 0) {
                apiResponse = response.generate(true, "cart does not exist", 404, null);
                res.send(apiResponse);
            } else {

                let data = { products: result };
                data.cartId = req.params.id;
                data.totalCost = cartTotal.cartTotal(result);

                apiResponse = response.generate(false, "cart data found", 200, data);
                res.send(apiResponse);
            }
        })
}



module.exports = {
    createOrder: createOrder,
    deleteOrder: deleteOrder,
    viewCart: viewCart
}
