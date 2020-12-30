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
function OAndOg(id,order_num,cId,
    pay_price,is_pay,pay_time,
    is_ship,ship_time,is_receipt,
    receipt_time,ship_number,status,
    create_time,update_time,ship_man_id,rId,
    
    og_id,og_orderId,og_dishId,og_number,og_price,og_status,og_create_time,og_update_time
    ){
        this.id=id;  this.order_num=order_num;  this.cId=cId;  
        this.pay_price=pay_price;  this.is_pay=is_pay;  this.pay_time=pay_time;  
        this.is_ship=is_ship;  this.ship_time=ship_time;  this.is_receipt=is_receipt;  
        this.receipt_time=receipt_time;  this.ship_number=ship_number;  this.status=status;
        this.create_time=create_time;  this.update_time=update_time;  this.ship_man_id=ship_man_id;
        this.rId = rId;

        this.og_id = og_id;
        this.og_orderId = og_orderId;
        this.og_dishId = og_dishId;
        this.og_number = og_number;
        this.og_price = og_price;
        this.og_status = og_status;
        this.og_create_time = og_create_time;
        this.og_update_time = og_update_time;
}
function OrderDao(){
}

OrderDao.prototype.newOrder = function(order_num,cId,pay_price,rId,callback){

    var sqlCode = 'INSERT INTO dbtest2020_4_2.order (order_num,cId,pay_price,is_pay,pay_time,is_ship,ship_time,is_receipt,receipt_time,ship_number,status,create_time,update_time,ship_man_id,rId) VALUES ?';
   
    var currentDate = new Date();
    var time = currentDate.getHours()+":"+currentDate.getMinutes();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
    create_time = datetimeStr;


    var that = this;
    MySQL
    .query(sqlCode,
        [[[order_num,cId,pay_price,0,null,0,null,0,null,null,'Sending',create_time,null,null,rId]]],
        function(err){
        if(err)
            throw err;
        
        that.findOrderBy_cId_create_time_status(cId,create_time,"Sending",function(order){
            if(order.length != 1){
                callback("CustomerOrderStatusErr");
            }
            callback(order[0].id);
        })
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

OrderDao.prototype.findOrderBy_cId_create_time_status = function(cId,create_time,status,callback){
    var sqlCode = 'SELECT *\
                   FROM dbtest2020_4_2.order\
                   WHERE cId = ? AND create_time = ? AND status = ?';
    MySQL
        .query(sqlCode,[cId,create_time,status],function(err,rows){
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

OrderDao.prototype.findOrderBy_cId = function(cId,callback){
    var sqlCode = 'SELECT *\
                   FROM dbtest2020_4_2.order\
                   WHERE cId = ?';
    MySQL
        .query(sqlCode,[cId],function(err,rows){
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

OrderDao.prototype.findOrderBy_oId = function(oId,callback){
    var sqlCode = 'SELECT *\
                   FROM dbtest2020_4_2.order\
                   WHERE id = ?';
    MySQL
        .query(sqlCode,[oId],function(err,rows){
            if(err)
                    throw err;
            if(rows.length != 1){
                callback(undefined);
            }
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

OrderDao.prototype.findOrderByStatus = function(status,callback){
    var sqlCode = 'SELECT *\
                   FROM dbtest2020_4_2.order\
                   WHERE status = ?';
    MySQL
    .query(sqlCode,[status],function(err,rows){
        if(err)
            throw err;
            
        var results = [];
        rows.forEach(element =>{
            results.push(new Order( element.id, element.order_num, element.cId, element.pay_price,
                element.is_pay, element.pay_time, element.is_ship, element.ship_time,
                element.is_receipt, element.receipt_time, element.ship_number, element.status,
                element.create_time, element.update_time,  element.ship_man_id,element.rId
            ))
        })
        callback(results);
    })
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

OrderDao.prototype.r_start_cooking = function(oId,callback){
    var sqlCode1 = 'SELECT *\
                    FROM dbtest2020_4_2.order\
                    WHERE id = ?'
    MySQL
    .query(sqlCode1,[oId],function(err,row){
        if(err)
            throw err;
        if (row.length != 1){
            callback("orderNotExist");
            return;
        }
        if (row[0].status != 'Sending'){
            console.log(row[0].status)
            callback("orderStatusErr");
            return;
        }
        
        var sqlCode2 = "UPDATE dbtest2020_4_2.order\
                    SET status='Cooking'\
                    WHERE id=?";
        MySQL
        .query(sqlCode2,[[oId]],function(err){
            if(err)
                throw err;
            callback("OK");
            return;
        });  
    })
}

OrderDao.prototype.r_finish_cooking = function(oId,callback){
    var sqlCode1 = 'SELECT *\
                    FROM dbtest2020_4_2.order\
                    WHERE id = ?'
    MySQL
    .query(sqlCode1,[oId],function(err,row){
        if(err)
            throw err;
        if (row.length != 1){
            callback("orderNotExist");
            return;
        }
        if (row[0].status != 'Cooking'){
            //callback(row.status)
            callback("orderStatusErr");
            return;
        }
        var sqlCode = "UPDATE dbtest2020_4_2.order\
        SET status='FoodWasCooked'\
        WHERE id=?";
        MySQL
        .query(sqlCode,[[oId]],function(err){
        if(err)
            throw err;
        callback("OK");
        });
    })
}

OrderDao.prototype.deliv_take_order = function(delivId,oId,callback){
    var sqlCode1 = 'SELECT *\
                    FROM dbtest2020_4_2.order\
                    WHERE id = ?'
    MySQL
    .query(sqlCode1,[oId],function(err,row){
        if(err)
            throw err;
        if (row.length != 1){
            callback("orderNotExist");
            return;
        }
        if (row[0].status != 'FoodWasCooked'){
            //callback(row.status)
            callback("orderStatusErr");
            return;
        }
        var sqlCode = "UPDATE dbtest2020_4_2.order\
        SET is_ship=1, ship_time=?, status='Delivering', ship_man_id=?\
        WHERE id=?";
        var currentDate = new Date();
        var time = currentDate.getHours()+":"+currentDate.getMinutes();
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
        var curtime = datetimeStr;

        MySQL
        .query(sqlCode,[[curtime],[delivId],[oId]],function(err){
        if(err)
            throw err;
        });
        callback("OK");
        })

}

OrderDao.prototype.cus_get_food = function(oId,callback){
    var sqlCode1 = 'SELECT *\
    FROM dbtest2020_4_2.order\
    WHERE id = ?'
    MySQL
        .query(sqlCode1,[oId],function(err,row){
        if(err)
            throw err;
        if (row.length != 1){
            callback("orderNotExist");
            return;
        }
        if (row[0].status != 'Delivering'){
            //callback(row.status)
            callback("orderStatusErr");
            return;
        }

        var sqlCode = "UPDATE dbtest2020_4_2.order\
        SET is_pay=1, pay_time=?, is_receipt=1, receipt_time=?, status='FoodArrived'\
        WHERE id=?";
        var currentDate = new Date();
        var time = currentDate.getHours()+":"+currentDate.getMinutes();
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
        var curtime = datetimeStr;

        MySQL
        .query(sqlCode,[[curtime],[curtime],[oId]],function(err){
        if(err)
            throw err;
        callback("OK");
        });

    });
}

function Order_goods(og_id,og_orderId,og_dishId,og_number,og_price,og_status,og_create_time,og_update_time){
    this.og_id = og_id;
    this.og_orderId = og_orderId;
    this.og_dishId = og_dishId;
    this.og_number = og_number;
    this.og_price = og_price;
    this.og_status = og_status;
    this.og_create_time = og_create_time;
    this.og_update_time = og_update_time;
}

OrderDao.prototype.findOrder_goodsBy_orderId = function(orderId,callback){
    var sqlCode = 'SELECT *\
                   FROM order_goods\
                   WHERE og_orderId = ?';            
    MySQL
        .query(sqlCode,[orderId],function(err,rows){
            if(err)
                    throw err;
            var results = [];
            rows.forEach(function(element) {
                results.push(new Order_goods(element.og_id,element.og_orderId,element.og_dishId,
                    element.og_number,element.og_price,element.og_status,
                    element.og_create_time,element.og_update_time));
            });
            callback(results);
        });
}
//same order can't add same dish to order_good twice
OrderDao.prototype.dishIdCanNotBeDuplicateInOrder_goods = function(orderId,dishId,callback){
    var sqlCode = "SELECT *\
                   FROM order_goods\
                   WHERE og_orderId = ? AND og_dishId = ? AND og_status != 'Finish' ";
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

OrderDao.prototype.newAOrder_goods = function(orderId,dishId,number,price,status,callback){
    var currentDate = new Date();
    var time = currentDate.getHours()+":"+currentDate.getMinutes();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
    create_time = datetimeStr;
    
    var sqlCode = "INSERT INTO order_goods (og_orderId,og_dishId,og_number,og_price,og_status,og_create_time,og_update_time)\
                   VALUES ?";
    
    MySQL
        .query(sqlCode,[[[orderId,dishId,number,price,null,create_time,null]]],function(err){
            if(err)
                throw err;
            callback("OK");
        });
}

OrderDao.prototype.findOrderAndOrderFood_by_oId = function(oId,callback){
    this.findOrderBy_oId(oId,function(order){
        if(order === undefined){
            callback("OrderNotExist");
        }
        var sqlQuery1 = "SELECT * FROM dbtest2020_4_2.order as o,dbtest2020_4_2.order_goods\
        WHERE o.id = ? AND o.id = og_orderId";
        MySQL
        .query(sqlQuery1,[[oId]],function(err,rows){
            if(err)
                throw err;
            var results = [];
            rows.forEach(element =>{
                results.push(new OAndOg(element.id,element.order_num,element.cId,
                    element.pay_price,element.is_pay,element.pay_time,
                    element.is_ship,element.ship_time,element.is_receipt,
                    element.receipt_time,element.ship_number,element.status,
                    element.create_time,element.update_time,element.ship_man_id,element.rId,
                    
                    element.og_id,element.og_orderId,element.og_dishId,
                    element.og_number,element.og_price,element.og_status,
                    element.og_create_time,element.og_update_time));
            });
            callback(results);
        });
    });
    
}

//ogs is an array with og_obj as elements 
OrderDao.prototype.insertOrderAndOrderFood_by_oId = function(order_num,cId,pay_price,
    rId,ogs,callback){
    var that = this;
    //javascript 語法的麻煩，在this.newOrder不用this因為scope的this是newOrder的this不是gorbal的this
    this.newOrder(order_num,cId,pay_price,rId,function(result){
        if(typeof result != "number"){
            //console.log(typeof result);
            callback("NewOrderERR");
            return;
        }
        ogs.forEach(element => {
            that.newAOrder_goods(result,element.og_dishId,element.og_number,
                element.og_price,element.og_status,function(ogResult){
                    if(ogResult != "OK"){
                        callback("NewOrder_goodsERR");
                        return;
                    }
                });
        });
        callback("OK");
    });

}

module.exports.Order = Order;
module.exports.OrderDao = new OrderDao();