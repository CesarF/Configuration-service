var mongoose = require('mongoose');
var Config  = mongoose.model('Config');
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
