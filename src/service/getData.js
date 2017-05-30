// var city=require('./tempdata/city.js')
// var express = require('express')
// var appRoutes = express.Router()
// var app = express()
// appRoutes.get('/city',function(req,res){
//   res.json({
//     errno:0,
//     data:city.
//   })
// })
// app.use('/api',appRoutes)
var currentCity=function(content){
	this.$http.get('/api/currentcity').then(response => {
	  	var data = response.body;
	  	content = data.data
	}, response => {
	    content = 'fail'
	});
}
export {currentCity}