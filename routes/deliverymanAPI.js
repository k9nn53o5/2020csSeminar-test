var express = require("express");
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var CustomerDao = require('../model/Customer').CustomerDao


//deliveryman take the order (status:Delivering)
router.put('/:did/orders/:oid/status/:status',function(req,res){

})

module.exports = router;