function Order(id,order_num,cId,
    pay_price,is_pay,pay_time,
    is_ship,ship_time,is_receipt,
    receipt_time,ship_number,status,
    create_time,update_time,ship_man_id,
    rId){

        this.id=id;  this.order_num=order_num;  this.cId=cId;  
        this.pay_price=pay_price;  this.is_pay=is_pay;  this.pay_time=pay_time;  
        this.is_ship=is_ship;  this.ship_time=ship_time;  this.is_receipt=is_receipt;  
        this.receipt_time=receipt_time;  this.ship_number=ship_number;  this.status=status;
        this.create_time=create_time;  this.update_time=update_time;  this.ship_man_id=ship_man_id;
        this.rId = rId;
    
}
function OrderDao(){
}

OrderDao.prototype.newOrder = function(order_num,cId,pay_price,
    is_pay,pay_time,is_ship,
    ship_time,is_receipt,receipt_time,
    ship_number,status,create_time,
    update_time,ship_man_id,rId){

    var sqlCode = "INSERT INTO dbtest2020_4_2.order (order_num,cId,pay_price,is_pay,pay_time,is_ship,ship_time,is_receipt,receipt_time,ship_number,status,create_time,update_time,ship_man_id,rId)\
                   VALUES ?";
    
    MySQL
        .query(sqlCode,
            [ [order_num],[cId],[pay_price],
            [is_pay],[pay_time],[is_ship],
            [ship_time],[is_receipt],[receipt_time],
            [ship_number],[status],[create_time],
            [update_time],[ship_man_id],[rId] ],
            function(err){
            if(err)
                throw err;
            });
}
OrderDao.prototype.findOrderBy_rId = function(rId,callback){
    var sqlCode = 'SELECT *\
                   FROM dbtest2020_4_2.order\
                   WHERE rId = ?';
    MySQL
        .query(sqlCode,[ [rId] ],function(err,rows){
            if(err)
                    throw err;
            var results = [];
            rows.forEach(element => {
                results.push(new Order(
                    element.id, element.order_num, element.cId, element.pay_price,
                    element.is_pay, element.pay_time, element.is_ship, element.ship_time,
                    element.is_receipt, element.receipt_time, element.ship_number, element.status,
                    element.create_time, element.update_time,  element.ship_man_id,element.rId
                ))
            });
            callback(results);
        });
}

OrderDao.prototype.findOrderIdBy_cId_create_time = function(cId,create_time,callback){
    var sqlCode = 'SELECT *\
                   FROM dbtest2020_4_2.order\
                   WHERE cId = ? AND create_time = ?';
    MySQL
        .query(sqlCode,[cId,create_time],function(err,rows){
            if(err)
                    throw err;
            var results = [];
            rows.forEach(element => {
                results.push(new Order(
                    element.id, element.order_num, element.cId, element.pay_price,
                    element.is_pay, element.pay_time, element.is_ship, element.ship_time,
                    element.is_receipt, element.receipt_time, element.ship_number, element.status,
                    element.create_time, element.update_time,  element.ship_man_id,element.rId
                ))
            });
            callback(results);
        });
}

OrderDao.prototype.findOrder_All = function(callback){
    var sqlCode = 'SELECT *\
                   FROM dbtest2020_4_2.order';
    MySQL
        .query(sqlCode,function(err,rows){
            if(err)
                throw err;
            var results = [];
            rows.forEach(element => {
            results.push(new Order(
                element.id, element.order_num, element.cId, element.pay_price,
                element.is_pay, element.pay_time, element.is_ship, element.ship_time,
                element.is_receipt, element.receipt_time, element.ship_number, element.status,
                element.create_time, element.update_time,  element.ship_man_id,element.rId
            ))
        });
    callback(results);
    });
}

OrderDao.prototype.r_start_cooking = function(oId){
    var sqlCode = "UPDATE dbtest2020_4_2.order\
                    SET status='Cooking'\
                    WHERE id=?";
    MySQL
        .query(sqlCode,[[oId]],function(err){
            if(err)
                throw err;
        });
}
OrderDao.prototype.r_finish_cooking = function(oId){
    var sqlCode = "UPDATE dbtest2020_4_2.order\
                    SET status='FoodWasCooked'\
                    WHERE id=?";
    MySQL
        .query(sqlCode,[[oId]],function(err){
            if(err)
                throw err;
        });
}

OrderDao.prototype.deliv_take_order = function(curtime,delivId,oId){
    var sqlCode = "UPDATE dbtest2020_4_2.order\
                   SET is_ship=1, ship_time=?, status='Delivering', ship_man_id=?\
                   WHERE id=?";
    MySQL
        .query(sqlCode,[[curtime],[delivId],[oId]],function(err){
            if(err)
                throw err;
        });
}

OrderDao.prototype.cus_get_food = function(curtime,oId){
    var sqlCode = "UPDATE dbtest2020_4_2.order\
                   SET is_pay=1, pay_time=?, is_receipt=1, receipt_time=?, status='FoodArrived'\
                   WHERE id=?";
    MySQL
        .query(sqlCode,[[curtime],[curtime],[oId]],function(err){
            if(err)
                throw err;
        });
}



module.exports.Order = Order;
module.exports.OrderDao = new OrderDao();