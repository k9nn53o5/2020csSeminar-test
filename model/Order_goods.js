// function Order_goods(og_id,og_orderId,og_dishId,og_number,og_price,og_status,og_create_time,og_update_time){
//     this.og_id = og_id;
//     this.og_orderId = og_orderId;
//     this.og_dishId = og_dishId;
//     this.og_number = og_number;
//     this.og_price = og_price;
//     this.og_status = og_status;
//     this.og_create_time = og_create_time;
//     this.og_update_time = og_update_time;
// }

// function Order_goodsDao(){
// }

// Order_goodsDao.prototype.newAOrder_goods = function(orderId,dishId,number,price,status,callback){
//     var currentDate = new Date();
//     var time = currentDate.getHours()+":"+currentDate.getMinutes();
//     var date = currentDate.getDate();
//     var month = currentDate.getMonth();
//     var year = currentDate.getFullYear();
//     var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
//     create_time = datetimeStr;
    
//     var sqlCode = "INSERT INTO order_goods (og_orderId,og_dishId,og_number,og_price,og_status,og_create_time,og_update_time)\
//                    VALUES ?";
    
//     MySQL
//         .query(sqlCode,[[[orderId,dishId,number,price,status,create_time,null]]],function(err){
//             if(err)
//                 throw err;
//             callback("OK");
//         });
// }
// Order_goodsDao.prototype.findOrder_goodsBy_orderId = function(orderId,callback){
//     var sqlCode = 'SELECT *\
//                    FROM order_goods\
//                    WHERE og_orderId = ?';            
//     MySQL
//         .query(sqlCode,[orderId],function(err,rows){
//             if(err)
//                     throw err;
//             var results = [];
//             rows.forEach(function(element) {
//                 results.push(new Order_goods(element.og_id,element.og_orderId,element.og_dishId,
//                     element.og_number,element.og_price,element.og_status,
//                     element.og_create_time,element.og_update_time));
//             });
//             callback(results);
//         });
// }
// //same order can't add same dish to order_good twice
// Order_goodsDao.prototype.dishIdCanNotBeDuplicateInOrder_goods = function(orderId,dishId,callback){
//     var sqlCode = "SELECT *\
//                    FROM order_goods\
//                    WHERE og_orderId = ? AND og_dishId = ? AND og_status != 'Finish' ";
//     MySQL
//     .query(sqlCode,[ [orderId],[dishId] ],function(err,rows){
//             if(err)
//                 throw err;
//             if(rows.length >= 1){
//                 callback("HaveDuplicateData");
//             }
//             else{
//                 callback("OK");
//             }   
//         });
// }
// module.exports.Order_goods = Order_goods;
// module.exports.Order_goodsDao = new Order_goodsDao();