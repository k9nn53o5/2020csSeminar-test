var express = require('express');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;



//以下的restful 必須重寫因為必須避免多级 URL
//像 GET /authors/12/categories/2 要改成 GET /authors/12?categories=2
//還有get post delete 的 routr 的 url有些是重複的

// get all restaurants info
router.get('/',function(req,res,next){
    RestaurantDao.getAll(function(restaurants){
        var myJson = JSON.stringify(restaurants);
        res.status(200).json(myJson);
        return
    });
    res.status(501);
    return
});//ok

// verify the restaurant name and password
router.post('/verify', function (req, res) {
    let restaurantInfo = req.body;    

    RestaurantDao.rName2rId(restaurantInfo.name,function(rid){
        if(rid === undefined){
            res.status(400).json({result: "RestaurantNotExist"});
            return
        }
        RestaurantDao.findById(rid,function(restaurant){
            if(restaurant.password === req.body.password){
                res.status(200).json({result: "Valid"});
                return
            }
            else{
                res.status(400).json({result: "PasswordWrong"});
                return
            }
        })
    })
    res.status(501)
    return
});//ok

//insert a new restaurant
router.post('/',function(req,res){
    var newstore = req.body
    RestaurantDao.newRestaurant(newstore.address,newstore.phone,newstore.name,newstore.password,function(result){
        if(result === "ErrHaveDuplicateData"){
            res.status(400);
            return
        }
        else if(result === "OK"){
            res.status(201);
            return
        }
    })
    res.status(501);
    return
});//ok

//delete the restaurant
router.delete('/:rid',function(req,res){
    RestaurantDao.deleteRestaurant(req.params.rid,function(result){
        if(result === "RestaurantNotExist"){
            res.status(400);
            return;
        }
        res.status(200);
        return;
    });
    res.status(501);
    return;
});//ok

//get the menu from the restaurant
router.get('/:rid/menus',function(req,res){
    MenuDao.findByRestId(req.params.rid,function(menus){
        var myJson = JSON.stringify(menus);
        res.status(200).json(myJson);
    })
    res.status(501);
});//ok

//insert new food the restaurant's menu
router.post('/:rid/menus',function(req,res){


    MenuDao.insertMenu(req.body.name,req.body.storeId,req.body.price,function(result){
        if(result === "ErrHaveDuplicateData"){
            res.status(400);

        }
        else if(result === "OK"){
            res.status(200);
        }
    })
    res.status(501);
});//ok

//delete food by mid
router.delete('/:rid/menus/:mid',function(req,res){
    MenuDao.deleteMenu(req.params.mid,function(result){
        if(result === "FoodNotExist"){
            res.status(400);
            return
        }
        res.status(200);
        return
    })
    res.status(501);
    return
});//ok

// get the restaurant info
router.get('/:rid',function(req,res){
    RestaurantDao.findById(req.params.rid,function(restaurant){
        var myJson = JSON.stringify(restaurant);
        res.status(200).json(myJson);
    })
    res.status(501);
});//ok

//尚未實作//bug 這url名字重複了要改
//get the restaurants that is around this area
router.get('/:location',function(req,res){

});
//尚未實作
//get the orders from restaurant
router.get('/:rid/orders',function(req,res){
    OrderDao.findOrderBy_rId(req.params.rid,function(orders){
        order.forEach(element => {
        });
    })
    res.status(501);
});
//尚未實作
//the restaurant update the status of the order
router.put('/:rid/orders/:oid/status/:status',function(req,res){
    res.status(501);
})

module.exports = router;