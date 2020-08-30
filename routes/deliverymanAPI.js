var express = require("express");
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var DeliveryManDao = require('../model/DeliveryMan').DeliveryManDao;

//deliveryman take the order (status:Delivering)
router.put('/:did/orders/:oid/status/:status',function(req,res){
	DeliveryManDao.findById(req.params.did,function(deliveryman){
		if(deliveryman === undefined){
			res.status(403)
			return
		}
		OrderDao.deliv_take_order(req.params.did,req.params.oid,function(result){
			if(result==="orderNotExist"){
				res.status(400);
				return;
			}
			if(result === "orderStatusErr"){
				res.status(400);
				return;
			}
			res.status(200);
			return;
		});
	})
	res.status(501)
	return
})

module.exports = router;