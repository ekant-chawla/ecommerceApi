const express = require('express')
const cartController = require('./../controllers/cartController');
const config = require('./../config/appConfig')
const routeMiddleware = require('./../middlewares/routeMiddleware');
const time = require('./../libs/timeLib')


let setRoutes = function (app) {
    let baseUrl = config.version + "/cart"

    app.post(baseUrl + '/create', routeMiddleware.checkCart, cartController.createOrder);

    /**
     * @api {post} /api/v1/cart/create Add/Update product to cart
     * @apiVersion 1.0.0
     * @apiGroup Create
     *
     * @apiParam {String} productId Id of the product to be added to cart
     * @apiParam {String} quantity Quantity of this item to be added to the cart
     * @apiParam {String} cartId (Optional) Id of the cart to which product should be added. Do not pass this parameter to create a new cart
     * 
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
         "error": false,
         "message": "product added to cart",
         "status": 200,
         "data": {
                  "_id": "string",
                  "orderId": "string",
                  "cartId": "string",
                  "product": {
                              "price": number,
                              "name": "string",
                              "sellerName": "string"
                              },
                  "productShortId": "string",
                  "quantity": number,
                  "createDate": "utc date string",
                  "updateDate": "utc date string",
                  "__v": number
                 }
        }
        
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null
       }
    */

    app.post(baseUrl + '/delete', cartController.deleteOrder);

    /**
     * @api {post} /api/v1/cart/delete Remove product from cart
     * @apiVersion 1.0.0
     * @apiGroup Delete
     *
     * @apiParam {String} productId Id of the product to be removed
     * @apiParam {String} cartId Id of the cart from which to be removed
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
         "error": false,
         "message": "product removed from cart",
         "status": 200,
         "data": null
        }
  
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null
      }
    */

    app.get(baseUrl + '/view/:id', cartController.viewCart);

    /**
     * @api {get} /api/v1/cart/view/:id View cart by id
     * @apiVersion 1.0.0
     * @apiGroup View
     *
     * @apiParam {String} id Id of the cart to be viewed
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
         "error": false,
         "message": "cart data found",
         "status": 200,
         "data": {
         "products": [
                        {
                            "orderId": "string",
                            "product": {
                            "price": number,
                            "name": "string",
                            "sellerName": "string"
                                    },
                            "productShortId": "string",
                            "quantity": number
                        }
                     ],
         "cartId": "string",
         "totalCost": number
        }
  
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null
    }
    */

}


module.exports = {
    setRoutes: setRoutes
}
