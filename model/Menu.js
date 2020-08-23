function Menu(id,storeId,price,name){
    this.id = id;
    this.storeId = storeId;
    this.price = price;
    this.name = name;
}

function MenuDao(){
}

//still have db duplicate problem
MenuDao.prototype.findByRestId = function(resId,callback){
    var sqlCode = 'SELECT dishName, dishId, dishStoreId, price\
                   FROM menus, store\
                   WHERE storeID = ? AND storeID = dishStoreId';
    MySQL
        .query(sqlCode,[resId],function(err,rows){
            if(err)
                    throw err;
            var results = [];
            rows.forEach(function(element) {
                results.push(new Menu(element.dishId,
                        element.dishStoreId, element.price,
                        element.dishName));
            });
            callback(results);
        });
}

MenuDao.prototype.findFoodBydishId = function(dishId,callback){
    MySQL.connect(function(err) {
        //if (err) throw err;
        //console.log("Connected!");

        var sqlCode = 'SELECT dishName, dishId, dishStoreId, price\
                    FROM menus\
                    WHERE dishId = ?';
        
        MySQL
            .query(sqlCode,[dishId],function(err,rows){
                if(err)
                    throw err;
                if(rows.length === 1){
                    callback(new Menu(rows[0].dishId,
                        rows[0].dishStoreId, rows[0].price,
                        rows[0].dishName));
                }
                else{callback(undefined);}
        })
    });
}

MenuDao.prototype.getAll = function(callback){
    var sqlCode = 'SELECT dishName, dishId, dishStoreId, price\
    FROM menus';
    MySQL
        .query(sqlCode,function(err,rows){
            if(err)
                throw err;
            var results = [];
            rows.forEach(function(element) {
                results.push(new Menu(element.dishId,
                    element.dishStoreId, element.price,
                    element.dishName));
            });
            callback(results);
    });
}

MenuDao.prototype.dName2dId = function(dName,callback){
    var sqlCode = 'SELECT dishId\
                   FROM menus\
                   WHERE dishName = ?';
    MySQL
        .query(sqlCode,[dName],function(err,rows){
            if(err)
                throw err;
            if(rows.length === 1){
                callback(rows[0]);
            }
            else{
                callback("can't find");
            }
        });
}

MenuDao.prototype.isFoodInResMenu = function(dName,rName,callback){
    var sqlCode = "SELECT EXISTS\
                  (SELECT 1 FROM menus, store \
                   WHERE dishName = ? AND storeName = ?)";
    
    MySQL
        .query(sqlCode,[[dName],[rName]],function(err,rows){
            if(err)
                throw err;
            if(rows.length === 1){
                callback(rows[0]);
            }
            else{
                callback(undefined);
            }          
        })
}

MenuDao.prototype.findFoodPrice = function(dishId,callback){
    var sqlCode = "SELECT price\
                   FROM menus\
                   WHERE dishId = ?";
    MySQL
        .query(sqlCode,[ [dishId] ],function(err,rows){
            if(err)
                throw err;
            if(rows.length == 1){
                mPrice =  rows[0].price;
                callback(mPrice);
            }
            else{
                callback(undefined);
            }
        });
}



MenuDao.prototype.canNotBeDuplicate = function(name,callback){
    var sqlCode = "SELECT dishId\
                   FROM menus\
                   WHERE dishName = ? ";
    MySQL
    .query(sqlCode,[[name]],function(err,rows){
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


//can't deal with duplication 
MenuDao.prototype.insertMenu = function(mName,mStoreId,mPrice){
    var sqlCode = "INSERT INTO menus (dishName, dishStoreId, price)\
                   VALUES ?";
    MySQL
        .query(sqlCode,[[mName],[mStoreId],[mPrice]],function(err){
            if(err)
                throw err;
        });
}
//choose dishId or dishName to delete the row
MenuDao.prototype.deleteMenu = function(delItem){
    var sqlCode1 = "DELETE FROM menus \
                    WHERE dishId = ?";
    var sqlCode2 = "DELETE FROM menus \
                    WHERE dishName = ?";
    var sqlCode;
    if(typeof(delItem) === 'number'){
        sqlCode = sqlCode1;
    }else if(typeof(delItem) === 'string'){
        sqlCode = sqlCode2;
    }else{
        throw Error;
    }
    MySQL
        .query(sqlCode,[[delItem]],function(err){
            if(err)
                throw err;
            console.log("1 record deleted");
        })
}

//don't work
// updateMenu have to fill ALL column
//we should use dishId not dishName to identify
//but dName2dId is not work, it will be change later
MenuDao.prototype.updateMenu = function(dName,newDName,newPrice,callback){
    var sqlCode = "UPDATE menus SET dishName = ?, price = ?\
                    WHERE dishId = ?"
    
    this.dName2dId(dName,(tmp)=>{
        MySQL
        .query(sqlCode,[[newDName],[newPrice],[tmp.dishId]],function(err){
            if(err)
                throw err;
            console.log("1 record updated");
            });
        callback("insert sucess");
    });
}

module.exports.Menu = Menu;
module.exports.MenuDao = new MenuDao();
