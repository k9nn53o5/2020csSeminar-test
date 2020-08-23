var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index',{title: 'Express'})
    res.status(200).json({greeting: "hello this is demo test"});
});

router.get('/demo',function(req, res, next){
    if(req.query.username === 'a' && req.query.password === 'bbb'){
        res.status(200).json({result: true});
    }
    else{
        res.status(200).json({result: false});
    }

})

module.exports = router;