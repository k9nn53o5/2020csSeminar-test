var express = require('express');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var OrderDao = require('../model/Order').OrderDao;

// get all restaurants info
router.get('/',function(req,res){
    RestaurantDao.getAll(function(restaurants){
        if(restaurants === undefined){
            res.status(400).end();
        }
        res.status(200).send(restaurants);
        return
    });
});

// verify the restaurant name and password
router.post('/verify', function (req, res) {
    RestaurantDao.rName2rId(req.body.name,function(rid){
        if(rid === undefined){
            res.status(400).json({result: "RestaurantNotExist"});
            return
        }
        RestaurantDao.findById(rid,function(restaurant){
            if(restaurant.password === req.body.password){
                res.status(200).json({result: "Valid",id: restaurant.id});
                return
            }
            else{
                res.status(400).json({result: "PasswordWrong"});
                return
            }
        })
    })
});//ok

//insert a new restaurant
router.post('/',function(req,res){
    var newstore = req.body
    RestaurantDao.newRestaurant(newstore.address,newstore.phone,newstore.name,newstore.password,function(result){
        if(result === "ErrHaveDuplicateData"){
            res.status(400).end();
            return
        }
        else if(result === "OK"){
            res.status(200).end();
            return
        }
    });
});//ok

//delete the restaurant
router.delete('/:rid',function(req,res){
    RestaurantDao.deleteRestaurant(req.params.rid,function(result){
        if(result === "RestaurantNotExist"){
            res.status(400).end();
            return;
        }
        res.status(200).end();
        return;
    });
});//ok

//get the menu from the restaurant
router.get('/:rid/menus',function(req,res){
    MenuDao.findByRestId(req.params.rid,function(menus){
        if(menus === undefined){
            res.status(400).end();
        }
        res.status(200).send(menus);
    })
});//ok

//insert new food the restaurant's menu
router.post('/:rid/menus',function(req,res){
    MenuDao.insertMenu(req.body.name,req.body.storeId,req.body.price,function(result){
        if(result === "ErrHaveDuplicateData"){
            res.status(400).json({"result":"ErrHaveDuplicateData"});
        }
        else if(result === "OK"){
            res.status(200).end();
        }
    });
});//ok

//delete food by mid
router.delete('/:rid/menus/:mid',function(req,res){
    MenuDao.deleteMenu(req.params.mid,function(result){
        if(result === "FoodNotExist"){
            res.status(400).json({"result":"FoodNotExist"});
            return;
        }
        res.status(200).end();
        return;
    });
});//ok

//delete food by name
router.delete('/:rid/menus/foodName/:name',function(req,res){
    MenuDao.dName2dId(req.params.name,function(foodid){
        console.log(foodid);
        if(foodid === "can't find"){
            res.status(400).json({"result":"FoodNotExist"});
            return;
        }
        MenuDao.deleteMenu(foodid.dishId,function(result){
            if(result === "FoodNotExist"){
                res.status(400).json({"result":"FoodNotExist"});
                console.log("2");
                console.log(result);
                return;
            }
            res.status(200).end();
            return;
        });
    });
});//ok

// get the restaurant info
router.get('/:rid',function(req,res){
    RestaurantDao.findById(req.params.rid,function(restaurant){
        if(restaurant === undefined){
            res.status(400).end();
            return
        }
        res.status(200).send(restaurant);
        return
    });
});//ok

//the restaurant update the status of the order (1)start cooking(status:Cooking) (2)finish cooking(status:FoodWasCooked)
router.put('/:rid/action',function(req,res){
    restaurantAction = req.body;
    OrderDao.findOrderBy_oId(restaurantAction.oId,function(order){
        if(typeof order != "object"){
            res.status(400).end();
            console.log(typeof order)
            return;
        }
        if(order[0] === undefined){
            res.status(404).end();
            return;
        }
        if(order[0].rId != req.params.rid){
            res.status(403).end();
            return;
        }

        if(restaurantAction.action === 'StartCooking'){
            OrderDao.r_start_cooking(restaurantAction.oId,function(result){
                console.log(result);
                if(result==="orderNotExist"){
                    res.status(400).end();
                    return;
                }
                if(result === "orderStatusErr"){
                    res.status(400).end();
                    return;
                }
                res.status(200).end();
                return;
            });
        }
        else if(restaurantAction.action === "FinishCooking"){
            OrderDao.r_finish_cooking(restaurantAction.oId,function(result){
                if(result==="orderNotExist"){
                    res.status(400).end();
                    return;
                }
                if(result === "orderStatusErr"){
                    res.status(400).end();
                    return;
                }
                res.status(200).end();
                return;
            });
        }
        else{
            res.status(400).end();
            return;
        }
    });
});//ok


//get the orders from restaurant
router.get('/:rid/orders',function(req,res){
    OrderDao.findOrderBy_rId(req.params.rid,function(orders){
        if(orders === undefined){
            res.status(400).end();
        }
        res.status(200).send(orders);
        return;
    });
});



module.exports = router;