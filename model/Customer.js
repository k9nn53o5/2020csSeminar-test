function Customer(id,address,phoneNum,name,password){
    this.id = id;
    this.address = address;
    this.phoneNum = phoneNum;
    this.name = name;
    this.password = password;
}
function CustomerDao() {
}
CustomerDao.prototype.getAll = function(callback){
    var sqlCode = 'SELECT cId, cAddress, cPhoneNum, cName, cPassword \
                FROM customer';
    MySQL
        .query(sqlCode,function(err,rows){
                if(err)
                    throw err;
                let results = [];
                rows.forEach(function(element) {
                    results.push(new Customer(element.cId,
                            element.cAddress, element.cPhoneNum,
                            element.cName,element.cPassword));
                });
                callback(results);
            });
}

CustomerDao.prototype.cName2cId = function(cName,callback){
    var sqlCode = 'SELECT cId\
    FROM customer\
    WHERE cName = ?';
    MySQL
        .query(sqlCode,[cName],function(err,rows){
            if(err)
                throw err;
            if(rows.length === 1){
                callback(rows[0].cId);
            }
            else{callback(undefined);}
    });
} 
CustomerDao.prototype.findById = function(id,callback){
    MySQL.connect(function(err) {
        //if (err) throw err;
        //console.log("Connected!");

        var sqlCode = 'SELECT cId, cAddress, cPhoneNum, cName, cPassword \
                    FROM customer\
                    WHERE cId = ?';
        MySQL
            .query(sqlCode,[id],function(err,rows){
                    if(err)
                        throw err;
                    if(rows.length == 1){
                        callback(new Customer(rows[0].cId,rows[0].cAddress,
                            rows[0].cPhoneNum,rows[0].cName,rows[0].cPassword));
                    }
                    else{callback(undefined);}
        })
    });
    
}

CustomerDao.prototype.canNotBeDuplicate = function(name,phoneNum,callback){
    var sqlCode = "SELECT cId\
                   FROM customer\
                   WHERE cPhoneNum = ? OR cName = ? ";
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

//don't work
CustomerDao.prototype.newCustomer = function(newCAddress,newCPhone,
    newCName,newCPassword){
    var sqlCode = "INSERT INTO customer (cAddress,cPhoneNum\
                                        ,cName,cPassword)\
                   VALUES ?";
    MySQL
        .query(sqlCode,[[newCAddress],[newCPhone],[newCName],[newCPassword]],function(err){
            if(err)
                //result = err;
                throw err;
            
        })
}

CustomerDao.prototype.deleteCustomer = function(delItem,callback){
    var sqlCode1 = "DELETE FROM customer \
                    WHERE cId = ?";
    var sqlCode2 = "DELETE FROM customer \
                    WHERE cName = ?";
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
module.exports.Customer = Customer;
module.exports.CustomerDao = new CustomerDao();