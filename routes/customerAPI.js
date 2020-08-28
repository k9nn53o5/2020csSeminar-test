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

router.get('/:cid/orders',function(req,res){
	OrderDao.findOrderBy_cId(req.params.cid,function(orders){
		if(orders.lengthc === 0){
			res.status(204)
		}
		let myJson = JSON.stringify(orders);
		res.status(200).json(myJson);
		return;
	})
	res.status(501);
	return
})//ok

//find the specific order and the foods in order
//not implement
router.get('/:cid/orders/:oid',function(req,res){
	OrderDao.findOrderBy_oId(req.params.oid,function(order){
		if(order === undefined){
			res.status(204);
			return
		}
		Order_goodsDao.findOrder_goodsBy_orderId(order.id,function(foods){

		})
		

		let myJson = JSON.stringify(orders);
		res.status(200).json(myJson);
		return;
	})
	
	res.status(501);
    return;
})

//customer insert a new order to restaurant (status:Sending)
router.post('/:cid/orders',function(req,res){
	CustomerDao.findById(req.params.cid,function(customer){
		if(customer === undefined){
			res.status(410);
			return
		}
		order = req.body;
		OrderDao.newOrder(order.order_num,order.cId,order.pay_price,
			order.rId,function(result){
				if(result === "OK"){
					res.status(200);
					return;
				}
				res.status(501);
				return;
			});
	})
		
})//ok

//customer get the foods (status:FoodArrived)
router.put('/:cid/orders/:oid/status/:status',function(req,res){
	OrderDao.findOrderBy_oId(req.params.oid,function(order){
		if(order.cId != req.params.cid){
			res.status(400);
			return;
		}

		OrderDao.cus_get_food(req.params.oid);
		res.status(200);
		return;
	})
	res.status(500);
	return;
})

module.exports = router;