var express = require('express')
var router = express.Router()

router.get('/',function(req,res,next){
	res.render('index',{title: 'Express'});
});
router.get('/abc',function(req,res,next){
	res.json({"greeting":"Hello"});
})

module.exports = router;