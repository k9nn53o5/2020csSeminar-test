var express = require('express');
var router = express.Router();
var OrderDao = require('../model/Order').OrderDao;

router.get('/ordersNeedToBeSend',function(req,res){
	OrderDao.findOrderByStatus('FoodWasCooked',function(orders){
		if(orders.length >0 && orders[0] == undefined){
			res.status(400).end();
		}
		res.status(200).send(orders);
        return
	});
});

router.get('/:oid/goods',function(req,res){
	OrderDao.findOrder_goodsBy_orderId(req.params.oid,function(goods){
		if(goods.length >0 && goods[0] === undefined){
			res.status(400).end();
		}
		res.status(200).send(goods);
        return
	});
});

module.exports = router;