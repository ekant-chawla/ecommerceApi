const mongoose = require('mongoose');
const shortId = require('short-id');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const rateLib = require('./../libs/ratingLib')

const ProductModel = mongoose.model('product');

/*I found checking for req.pramas.id is not necessary as the route fails and goes to 404 if the route is missing.
    But I have still done the checks only because that how aditya sir did it.
*/

let createProduct = function (req, res) {

    let productId = shortId.generate();
    let featuresArray = [];

    if (req.body.features && req.body.features.trim() != '') {
        featuresArray = req.body.features.trim().split(',');
    }

    let product = new ProductModel({
        name: req.body.name,
        id: productId,
        price: req.body.price,
        description: req.body.description,
        sellerName: req.body.sellerName,
        features: featuresArray,
        category:req.body.category
    });

    product.save((err, result) => {
        let apiResponse;
        if (err) {
            logger.error(err.message, "Product Controller: createProduct", 10);
            if (err.name === "ValidationError") {
                apiResponse = response.generate(true, err.message, 403, null);

            } else {
                apiResponse = response.generate(true, "internal server error", 500, null);
            }

        } else {
            apiResponse = response.generate(false, "product created", 200, result);
        }
        res.send(apiResponse);
    })
}

let getProductById = function (req, res) {
    if (!req.params.id) {
        let apiResponse;
        apiResponse = response.generate(true, "product id missing", 403, null);
        res.send(apiResponse);
    } else {
        ProductModel.findOne({ id: req.params.id })
            .select("-_id -__v -createDate -updateDate")
            .lean()
            .exec((err, result) => {
                let apiResponse;
                if (err) {
                    logger.error(err.message, "Product Controller: getProductById", 10);
                    apiResponse = response.generate(true, "internal server error", 500, null);
                } else if (!result) {
                    apiResponse = response.generate(true, "product not found", 404, null);

                } else {
                    apiResponse = response.generate(false, 'product found', 200, result);
                }
                res.send(apiResponse);
            })
    }


}

let getAllProducts = function (req, res) {
    ProductModel.find({})
        .select("-_id -__v -createDate -updateDate")
        .lean()
        .exec((err, result) => {
            let apiResponse;
            if (err) {
                logger.error(err.message, "Product Controller: getAllProducts", 10);
                apiResponse = response.generate(true, "internal server error", 500, null);
            } else if (!result || result.length == 0) {
                apiResponse = response.generate(true, "no products found", 404, null);

            } else {
                apiResponse = response.generate(false, 'all products found', 200, result);
            }
            res.send(apiResponse);
        })
}

let updateProduct = function (req, res) {

    if (!req.body.id) {
        let apiResponse;
        apiResponse = response.generate(true, "product id missing", 403, null);
        res.send(apiResponse);
    } else {
        //fetch the document for updation.
        ProductModel.findOne({ id: req.body.id })
            .exec((err, result) => {
                let apiResponse;
                if (err) {
                    logger.error(err.message, "Product Controller: updateProduct", 10);
                    apiResponse = response.generate(true, "internal server error", 500, null);
                    res.send(apiResponse);
                } else if (!result) {
                    apiResponse = response.generate(true, "no product found", 404, null);
                    res.send(apiResponse);
                } else {

                    //update the target product
                    if (req.body.name) result.name = req.body.name;
                    if (req.body.price) result.price = req.body.price;
                    if (req.body.description) result.description = req.body.description;
                    if (req.body.sellerName) result.sellerName = req.body.sellerName;
                    if (req.body.features && req.body.features.trim() != '') result.features = req.body.features.trim().split(',');
                    if(req.body.category) result.category = req.body.category;
                    result.updateDate = Date.now();

                    //save the product
                    result.save((err, result) => {
                        if (err) {
                            logger.error(err.message, "Product Controller: updateeProduct", 10);
                            if (err.name === "ValidationError") {
                                apiResponse = response.generate(true, err.message, 403, null);

                            } else {
                                apiResponse = response.generate(true, "internal server error", 500, null);
                            }

                        } else {
                            apiResponse = response.generate(false, "product updated", 200, result);
                        }
                        res.send(apiResponse);
                    })
                }
            })
    }


}

let deleteProduct = function (req, res) {

    if (!req.body.id) {
        let apiResponse;
        apiResponse = response.generate(true, "product id missing", 403, null);
        res.send(apiResponse);
    } else {
        ProductModel.deleteOne({ id: req.body.id })
            .exec((err, result) => {
                let apiResponse;
                if (err) {
                    logger.error(err.message, "Product Controller: getAllProducts", 10);
                    apiResponse = response.generate(true, "internal server error", 500, null);
                } else if (result.n == 0) {
                    apiResponse = response.generate(true, "no product found", 404, null);

                } else {
                    apiResponse = response.generate(false, 'product removed', 200, null);
                }
                res.send(apiResponse);
            })
    }


}

let addReview = function (req, res) {

    if (!req.params || !req.params.id) {
        let apiResponse;
        apiResponse = response.generate(true, "product id missing", 403, null);
        res.send(apiResponse);
    } else {
        let rating = parseInt(req.query.value)
        if (!rating || rating < 1 || rating > 5) {
            let apiResponse;
            apiResponse = response.generate(true, "invalid rating", 403, null);
            res.send(apiResponse);
        } else {
            ProductModel.findOne({ id: req.params.id })
                .exec((err, result) => {
                    let apiResponse;
                    if (err) {
                        logger.error(err.message, "Product Controller: addReview", 10);
                        apiResponse = response.generate(true, "internal server error", 500, null);
                        res.send(apiResponse);
                    } else if (!result) {
                        apiResponse = response.generate(true, "product not found", 404, null);
                        res.send(apiResponse);
                    } else {
                        //calculate new rating
                        let updatedRating = rateLib.increaseRating(rating, result.avgRating, result.ratingCount);

                        //updating product document
                        result.avgRating = updatedRating.avgRating;
                        result.ratingCount = updatedRating.ratingCount;
                        result.updateDate = Date.now();

                        //saving/updating the document
                        result.save((err, result) => {
                            if (err) {
                                logger.error(err.message, "Product Controller: updateeProduct", 10);
                                if (err.name === "ValidationError") {
                                    apiResponse = response.generate(true, err.message, 403, null);

                                } else {
                                    apiResponse = response.generate(true, "internal server error", 500, null);
                                }
                            } else {
                                apiResponse = response.generate(false, "product updated", 200, result);
                            }
                            res.send(apiResponse);
                        })
                    }
                })
        }
    }
}





module.exports = {
    createProduct: createProduct,
    getProductById: getProductById,
    getAllProducts: getAllProducts,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    addReview: addReview
}