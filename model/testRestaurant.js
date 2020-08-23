var mysql = require('mysql');
//const { Restaurant } = require('./Restaurant');
var RestaurantDao = require('./Restaurant').RestaurantDao;
var Restaurant = require('./Restaurant').Restaurant;

global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});
/*
RestaurantDao.newRestaurant(['No. 123號, Section 1, Chongqing South Road, Zhongzheng District, Taipei City, 100',1234567,'test1234R',0006]
,(result)=>{
	console.log(result);
});
*/
//RestaurantDao.rId2rName(3,(result)=>{console.log(result)});
//RestaurantDao.rName2rId('乐山食堂',(result)=>{console.log(result)});
/*
RestaurantDao.canNotBeDuplicate(34567,'乐山',
	function(result){
		console.log(result);
	})
*/

//var x;
var arr = [];
RestaurantDao.getAll(function(results){
	results.forEach(element => {
		arr.push(new Restaurant(element.storeID,
			element.storeAddress, element.storePhoneNum,
			element.storeName,element.password))
	});

	//console.log(x);
});
console.log(arr);
//var x = RestaurantDao.testABC(5);
//console.log(x);
