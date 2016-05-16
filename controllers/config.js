var mongoose = require('mongoose');
var Config  = mongoose.model('Config');
var Data  = mongoose.model('Data');
var fs = require('fs');

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

            Data.find(function (err, response) {
                console.log("here")
                console.log(error)
                console.log(response)
                response.forEach(function(obj) {
                  console.log(obj)
                });
            });

        /**  fs.writeFile("/tmp/test", "Hey there!", function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
          });*/

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
  Config.findOne({
    'id_config': 1
  },'header', function (error, response) {
    allData = response;
  });
  Config.findOne({
    'id_config': 2
  },'header', function (error, response) {
    configdata = response;
  });
  res.send({
      success: true,
      all:allData,
      config:configData
  });
}

exports.modifyData = function (req, res) {
  Config.findOne({
    'id_config': 2
  },'header', function (error, response) {
    response.header = req.params.columns
  });
  res.send({
      success: true,
  });
}
