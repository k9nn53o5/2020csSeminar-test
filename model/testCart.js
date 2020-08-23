var mysql = require('mysql');
var CartDao = require('./Cart').CartDao;

global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});

//CartDao.check_res_that_cus_ordering(1,5,(result)=>{console.log(result);})
//CartDao.cleanCustomerCartWhereFoodArrive(1,0,(result)=>{console.log(result);})
//CartDao.CustomerRemoveAGoodFromCart(1,0,1,(result)=>{console.log(result);})
//CartDao.cleanGoodsByStatus(0,(result)=>{console.log(result);});
//CartDao.newGoodToCart([1,2,1,0,"2020-12-31 23:59:59",null]);
//CartDao.dishIdCanNotBeDuplicateInCart(1,1,(result)=>{console.log(result);});
//CartDao.cleanGoodsByCid(1,(result)=>{console.log(result);});