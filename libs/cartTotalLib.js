
let cartTotal = function (cartArray) {

    let total = 0;

    cartArray.forEach(element => {
        total += element.product.price * element.quantity;
    });
    return total;

}

module.exports = {
    cartTotal: cartTotal
}