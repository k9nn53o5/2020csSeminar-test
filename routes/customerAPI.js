var express = require('express');
var router = express.Router();
var OrderDao = require('../model/Order').OrderDao;
var CustomerDao = require('../model/Customer').CustomerDao

//get all customers
router.get('/',function(req,res){
	CustomerDao.getAll(function(customers){
		if(customers === undefined){
			res.status(404).end();
			return;
		}
		res.status(200).send(customers);
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
		res.status(200).send(customer);
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
		res.status(200).send(orders);
		return;
	})
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

//find the specific order and the foods in order
//not implement
router.get('/:cid/orders/:oid',function(req,res){
	CustomerDao.findById(req.params.cid,function(customer){
		if(typeof customer != "object"){
			res.status(400).end();
			return;
		}
		OrderDao.findOrderAndOrderFood_by_oId(req.params.oid,function(oAndOgs){

			if(oAndOgs === "OrderNotExist"){
				res.status(404).json({"result":"OrderNotExist"});
				return;
			}
			if(oAndOgs[0].cId != req.params.cid){
				res.status(403).json({"result":"WrongUserAccess"});
				return;
			}
			res.status(200).send(oAndOgs);
			return
		});
	});		
});

//customer insert a new order and foods to table order and order_goods 
router.post('/:cid/orders',function(req,res){
	let order_num = req.body.order_num;
	let cId = req.params.cid;
	let pay_price = req.body.pay_price;
	let rId = req.body.rId
	let ogs = req.body.ogs

	// ogs:[
	// 	{
	// 		"og_dishId":10
	// 		"og_number":2
	// 		"og_price":200
	// 		"og_status":null
	// 	},
	// 	{

	// 	},
	// 	...
	// ]
	
	OrderDao.insertOrderAndOrderFood_by_oId(order_num,cId,pay_price,rId,ogs,function(result){
		if(result === "NewOrderERR"){
			res.status(400).json({"result":"NewOrderERR"});
			return;
		}
		if(result === "NewOrder_goodsERR"){
			res.status(400).json({"result":"NewOrder_goodsERR"});
			return;
		}
	});
	res.status(200).end();
})
module.exports = router;