var mysql = require('mysql');
var Order_goodsDao = require('./Order_goods').Order_goodsDao;

global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});

//Order_goodsDao.newAOrder_goods([1,1,1,20,"Sending","2020-12-31 23:59:59","2021-12-31 23:59:59"]);
//Order_goodsDao.findOrder_goodsBy_orderId(1,(result)=>{console.log(result);});
//Order_goodsDao.dishIdCanNotBeDuplicateInOrder_goods(2,1,(result)=>{console.log(result);})