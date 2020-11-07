var express = require("express");
var router = express.Router();
var OrderDao = require('../model/Order').OrderDao;
var DeliveryManDao = require('../model/DeliveryMan').DeliveryManDao;

//get all deliveryman
router.get('/',function(req,res){
	DeliveryManDao.getAll(function(deliverymans){
		if(deliverymans === undefined){
			res.status(404).end();
			return;
		}
		res.status(200).send(deliverymans);
		
        return
	})
	
});//ok

router.get('/:did',function(req,res){
	DeliveryManDao.findById(req.params.did,function(deliveryman){
		if(deliveryman === undefined){
			res.status(404);
			return ;
		}
		res.status(200).send(deliveryman);
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

router.post('/verify', function (req, res) {
	DeliveryManDao.cName2cId(req.body.name,function(did){
		if(did === undefined){
			res.status(400).json({result: "DeliveryManNotExist"});
            return
		}
		DeliveryManDao.findById(did,function(deliveryman){
			if(deliveryman.password === req.body.password){
				res.status(200).json({result: "Valid",id: deliveryman.id});
                return
			}
			else{
                res.status(400).json({result: "PasswordWrong"});
                return
            }

		})
	})
});//ok

//get the order that delivery man have taken
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
		res.status(200).send(orders);
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