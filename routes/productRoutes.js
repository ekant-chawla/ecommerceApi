const express = require('express')
const productController = require('./../controllers/productController');
const config = require('./../config/appConfig')

let setRoutes = function (app) {
    let baseUrl = config.version + "/product"

    app.post(baseUrl + '/create', productController.createProduct);

    /**
	 * @api {post} /api/v1/product/create Create product
	 * @apiVersion 1.0.0
	 * @apiGroup Create
	 *
	 * @apiParam {String} name Name of the product to be created
	 * @apiParam {Number} price Selling price of the product to be created
     * @apiParam {String} sellerName Name of the seller
     * @apiParam {String} category (optional) Category of the product to be created. Must be on of these - ['Any', 'Electronics', 'Cosmetics', 'Grocery']. Default Any
     * @apiParam {String} description (optional) Description of the product to be created.
     * @apiParam {String} features (optional) Features of the product to be created. A CSV format string.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
         "error": false,
         "message": "product created",
         "status": 200,
         "data": {
                  "category": "string",
                  "price": number,
                  "description": "string",
                  "features": ["string"],
                  "avgRating": 0,
                  "ratingCount": 0,
                  "_id": "string",
                  "name": "string",
                  "id": "string",
                  "sellerName": "string",
                  "createDate": "utc date string",
                  "updateDate": "utc date string",
                  "__v": number
                }
        }
	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "internal server error",
	    "status": 500,
	    "data": null
	   }
	 */



    app.post(baseUrl + '/delete', productController.deleteProduct);

    /**
        * @api {post} /api/v1/product/delete Delete product
        * @apiVersion 1.0.0
        * @apiGroup Delete
        *
        * @apiParam {String} id Id of the product to be deleted
        * 
        *
        *  @apiSuccessExample {json} Success-Response:
        *  {
            "error": false,
            "message": "product removed",
            "status": 200,
            "data": null
            }
       
        * @apiErrorExample {json} Error-Response:
        *
        * {
           "error": true,
           "message": "internal server error",
           "status": 500,
           "data": null
          }
        */


    app.put(baseUrl + '/update', productController.updateProduct);

    /**
         * @api {put} /api/v1/product/update Update product
         * @apiVersion 1.0.0
         * @apiGroup Update
         *
         * @apiParam {String} id Id of the product to be created
         * @apiParam {String} name (optional) Name of the product to be created
         * @apiParam {Number} price (optional) Selling price of the product to be created
         * @apiParam {String} sellerName (optional) Name of the seller
         * @apiParam {String} category (optional) Category of the product to be created. Must be on of these - ['Any', 'Electronics', 'Cosmetics', 'Grocery']. Default Any
         * @apiParam {String} description (optional) Description of the product to be created.
         * @apiParam {String} features (optional) Features of the product to be created. A CSV format string.
         *
         *  @apiSuccessExample {json} Success-Response:
         *  {
             "error": false,
             "message": "product updated",
             "status": 200,
             "data": {
                      "category": "string",
                      "price": number,
                      "description": "string",
                      "features": ["string"],
                      "avgRating": number,
                      "ratingCount": number,
                      "_id": "string",
                      "name": "string",
                      "id": "string",
                      "sellerName": "string",
                      "createDate": "utc date string",
                      "updateDate": "utc date string",
                      "__v": number
                    }
             }

         * @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "internal server error",
            "status": 500,
            "data": null
           }
         */

    app.get(baseUrl + '/reviews/addReview/:id', productController.addReview);

    /**
     * @api {get} /api/v1/product/reviews/addReview/:id Add product rating
     * @apiVersion 1.0.0
     * @apiGroup Update
     *
     * @apiParam {String} id Id of the product to be rated
     * @apiParam {String} value Passed as query parameter.Should be 1, 2, 3, 4 or 5
     * 
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
         "error": false,
         "message": "product updated",
         "status": 200,
         "data": {
                  "category": "string",
                  "price": number,
                  "description": "string",
                  "features": ["string"],
                  "avgRating": number,
                  "ratingCount": number,
                  "_id": "string",
                  "name": "string",
                  "id": "string",
                  "sellerName": "string",
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

    app.get(baseUrl + '/all', productController.getAllProducts);

    /**
     * @api {get} /api/v1/product/all View all products
     * @apiVersion 1.0.0
     * @apiGroup View
     *
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
         "error": false,
         "message": "product found",
         "status": 200,
         "data": [
                    {
                    "category": "string",
                    "price": number,
                    "description": "string",
                    "features": ["string"],
                    "avgRating": number,
                    "ratingCount": number,
                    "name": "string",
                    "id": "string",
                    "sellerName": "string"        
                    }
                ]
        }
    
    * @apiErrorExample {json} Error-Response:
    *
    * {
        "error": true,
        "message": "internal server error",
        "status": 500,
        "data": null
    }
    */

    app.get(baseUrl + '/:id', productController.getProductById);


    /**
     * @api {get} /api/v1/product/:id View product by id
     * @apiVersion 1.0.0
     * @apiGroup View
     *
     * @apiParam {String} id Id of the product to be viewed
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
         "error": false,
         "message": "product updated",
         "status": 200,
         "data": {
                  "category": "string",
                  "price": number,
                  "description": "string",
                  "features": ["string"],
                  "avgRating": 0,
                  "ratingCount": 0,
                  "name": "string",
                  "id": "string",
                  "sellerName": "string",
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

}




module.exports = {
    setRoutes: setRoutes
}
