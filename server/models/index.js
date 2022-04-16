const db = require('../db');

module.exports = {
  items: {
    get: (callback) => {
      // TODO: Cmarket의 모든 상품을 가져오는 함수를 작성하세요
      const queryString = `SELECT * FROM items`;

      db.query(queryString, (error, result) => {
        callback(error, result);
      });
    },
  },
  orders: {
    get: (userId, callback) => {
      // TODO: 해당 유저가 작성한 모든 주문을 가져오는 함수를 작성하세요
      const queryString = `SELECT orders.id, name, image, price, total_price, order_quantity, created_at
      FROM orders
      LEFT JOIN users
      ON (users.id = orders.user_id)
      LEFT JOIN order_items
      ON (orders.id = order_items.order_id)
      LEFT JOIN items
      ON (items.id = order_items.item_id)
      WHERE users.id = ?`;
      const params = [userId];
      db.query(queryString, params, (err, result) => {
        callback(err, result);
      });
    },

    post: (userId, orders, totalPrice, callback) => {
      // TODO: 해당 유저의 주문 요청을 데이터베이스에 생성하는 함수를 작성하세요
      const queryString = `INSERT INTO orders (user_id, total_price) VALUES ?`;
      console.log(queryString);
      const params = [[userId, totalPrice]];

      db.query(queryString, [params], (err, result) => {
        if(result) {
          const queryString2 = `INSERT INTO order_items (order_id, item_id, order_quantity) VALUES ?`;
          const params2 = orders.map(el => {
            return [result.insertId, el.itemId, el.quantity];
          });
          db.query(queryString2, [params2], (err, result) => {
            callback(err, result);
          })
        }
        else {
          callback(err, result);
        }
      });
    }
  }
};
