function Restaurant(id,address,phoneNum,name,password){
    this.id = id;
    this.address = address;
    this.phoneNum = phoneNum;
    this.name = name;
    this.password = password;
}
 
function RestaurantDao() {
}

RestaurantDao.prototype.rId2rName = function(rID,callback){
    var sqlCode = 'SELECT storeName\
                   FROM store\
                   WHERE storeID = ?';
    MySQL
        .query(sqlCode,[rID],function(err,rows){
            if(err)
                throw err;
            if(rows.length === 1){
                callback(rows[0]);
            }
            else{callback(undefined);}
        });
}

//duplicate issue
RestaurantDao.prototype.rName2rId = function(rName,callback){
    var sqlCode = 'SELECT storeID\
                   FROM store\
                   WHERE storeName = ?';
    MySQL
        .query(sqlCode,[rName],function(err,rows){
            if(err)
                throw err;
            if(rows.length === 1){
                callback(rows[0].storeID);
            }
            else{callback(undefined);}
        });
}

RestaurantDao.prototype.findById = function(id,callback){
    MySQL.connect(function(err) {
        //if (err) throw err;
        //console.log("Connected!");

        var sqlCode = 'SELECT storeID, storeAddress, storePhoneNum, storeName, password \
                    FROM store\
                    WHERE storeID = ?';
        MySQL
            .query(sqlCode,[id],function(err,rows){
                    if(err)
                        throw err;
                    if(rows.length == 1){
                        callback(new Restaurant(rows[0].storeID,rows[0].storeAddress,
                            rows[0].storePhoneNum,rows[0].storeName,rows[0].password));
                    }
                    else{callback(undefined);}
        })
    });
    
}

RestaurantDao.prototype.getAll = function(callback){
    //console.log("R table Connected!");

    var sqlCode = 'SELECT storeID, storeAddress, storePhoneNum, storeName, password \
                FROM store';
    MySQL
        .query(sqlCode,function(err,rows){
                if(err)
                    throw err;
                let results = [];
                rows.forEach(function(element) {
                    results.push(new Restaurant(element.storeID,
                            element.storeAddress, element.storePhoneNum,
                            element.storeName,element.password));
                });
                callback(results);
            });
}

RestaurantDao.prototype.canNotBeDuplicate = function(phoneNum,name,callback){
    var sqlCode = "SELECT storeID\
                   FROM store\
                   WHERE storePhoneNum = ? OR storeName = ? ";
    MySQL
    .query(sqlCode,[[phoneNum],[name]],function(err,rows){
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

RestaurantDao.prototype.newRestaurant = function(newRAddress,newRPhone,
    newRName,newRPassword){
    var sqlCode = "INSERT INTO store (storeAddress,storePhoneNum\
                                        ,storeName,password)\
                   VALUES ?";
    MySQL
        .query(sqlCode,[[newRAddress],[newRPhone],[newRName],[newRPassword]],function(err){
            if(err)   
                throw err;
        })
}

RestaurantDao.prototype.deleteRestaurant = function(delItem){
    var sqlCode1 = "DELETE FROM store \
                    WHERE storeID = ?";
    var sqlCode2 = "DELETE FROM store \
                    WHERE storeName = ?";
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
            callback("Delete success");
        })
}

RestaurantDao.prototype.testABC = function(x){
    return x;
}

module.exports.Restaurant = Restaurant;
module.exports.RestaurantDao = new RestaurantDao();

