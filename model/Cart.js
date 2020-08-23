function Cart(gsId,cId,dishId,num,status,create_time,update_time){
    this.gsId = gsId;
    this.cId = cId;
    this.dishId = dishId;
    this.num = num;
    this.status = status;
    this.create_time = create_time;
    this.update_time = update_time;
}
function CartDao(){
}

//same customor can't add same dish to cart twice, it has to be add the num
CartDao.prototype.dishIdCanNotBeDuplicateInCart = function(cId,dishId,callback){
    var sqlCode = "SELECT cId\
                   FROM cart\
                   WHERE cId = ? AND dishId = ?";
    MySQL
    .query(sqlCode,[[cId],[dishId]],function(err,rows){
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

//check datetime db datatype is right
//can't deal with duplicate and wrong datatype
CartDao.prototype.newGoodToCart = function(cId,dishId,num,status,create_time,update_time){
    var sqlCode = "INSERT INTO cart (cId,dishId,num,status,create_time,update_time)\
                   VALUES ?";
    MySQL
        .query(sqlCode,[[cId],[dishId],[num],[status],[create_time],[update_time]],function(err){
            if(err)
                throw err;
        });
}

CartDao.prototype.isCusCartEepty = function(cId,callback){
    var sqlCode = "SELECT * FROM cart \
                    WHERE cId = ?";
    MySQL.
        query(sqlCode,[ [cId] ],function(err,rows){
            if(err)
                throw err;
            if(rows.length == 0){
                callback("IS_EMPTY");
            }
            else{
                callback("IS_NOT_EMPTY");
            }
        });
}

CartDao.prototype.cleanGoodsByCid = function(cId,callback){
    var sqlCode = "DELETE FROM cart \
                    WHERE cId = ?";
    MySQL
        .query(sqlCode,[ [cId] ],function(err){
            if(err)
                throw err;
            //console.log("cleanGoodsByCid");
            callback("Delete successfully");
        });
}

CartDao.prototype.cleanAllGoodsByStatus = function(status,callback){
    var sqlCode = "DELETE FROM cart \
                    WHERE status = ?";
    MySQL
        .query(sqlCode,[[status]],function(err){
            if(err)
                throw err;
            //console.log("cleanGoodsByStatus");
            callback("Delete successfully");
        });
}

CartDao.prototype.CustomerRemoveAGoodFromCart = function(cId,status,dishId,callback){
    var sqlCode = "DELETE FROM cart \
                    WHERE status = ? AND cId = ? AND dishId = ? ";
    MySQL
        .query(sqlCode,[[status],[cId],[dishId]],function(err){
            if(err)
                throw err;
            //console.log("cleanGoodsByStatus");
            callback("Delete successfully");
        });
}

CartDao.prototype.cleanCustomerCartWhereFoodArrive = function(cId,status,callback){
    var sqlCode = "DELETE FROM cart \
                    WHERE status = ? AND cId = ? ";
    MySQL
        .query(sqlCode,[[status],[cId]],function(err){
            if(err)
                throw err;
            //console.log("cleanGoodsByStatus");
            callback("Delete successfully");
        });
}

CartDao.prototype.findByCId = function(cId,callback){
var sqlCode = 'SELECT dishId, num, status, create_time, update_time\
                   FROM cart\
                   WHERE cId = ? ';
    MySQL
        .query(sqlCode,[cId],function(err,rows){
            if(err)
                    throw err;
            var results = [];
            rows.forEach(function(element) {
                results.push(new Cart(-1,-1,element.dishId,element.num,
                        element.status,element.create_time,element.update_time));
            });
            callback(results);
        });
}

CartDao.prototype.findByRid = function(rId,callback){
    var sqlCode = "SELECT *\
                   FROM cart,menus,store\
                   WHERE store.storeID = ? AND menus.dishStoreId = store.storeID AND menus.dishId = cart.dishId"

    MySQL
        .query(sqlCode,[rId],function(err,rows){
            if(err)
                    throw err;
            var results = [];
            rows.forEach(function(element) {
                results.push(new Cart(element.gsId,element.cId,element.dishId,element.num,
                        element.status,element.create_time,element.update_time));
            });
            callback(results);
    });
}

CartDao.prototype.check_res_that_cus_ordering = function(cId,dishId,callback){
    var sqlCode1 = "SELECT menus.dishStoreId as rId\
                    FROM cart,menus\
                    WHERE cart.cId = ? AND cart.dishId = menus.dishId\
                    GROUP BY menus.dishStoreId";

    var sqlCode2 = "SELECT menus.dishStoreId as rId\
                    FROM menus\
                    WHERE menus.dishId = ?";
    
    MySQL
        .query(sqlCode1,[cId],function(err,rows1){
            if(rows1.length == 1){
                MySQL.query(sqlCode2,[dishId],function(err,rows2){
                    if(rows1[0].rId == rows2[0].rId){
                        callback("sameRes_OK");
                    }
                    else{
                        callback("diffRes_NOT_OK");
                    }
                });
            }
            else if(rows1.length != 1){
                callback("CusOrderMulRes_ERR");
            }
            if(err)
                throw err;
        });
}

CartDao.prototype.delAllIllegalFood = function(rId){
    //delete the food that is not at the curr restaurant
    //because in one order it only allows order one res foods at a time

    var sqlCode = "DELETE FROM cart,store \
                    WHERE storeID = ? ";
    MySQL
        .query(sqlCode,[[rId]],function(err){
            if(err)
                throw err;
            //console.log("cleanGoodsByStatus");
            callback("Delete successfully");
        });

}


module.exports.Cart = Cart;
module.exports.CartDao = new CartDao();