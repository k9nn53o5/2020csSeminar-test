var express = require('express');
const { route } = require('./restaurantAPI');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var CustomerDao = require('../model/Customer').CustomerDao

//get all customers
router.get('/',function(req,res){
	CustomerDao.getAll(function(customers){
		var myJson = JSON.stringify(customers);
        res.status(200).json(myJson);
        return
	});
	res.status(501);
    return
})//ok

//insert a new customer
router.post('/',function(req,res){
	customer = req.body;
	CustomerDao.newCustomer(customer.address,customer.phone,customer.name,customer.password,function(result){
		if(result === "HaveDuplicateData"){
			res.status(400);
			return;
		}
		res.status(200);
		return;
	})
})//ok

//get the customer info
router.get('/:cid',function(req,res){
	CustomerDao.findById(req.params.cid,function(customer){
		if(customer === undefined){
			res.status(410);
			return
		}
		var myJson = JSON.stringify(customer);
		res.status(200).json(myJson);
		return
	})
	res.status(501);
    return
})//ok

//尚未實作
//get the customer orders
router.get('/:cid/orders',function(req,res){
	CustomerDao.findById(req.params.cid,function(customer){
		if(customer === undefined){
			res.status(410);
			return
		}
		OrderDao.findOrderIdBy_cId(req.params.cid,function(orders){
			let myJson = JSON.stringify(orders);
			res.status(200).json(myJson);
			return;
		})
	})
	res.status(501);
    return;
})

router.get('/:cid/orders/:oid',function(req,res){
	CustomerDao.findById(req.params.cid,function(customer){
		if(customer === undefined){
			res.status(410);
			return
		}
		
		OrderDao.findOrderIdBy_oId(req.params.oid,function(orders){
			let myJson = JSON.stringify(orders);
			res.status(200).json(myJson);
			return;
		})
	})
	res.status(501);
    return;
})

//customer send a order
router.post('/:cid/orders',function(req,res){
	CustomerDao.findById(req.params.cid,function(customer){
		if(customer === undefined){
			res.status(410);
			return
		}
		order = req.body;
		OrderDao.newOrder(order.order_num,order.cId,order.pay_price,order.is_pay,
			order.pay_time,order.is_ship,order.ship_time,order.is_receipt,order.receipt_time,
			order.ship_number,order.status,order.create_time,order.update_time,order.ship_man_id,order.rId
			,function(result){
				if(result === "OK"){
					res.status(200);
					return;
				}
				res.status(501);
				return;
			});
	})
		
})

module.exports = router;