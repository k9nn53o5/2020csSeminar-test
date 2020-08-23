var mysql = require('mysql');
var MenuDao = require('./Menu').MenuDao;

global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});


//MenuDao.insertMenu('apple',4,30); 
//MenuDao.deleteMenu(38,()=>{}); ok
/*
MenuDao.isFoodInResMenu('r燒烤雞腿堡','Juicy Bun Burger',(x)=>{
	console.log(x);
});
*/
//MenuDao.dName2dId('APPLE',(result)=>{console.log(result.dishId)});
/*
MenuDao.updateMenu('APPLE','Apple',35,(output)=>{console.log(output)});
*/
//MenuDao.findFoodBydishId(3,(result)=>{console.log(result)});


//var x = MenuDao.findFoodPrice(1);
//MenuDao.findFoodPrice(1,(price)=>{console.log(price)});

/*
MenuDao.getAll((foods)=>{
	console.log(foods);
});
*/
