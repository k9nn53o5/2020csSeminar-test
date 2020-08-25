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
                return
            }
            else{
                callback("OK");
                return
            }
            
        });
}

RestaurantDao.prototype.newRestaurant = function(newRAddress,newRPhone,
    newRName,newRPassword,callback){
    
        var checkDeplicateQuery = "SELECT storeID FROM store WHERE storePhoneNum = ? OR storeName = ? ";

        var insertQuery = "INSERT INTO store (storeAddress,storePhoneNum ,storeName,password) VALUES ?";

        MySQL
            .query(checkDeplicateQuery,[ [newRPhone],[newRName] ],function(err,rows){
            if(err)
                throw err;
            if(rows.length >= 1){
                callback("ErrHaveDuplicateData");
                return
            }
            else{
                MySQL
                .query(insertQuery,[[[newRAddress,newRPhone,newRName,newRPassword]]],function(err){
                    if(err)   
                        throw err;
                })
                callback("OK");
            }
        });    
}

RestaurantDao.prototype.deleteRestaurant = function(rid,callback){
    this.findById(rid,function(restaurant){
        if(restaurant === undefined){
            callback("RestaurantNotExist");
            return;
        }

        let sqlCode = "DELETE FROM store WHERE storeID = ?";
        MySQL
        .query(sqlCode,[[rid]],function(err){
            if(err)
                throw err;
            callback("OK");
            return;
        })
    })
}

RestaurantDao.prototype.testABC = function(x){
    return x;
}

module.exports.Restaurant = Restaurant;
module.exports.RestaurantDao = new RestaurantDao();

