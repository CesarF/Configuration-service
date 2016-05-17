var mongoose = require('mongoose');
var Config  = mongoose.model('Config');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var request = require('request');
var https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

exports.loadData = function (req, res) {
  getModels()
  //  generateJsonValidColumns();
    res.send({
       success: true,
    });
}
exports.configData = function (req, res) {
    var allData;
    var configdata;
    Config.findOne({'id_config': 1 },'header',function (error, response) {
      console.log(response)
      allData = response;
      Config.findOne({'id_config': 2 },'header',function (error, response) {
        console.log(response)
        configdata = response;
        res.send({
            success: true,
            all:allData.header,
            config:configdata.header
        });
      });
    });
}

exports.modifyData = function (req, res) {
    Config.findOne({
      'id_config': 2
    },'header', function (error, response) {
      response.header = req.params.columns
      response.save()
      res.send({
          success: true,
      });
    });
}

function generateJsonValidColumns(){
    Config.findOne({'id_config': 1 },'header',function (error, response) {
       var json = []
       var allColumns = response.header.split(",")
       Config.findOne({'id_config': 2 },'header',function (error, response) {
          var json = []
          var columns = response.header.split(",")
          allColumns.forEach(function(column){
             var is = columns.indexOf(column)
             var included = false
             if(is>=0)included = true
             json.push({"type":"CATEGORICAL","name":column,"include":included,"imputeOption":"DISCARD"})
          });
          console.log(json)
          postModificarColumnas(json)
       });
    });
}

function postModificarColumnas(jsonBody){
   request({
       url: 'https://ec2-52-36-54-240.us-west-2.compute.amazonaws.com:9443/api/analyses/8/features', //URL to hit
       method: 'POST',
       json: jsonBody,
       auth: {
           user: 'admin',
           password: 'admin'
       },
       headers: {
           'Content-Type': 'application/json',
           'host': 'ec2-52-36-54-240.us-west-2.compute.amazonaws.com'
       }
   }, function(err, response, body){
       if(err) console.log(err);
       else{
           console.log(body);
           console.log("MODIFIQUE COLUMNAS");
           postCrearModelo();
       }
   });
 }

 function postCrearModelo(){
   var jsonBody = { "name": 'executable',  "analysisId": 8, "versionSetId": 48 };
   request({
       url: 'https://ec2-52-36-54-240.us-west-2.compute.amazonaws.com:9443/api/models', //URL to hit
       method: 'POST',
       json: jsonBody,
       auth: {
           user: 'admin',
           password: 'admin'
       },
       headers: {
           'Content-Type': 'application/json',
           'host': 'ec2-52-36-54-240.us-west-2.compute.amazonaws.com'
       }
   }, function(err, response, body){
       if(err) console.log(err);
       else{
           console.log(body);
           console.log("CREE MODELO");
           getModels()
       }
   });
 }

 function getModels(){
   request({
       url: 'https://ec2-52-36-54-240.us-west-2.compute.amazonaws.com:9443/api/models', //URL to hit
       method: 'GET',
       auth: {
           user: 'admin',
           password: 'admin'
       },
       headers: {
           'Content-Type': 'application/json',
           'host': 'ec2-52-36-54-240.us-west-2.compute.amazonaws.com'
       }
   }, function(err, response, body){
       if(err) console.log(err);
       else{
           var json = JSON.parse(body)
           var last_model = json[json.length - 1];
           console.log(last_model);
           console.log("MODELOS "+last_model.id);
           Config.findOne({'id_config': 2 },function (error, config) {
              config.model = last_model.id;
              config.save()              
           });
       }
   });
 }
