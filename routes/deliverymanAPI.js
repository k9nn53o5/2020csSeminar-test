var express = require("express");
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var DeliveryManDao = require('../model/DeliveryMan').DeliveryManDao;

//get all deliveryman
router.get('/',function(req,res){
	DeliveryManDao.getAll(function(deliverymans){
		if(deliverymans === undefined){
			res.status(404).end();
			return;
		}

		var myJson = JSON.stringify(deliverymans);
		res.status(200).json(myJson);
        return
	})
	
});//ok

router.get('/:did',function(req,res){
	DeliveryManDao.findById(req.params.did,function(deliveryman){
		if(deliveryman === undefined){
			res.status(404);
			return ;
		}
		var myJson = JSON.stringify(deliveryman);
		res.status(200).json(myJson);
		return
	})
})//ok

router.post('/',function(req,res){
	var newDeliveryman = req.body;
	DeliveryManDao.newDeliveryMan(newDeliveryman.name,newDeliveryman.phone,newDeliveryman.password,newDeliveryman.salary,newDeliveryman.imgPath,newDeliveryman.identityId,function(result){
		if(result != "OK"){
			res.status(400).end();
			return
		}
		res.status(200).end();
		return
	})

})//ok


//get the order that delivery man have taken
//not implement yet
router.get('/:did/myOrder/status/:status',function(req,res){
	DeliveryManDao.findById(req.params.did,function(deliveryman){
		if(deliveryman.length != 1 || deliveryman === undefined){
			res.status(400);
			return;
		}
	})
	
	OrderDao.findOrderBy_dId_status(req.params.did,req.params.status,function(orders){
		if(orders.length === 0){
			res.status(204);
			return;
		}
		var myJson = JSON.stringify(orders);
		res.status(200).json(myJson);
		return;
	})
	res.status(400);
	return;
})

//deliveryman take the order (status:Delivering)
router.put('/:did/action',function(req,res){
	deliverymanAction = req.body;
	DeliveryManDao.findById(req.params.did,function(deliveryman){
		if(deliveryman === undefined){
			res.status(403).end();
			return
		}
		if(deliverymanAction.action != "TakeTheOrder"){
			res.status(400).end();
			return;
		}
		OrderDao.deliv_take_order(req.params.did,deliverymanAction.oId,function(result){
			if(result==="orderNotExist"){
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
})//ok

module.exports = router;