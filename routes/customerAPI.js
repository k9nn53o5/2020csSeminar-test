var express = require('express');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var CustomerDao = require('../model/Customer').CustomerDao

//get all customers
router.get('/',function(req,res){
	CustomerDao.getAll(function(customers){
		if(customers === undefined){
			res.status(404).end();
			return;
		}
		var myJson = JSON.stringify(customers);
        res.status(200).json(myJson);
        return
	});
});//ok

//insert a new customer
router.post('/',function(req,res){
	customer = req.body;
	CustomerDao.newCustomer(customer.address,customer.phone,customer.name,customer.password,function(result){
		if(result === "HaveDuplicateData"){
			res.status(400).json({"result":"HaveDuplicateData"});
			return;
		}
		res.status(200).end();
		return;
	});
});//ok

//get the customer info
router.get('/:cid',function(req,res){
	CustomerDao.findById(req.params.cid,function(customer){
		if(customer === undefined){
			res.status(404).end();
			return
		}
		var myJson = JSON.stringify(customer);
		res.status(200).json(myJson);
		return
	})
});//ok


//get costomer orders
router.get('/:cid/orders',function(req,res){
	OrderDao.findOrderBy_cId(req.params.cid,function(orders){
		if(orders.length === 0){
			res.status(204).end();
		}
		if(orders === undefined){
			res.status(400).end();
		}
		let myJson = JSON.stringify(orders);
		res.status(200).json(myJson);
		return;
	})
});//ok

//find the specific order and the foods in order
//not implement
router.get('/:cid/orders/:oid',function(req,res){
	
});

//customer insert a new order to restaurant (status:Sending)
router.post('/:cid/orders',function(req,res){
	CustomerDao.findById(req.params.cid,function(customer){
		if(customer === undefined){
			res.status(400).end();
			return;
		}
		order = req.body;
		OrderDao.newOrder(order.order_num,order.cId,0,order.rId
			,function(result){
				if(result === "OK"){
					res.status(200).end();
					return;
				}
				res.status(501).end();
				return;
			});
	});		
});//ok

//customer get the foods (status:FoodArrived)
router.put('/:cid/action',function(req,res){
	customerAction = req.body
	OrderDao.findOrderBy_oId(customerAction.oId,function(order){
		if(order[0].cId != req.params.cid){
			res.status(403).end();
			return;
		}
		if(customerAction.action != "GetTheFoods"){
			res.status(400).end();
			return;
		}
		OrderDao.cus_get_food(customerAction.oId,function(result){
			if(result === "orderNotExist"){
				res.status(404).end();
				return;
			}
			if(result === "orderStatusErr"){
				res.status(400).end();
				return;
			}
			res.status(200).end();
			return;
		});	
	});
});//ok

module.exports = router;