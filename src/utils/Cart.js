const uuid = require('crypto').randomUUID;

const ShoppingCart = {
    carts: [],
    get: function (userId) {
        const cart = this.carts.find(cart => cart[userId]);
        if (cart) return cart[userId];
        return [];
    },
    add: function (userId, productId) {
        const cart = this.carts.find(cart => cart[userId]);
        if (cart) cart[userId].push({
            _id: uuid(),
            product_id: productId,
        });
        else {
            this.carts.push({
                [userId]: [
                    {
                        _id: uuid(),
                        product_id: productId,
                    }
                ]
            });
        }
    },
    remove: function (itemId) {
        const cart = this.carts.find(cart => {
            for (const item of Object.values(cart)) {
                return item.find(item => item._id === itemId);
            }
        });
        if (cart) {
            const userId = Object.keys(cart)[0];
            const item = cart[userId].find(item => item._id == itemId);
            const index = cart[userId].indexOf(item);
            if (index > -1) cart[userId].splice(index, 1);
        }
    },
    buy: function (userId) {
        const cart = this.carts.find(cart => cart[userId]);
        if (cart) {
            this.carts.splice(this.carts.indexOf(cart), 1);
            return cart[userId].map(item => {
                return {
                    product_id: item.product_id,
                };
            });
        }
    }
};

module.exports = ShoppingCart;
