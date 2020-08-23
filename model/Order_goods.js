function Order_goods(id,orderId,dishId,number,price,status,create_time,update_time){
    this.id = id;
    this.orderId = orderId;
    this.dishId = dishId;
    this.number = number;
    this.price = price;
    this.status = status;
    this.create_time = create_time;
    this.update_time = update_time;
}

function Order_goodsDao(){
}

Order_goodsDao.prototype.newAOrder_goods = function(orderId,dishId,number,price,status,create_time,update_time){
    var sqlCode = "INSERT INTO order_goods (orderId,dishId,number,price,status,create_time,update_time)\
                   VALUES ?";
    
    MySQL
        .query(sqlCode,[ [orderId],[dishId],[number],[price],[status],[create_time],[update_time] ],function(err){
            if(err)
                throw err;
        });
}

Order_goodsDao.prototype.findOrder_goodsBy_orderId = function(orderId,callback){
    var sqlCode = 'SELECT *\
                   FROM order_goods\
                   WHERE orderId = ?';

                   

    MySQL
        .query(sqlCode,[orderId],function(err,rows){
            if(err)
                    throw err;
            var results = [];
            rows.forEach(function(element) {
                results.push(new Order_goods(element.id,element.orderId,element.dishId,
                    element.number,element.price,element.status,
                    element.create_time,element.update_time));
            });
            callback(results);
        });
}

//same oeder can't add same dish to order_good twice
Order_goodsDao.prototype.dishIdCanNotBeDuplicateInOrder_goods = function(orderId,dishId,callback){
    var sqlCode = "SELECT *\
                   FROM order_goods\
                   WHERE orderId = ? AND dishId = ? AND status != 'Finish' ";
    MySQL
    .query(sqlCode,[ [orderId],[dishId] ],function(err,rows){
            if(err)
                throw err;
            if(rows.length >= 1){
                callback("HaveDuplicateData");
            }
            else{
                callback("OK");
            }   
        });
}


module.exports.Order_goods = Order_goods;
module.exports.Order_goodsDao = new Order_goodsDao();