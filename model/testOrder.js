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
//OrderDao.r_start_cooking(39,(result)=>{console.log(result)});
//OrderDao.r_finish_cooking(39,(result)=>{console.log(result)});
//OrderDao.deliv_take_order(1,39,(result)=>{console.log(result)});
//OrderDao.cus_get_food(39,(result)=>{console.log(result)});
//OrderDao.findOrderAndOrderFood_by_oId(39,(result)=>{console.log(result)});

var og1 = {
    og_id : 12,
    og_dishId :1,
    og_number : 1,
    og_price : 10,
    og_status : "Sending",
    og_create_time : "2020-08-29 22:12:00",
    og_update_time : "2020-08-29 22:12:00"
};
var og2 = {
    og_id : 13,
    og_dishId :2,
    og_number : 1,
    og_price : 10,
    og_status : "Sending",
    og_create_time : "2020-08-29 22:12:00",
    og_update_time : "2020-08-29 22:12:00"
};
var og3 = {
    og_id : 14,
    og_dishId :3,
    og_number : 1,
    og_price : 10,
    og_status : "Sending",
    og_create_time : "2020-08-29 22:12:00",
    og_update_time : "2020-08-29 22:12:00"
};
var ogs = [og1,og2,og3]
OrderDao.insertOrderAndOrderFood_by_oId(3,1,30,1,ogs,(result)=>{console.log(result)});

