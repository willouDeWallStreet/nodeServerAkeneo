var Request = require("request");
var http = require("http");
var express = require('express')
var app = express()

var x;
var aux;
var y;

// le code si dessous contient des erreurs

// Get all products part
// on this route, we get all products for M-Ticket
app.get('/products?scope=mobile', function (req, res) {
    // Get token
    Request.post({
    	"url": "http://10.10.12.245/api/oauth/v1/token",
    	"headers": {
    		'Authorization': 'Basic MV81N2hleGR5eGM5b2drNGtrazBzY3Nja29vYzgwczRvNGtzd3NrMGNzdzQ4bzhrdzhzODo1azRoZmhlczloOGc4MHdjc2Nzazg4b284NHc4NGNzb29zMGdrMGNzZzRnczhnMGN3MA==',
    		'content-type': 'application/json'
    	},
    	"body": JSON.stringify({
    		"grant_type": "password",
    		"username": "product-ref-transpole",
    		"password": "CLT291jm"
    	})
    }, (error, response, body) => {
    	if(error) {
    		return console.log(error);
    	}
    	console.log("--- POST PART ---");
    	x = JSON.parse(body).access_token;
    	console.log("X = "+x);
    	console.log(JSON.parse(body));
    	console.log(JSON.parse(body).access_token);
    	console.log('statusCode:', response && response.statusCode);
    }).pipe(
    // Get products
    Request.get({"url": "http://10.10.12.245/api/rest/v1/products?scope=mobile?attributes=description,label_svd,price,vat",
    	"headers": {
    		'Authorization': 'Bearer '+x
    	}
    }, (error, response, body) => {
    	if(error) {
    		return console.log(error);
    	}
    	console.log("--- GET PART ---");
    	console.log("Body : "+body);
    	console.log("X = "+x);
    	aux = JSON.parse(body)._embedded;
    	y = JSON.stringify(y);
    	console.log(aux);
    	res.send(body);
    }));

})

app.listen(8080, () => console.log('Example app listening on port 8080!'))

