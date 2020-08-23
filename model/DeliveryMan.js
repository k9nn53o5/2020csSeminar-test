function DeliveryMan(id,name,phoneNum,password,salary,imgPath,identityId){
    this.id = id;
    this.name = name;
    this.phoneNum = phoneNum;
    this.password = password;
    this.salary = salary;
    this.imgPath = imgPath;
    this.identityId = identityId;
}
function DeliveryManDao() {
}
DeliveryManDao.prototype.getAll = function(callback){
    var sqlCode = 'SELECT id, name, dPhone, dPassword, dSalary, dImgPath, identityId \
                FROM deliveryman';
    MySQL
        .query(sqlCode,function(err,rows){
                if(err)
                    throw err;
                let results = [];
                rows.forEach(function(element) {
                    results.push(new DeliveryMan(element.id, element.name, element.dPhone, element.dPassword, element.dSalary, element.dImgPath, element.identityId));
                });
                callback(results);
            });
}

DeliveryManDao.prototype.cName2cId = function(name,callback){
    var sqlCode = 'SELECT id\
    FROM deliveryman\
    WHERE name = ?';
    MySQL
        .query(sqlCode,[ [name] ],function(err,rows){
            if(err)
                throw err;
            if(rows.length == 1){
                callback(rows[0].id);
            }
            else{callback(undefined);}
    });
} 
DeliveryManDao.prototype.findById = function(id,callback){
    MySQL.connect(function(err) {
        //if (err) throw err;
        //console.log("Connected!");

        var sqlCode = 'SELECT id, name, dPhone, dPassword, dSalary, dImgPath, identityId\
                    FROM deliveryman\
                    WHERE id = ?';
        MySQL
            .query(sqlCode,[id],function(err,rows){
                    if(err)
                        throw err;
                    if(rows.length == 1){
                        callback(new DeliveryMan(rows[0].id, rows[0].name, rows[0].dPhone, rows[0].dPassword, rows[0].dSalary, rows[0].dImgPath, rows[0].identityId));
                    }
                    else{callback(undefined);}
        })
    });
    
}

DeliveryManDao.prototype.canNotBeDuplicate = function(name,phoneNum,callback){
    var sqlCode = "SELECT id\
                   FROM deliveryman\
                   WHERE dPhone = ? OR name = ? ";
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
DeliveryManDao.prototype.newDeliveryMan = function(name, dPhone, dPassword, dSalary, dImgPath, identityId){
    var sqlCode = "INSERT INTO deliveryman (name, dPhone, dPassword, dSalary, dImgPath, identityId)\
                   VALUES ?";
    MySQL
        .query(sqlCode,[ [name], [dPhone], [dPassword], [dSalary], [dImgPath], [identityId] ],function(err){
            if(err)
                //result = err;
                throw err;
            
        })
}

DeliveryManDao.prototype.deleteDeliveryMan = function(delItem,callback){
    var sqlCode1 = "DELETE FROM deliveryman \
                    WHERE id = ?";
    var sqlCode2 = "DELETE FROM deliveryman \
                    WHERE name = ?";
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
module.exports.DeliveryMan = DeliveryMan;
module.exports.DeliveryManDao = new DeliveryManDao();