var express = require('express');
const { json } = require('body-parser');
var router = express.Router();
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;

router.get('/:oid',function(req,res){
	OrderDao.findOrderAndOrderFood_by_oId(req.params.oid,function(oAndOgs){
		if(oAndOgs === "OrderNotExist"){
			res.status(404).json({"result":"OrderNotExist"});
			return
		}
		myJson = JSON.stringify(oAndOgs);
		res.status(200).json(myJson);
		return
	});
});

router.post('/',function(req,res){
	let order_num = req.body.order_num;
	let cId = req.body.cId;
	let pay_price = req.body.pay_price;
	let rId = req.body.rId
	let ogs = req.body.ogs
	OrderDao.insertOrderAndOrderFood_by_oId(order_num,cId,pay_price,rId,ogs,function(result){
		if(result === "NewOrderERR"){
			res.status(400).json({"result":"NewOrderERR"});
			return;
		}
		if(result === "NewOrder_goodsERR"){
			res.status(400).json({"result":"NewOrder_goodsERR"});
			return;
		}
		
		res.status(200);
		return;
	});
});


module.exports = router;