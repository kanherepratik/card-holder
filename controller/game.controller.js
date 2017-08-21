var express = require('express');
var router = express.Router();


var cardsModel = require('../models/cards');


router.post('/fetch', function(req, res){
	cardsModel.fetchData(req.body.email, function(err, data){
		if(err){
			if(err.code === 404){
				return res.status(422).send('done');
			}
		}
		return res.status(200).send(data);
	});
});

//handle post
 router.post('/save', function(req,res){
 	cardsModel.saveData(req.body, function(err, data){
 		if(err){
 			if(err.code === 11000){
 				console.log('err',err);
 				return res.status(401).send('duplicate email');
 			}
 		}
 		return res.status(200).send('done');
 	});
 });

 module.exports = router;