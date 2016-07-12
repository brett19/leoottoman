'use strict';

var ottoman = require('ottoman');
var models = require('./models');

var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();

var port = process.env.port || 3000;

app.get("/country/:id", function(request, response){

  var countryId = request.params.id;

  models.Country.getById(countryId, function(err, country){
    if (err) {
      response.status(404).json({"error": err});
    } else {
      response.status(200).json(country);
    }

  });

});

app.get("/customers/:code", function(request, response){

  var countryCode = request.params.code;

  var country = models.Country.ref(countryCode);

  models.Customer.find({
    'billingAddress': {
      'country': country
    }
  }, function(err, customers) {
    if (err) {
      response.status(404).json({"error": err});
    } else if (customers.length == 0) {
      response.status(200).json({"status": "No document matched " + countryCode});
    } else {
      response.status(200).json(customers);
    }
  });

});

app.post("/customers", jsonParser, function(request, response) {

  var customerData = request.body;

  models.Customer.create(customerData, function(err, customer) {

    if(err) {
      response.json(err);
    } else {
      response.json(customer);
    }

  });

});

app.put("/customers/:id", jsonParser, function(request, response){

  var customerUsername = request.params.id;

  models.Customer.getById(customerUsername, function(err, customer) {

    if(err) {
      response.json(err);
      return;
    }

    customer.firstName = request.body.firstName;
    customer.lastName = request.body.lastName;

    customer.save(function(err) {
      if(err) {
        response.json(err);
      } else {
        response.json(customer);
      }
    });

  });

});

app.listen(port, function(err){
  console.log("customer360 running on port:", port);;
});


