var mongoose = require('mongoose');
var config = require('../config.json');

var cardsSchema = mongoose.Schema({
	email: String,
	cards : []
});

var Cards = mongoose.model('Cards',cardsSchema);

module.exports.saveData = function(cardsData, done){
	var error = {};
	Cards.findOne({'email': cardsData.email}).exec(function(err, cardsRes){
		if(cardsRes){
			if(cardsRes.email === cardsData.email){
				console.log('duplicate email');
				error.code = 11000;
				return done(error, null);
			}
		}
		else{
			
			var newCards = new Cards(cardsData);
			console.log(newCards);
			newCards.save(done);
		}
	 });
}

module.exports.fetchData =  function(email,done){
	var error = {};
	Cards.findOne({'email': email}).exec(function(err, cardsRes){
		console.log(cardsRes);
		if(cardsRes){
				return done(null, cardsRes);
		}
		else{
			error.code = 404;
			return done(error,null);
		}
	});
}