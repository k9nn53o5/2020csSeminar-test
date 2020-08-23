var express = require('express');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;



//以下的restful 必須重寫因為必須避免多级 URL
//像 GET /authors/12/categories/2 要改成 GET /authors/12?categories=2
//還有get post delete 的 routr 的 url有些是重複的

router.get('/',function(req,res,next){
    res.render('index', {title: 'Express'});
    /*
    RestaurantDao.getAll(function(restaurants){
        var myJson = JSON.stringify(restaurants);
        res.status(200).json(myJson);
    });
    res.status(501);
    */
});

router.get('/verify', function (req, res, next) {
    RestaurantDao.rName2rId(req.query.restaurantName,function(rid){
        if(rid == undefined){
            res.json({result: false});
        }
        RestaurantDao.findById(rid,function(restaurant){
            if(restaurant.password === req.query.password){
                res.json({result: true});
            }
            else{
                res.json({result: false});
            }
        })
    })
});

//?
router.post('/',function(req,res){
    if(RestaurantDao.newRestaurant()){
        res.status(200);
    }
    res.status(501);
});
router.get('/:rid/menus',function(req,res){
    MenuDao.findByRestId(req.params.rid,function(menus){
        var myJson = JSON.stringify(menus);
        res.status(200).json(myJson);
    })
    res.status(501);
});

//? get and post have same url
//how
router.post('/:rid/menus',function(req,res){
    if(MenuDao.insertMenu(req.body.name,req.params.rid,req.body.price)){
        res.status(200).json("ok");
    }
    res.status(501);
});

//失敗，重寫
router.delete('/:rid/menus/:mid',function(req,res){
    if(MenuDao.deleteMenu(req.params.mid)){
        res.status(200)
    }
    res.status(501);
});

router.get('/:rid',function(req,res){
    RestaurantDao.findById(req.params.rid,function(restaurant){
        var myJson = JSON.stringify(restaurant);
        res.status(200).json(myJson);
    })
    res.status(501);
});

//尚未實作
router.get('/:location',function(req,res){
    res.status(501);
});
router.get('/:rid/orders',function(req,res){
    OrderDao.findOrderBy_rId(req.params.rid,function(orders){
        order.forEach(element => {
        });
    })
    res.status(501);
});
router.put('/:rid/orders/:oid/status/:status',function(req,res){
    res.status(501);
})

module.exports = router;