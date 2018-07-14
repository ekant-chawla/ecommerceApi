define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/cart/create",
    "title": "Add/Update product to cart",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>Id of the product to be added to cart</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>Quantity of this item to be added to the cart</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cartId",
            "description": "<p>(Optional) Id of the cart to which product should be added. Do not pass this parameter to create a new cart</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"product added to cart\",\n        \"status\": 200,\n        \"data\": {\n                 \"_id\": \"string\",\n                 \"orderId\": \"string\",\n                 \"cartId\": \"string\",\n                 \"product\": {\n                             \"price\": number,\n                             \"name\": \"string\",\n                             \"sellerName\": \"string\"\n                             },\n                 \"productShortId\": \"string\",\n                 \"quantity\": number,\n                 \"createDate\": \"utc date string\",\n                 \"updateDate\": \"utc date string\",\n                 \"__v\": number\n                }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/cartRoutes.js",
    "groupTitle": "Create",
    "name": "PostApiV1CartCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/product/create",
    "title": "Create product",
    "version": "1.0.0",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the product to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Selling price of the product to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sellerName",
            "description": "<p>Name of the seller</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>(optional) Category of the product to be created. Must be on of these - ['Any', 'Electronics', 'Cosmetics', 'Grocery']. Default Any</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>(optional) Description of the product to be created.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "features",
            "description": "<p>(optional) Features of the product to be created. A CSV format string.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"product created\",\n        \"status\": 200,\n        \"data\": {\n                 \"category\": \"string\",\n                 \"price\": number,\n                 \"description\": \"string\",\n                 \"features\": [\"string\"],\n                 \"avgRating\": 0,\n                 \"ratingCount\": 0,\n                 \"_id\": \"string\",\n                 \"name\": \"string\",\n                 \"id\": \"string\",\n                 \"sellerName\": \"string\",\n                 \"createDate\": \"utc date string\",\n                 \"updateDate\": \"utc date string\",\n                 \"__v\": number\n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"internal server error\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Create",
    "name": "PostApiV1ProductCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/cart/delete",
    "title": "Remove product from cart",
    "version": "1.0.0",
    "group": "Delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>Id of the product to be removed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cartId",
            "description": "<p>Id of the cart from which to be removed</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"product removed from cart\",\n        \"status\": 200,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/cartRoutes.js",
    "groupTitle": "Delete",
    "name": "PostApiV1CartDelete"
  },
  {
    "type": "post",
    "url": "/api/v1/product/delete",
    "title": "Delete product",
    "version": "1.0.0",
    "group": "Delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the product to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"product removed\",\n           \"status\": 200,\n           \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n           \"error\": true,\n           \"message\": \"internal server error\",\n           \"status\": 500,\n           \"data\": null\n          }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Delete",
    "name": "PostApiV1ProductDelete"
  },
  {
    "type": "get",
    "url": "/api/v1/product/reviews/addReview/:id",
    "title": "Add product rating",
    "version": "1.0.0",
    "group": "Update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the product to be rated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Passed as query parameter.Should be 1, 2, 3, 4 or 5</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"product updated\",\n        \"status\": 200,\n        \"data\": {\n                 \"category\": \"string\",\n                 \"price\": number,\n                 \"description\": \"string\",\n                 \"features\": [\"string\"],\n                 \"avgRating\": number,\n                 \"ratingCount\": number,\n                 \"_id\": \"string\",\n                 \"name\": \"string\",\n                 \"id\": \"string\",\n                 \"sellerName\": \"string\",\n                 \"createDate\": \"utc date string\",\n                 \"updateDate\": \"utc date string\",\n                 \"__v\": number\n                }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Update",
    "name": "GetApiV1ProductReviewsAddreviewId"
  },
  {
    "type": "put",
    "url": "/api/v1/product/update",
    "title": "Update product",
    "version": "1.0.0",
    "group": "Update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the product to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>(optional) Name of the product to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>(optional) Selling price of the product to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sellerName",
            "description": "<p>(optional) Name of the seller</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>(optional) Category of the product to be created. Must be on of these - ['Any', 'Electronics', 'Cosmetics', 'Grocery']. Default Any</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>(optional) Description of the product to be created.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "features",
            "description": "<p>(optional) Features of the product to be created. A CSV format string.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"product updated\",\n            \"status\": 200,\n            \"data\": {\n                     \"category\": \"string\",\n                     \"price\": number,\n                     \"description\": \"string\",\n                     \"features\": [\"string\"],\n                     \"avgRating\": number,\n                     \"ratingCount\": number,\n                     \"_id\": \"string\",\n                     \"name\": \"string\",\n                     \"id\": \"string\",\n                     \"sellerName\": \"string\",\n                     \"createDate\": \"utc date string\",\n                     \"updateDate\": \"utc date string\",\n                     \"__v\": number\n                   }\n            }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n            \"error\": true,\n            \"message\": \"internal server error\",\n            \"status\": 500,\n            \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Update",
    "name": "PutApiV1ProductUpdate"
  },
  {
    "type": "get",
    "url": "/api/v1/cart/view/:id",
    "title": "View cart by id",
    "version": "1.0.0",
    "group": "View",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the cart to be viewed</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"cart data found\",\n        \"status\": 200,\n        \"data\": {\n        \"products\": [\n                       {\n                           \"orderId\": \"string\",\n                           \"product\": {\n                           \"price\": number,\n                           \"name\": \"string\",\n                           \"sellerName\": \"string\"\n                                   },\n                           \"productShortId\": \"string\",\n                           \"quantity\": number\n                       }\n                    ],\n        \"cartId\": \"string\",\n        \"totalCost\": number\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/cartRoutes.js",
    "groupTitle": "View",
    "name": "GetApiV1CartViewId"
  },
  {
    "type": "get",
    "url": "/api/v1/product/all",
    "title": "View all products",
    "version": "1.0.0",
    "group": "View",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"product found\",\n        \"status\": 200,\n        \"data\": [\n                   {\n                   \"category\": \"string\",\n                   \"price\": number,\n                   \"description\": \"string\",\n                   \"features\": [\"string\"],\n                   \"avgRating\": number,\n                   \"ratingCount\": number,\n                   \"name\": \"string\",\n                   \"id\": \"string\",\n                   \"sellerName\": \"string\"        \n                   }\n               ]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "View",
    "name": "GetApiV1ProductAll"
  },
  {
    "type": "get",
    "url": "/api/v1/product/:id",
    "title": "View product by id",
    "version": "1.0.0",
    "group": "View",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the product to be viewed</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"product updated\",\n        \"status\": 200,\n        \"data\": {\n                 \"category\": \"string\",\n                 \"price\": number,\n                 \"description\": \"string\",\n                 \"features\": [\"string\"],\n                 \"avgRating\": 0,\n                 \"ratingCount\": 0,\n                 \"name\": \"string\",\n                 \"id\": \"string\",\n                 \"sellerName\": \"string\",\n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"internal server error\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "View",
    "name": "GetApiV1ProductId"
  }
] });
