var mongoose = require('mongoose');
var Config  = mongoose.model('Config');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');

exports.loadData = function (req, res) {
  Config.findOne({
    'id_config': 2
  },'header', function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                message: 'not found'
            });
        } else {

        postModificarColumnas();

         res.send({
            success: true,
            config:response
         });
      }
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

function postModificarColumnas(){
    // Build the post string from an object
   var post_data = querystring.stringify({
       'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
       'output_format': 'json',
       'output_info': 'compiled_code',
         'warning_level' : 'QUIET',
         'js_code' : codestring
   });

   // An object of options to indicate where to post to
   var post_options = {
       host: 'https://ec2-52-36-54-240.us-west-2.compute.amazonaws.com',
       port: '9443',
       path: '/api/analyses/8/features',
       method: 'POST',
       headers: {
           'Authorization':'Basic YWRtaW46YWRtaW4='
           'Content-Type': 'application/json'
       }
   };

   // Set up the request
   var post_req = http.request(post_options, function(res) {
       res.setEncoding('utf8');
       res.on('data', function (chunk) {
           console.log('Response: ' + chunk);
       });
   });

   // post the data
   post_req.write(post_data);
   post_req.end();
}
