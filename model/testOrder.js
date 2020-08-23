var mysql = require('mysql');
var OrderDao = require('./Order').OrderDao;

global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});


//OrderDao.newOrder([10,1,1000,null,null,null,null,null,null,null,'Sending',"2020-12-31 23:59:59","2022-12-31 23:59:59",null,null]);
//OrderDao.findOrderBy_cId_create_time(1,"2020-12-31 23:59:59",(result)=>{console.log(result);});
//OrderDao.findOrderBy_rId(1,(result)=>{console.log(result);});
OrderDao.r_start_cooking(33);
//OrderDao.deliv_take_order("2020-12-31 23:59:59",4,32);
//OrderDao.cus_get_food("2020-12-31 23:59:59",32);