var mysql = require('mysql');
var CustomerDao = require('./Customer').CustomerDao;

global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});

//CustomerDao.deleteCustomer('Jackson',()=>{});
//CustomerDao.newCustomer(["test no 234553 section",093943041,'Luo','sadcdas']);
//CustomerDao.getAll((customers)=>{console.log(customers)});
//CustomerDao.findById(1,function(customer){console.log(customer);});
//CustomerDao.canNotBeDuplicate(932197985,'Sandy2',function(result){console.log(result);});