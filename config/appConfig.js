const config = {};

config.port = 3000;
config.database = {
    url: "mongodb://127.0.0.1:27017/ecommerceDb"
}
config.allowedOrigins = "*"
config.version = "/api/v1"
config.env = "dev"

module.exports = config;