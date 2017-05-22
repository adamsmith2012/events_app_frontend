var express = require('express')
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('*', function(req, res){
	res.redirect('/');  //redirect back to index route
});

app.listen(port, function() {
    console.log('Running on port: ', port);
});
