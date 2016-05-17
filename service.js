var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require('mongoose');

  mongoose.connect('mongodb://54.175.183.124:27017/kml_db', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Import Models and Controllers
  var modelConfig = require('./models/config')(app, mongoose);
  var modelTable = require('./models/table')(app, mongoose);
  var ConfigCtrl = require('./controllers/config');
  console.log('Load data')


  var Config  = mongoose.model('Config');
  console.log('Load config')
  Config.find({'id_config': 1 },function (error, response) {
        if (!error && response) {
          console.log("delete 1")
          response.forEach(function(obj) {
            obj.remove(function (err) {
          // if no error, your model is removed
            });
          });
        }
  });
  Config.find({'id_config': 2 },function (error, response) {
        if (!error && response) {
          console.log("delete 2")
          response.forEach(function(obj) {
            obj.remove(function (err) {
          // if no error, your model is removed
            });
          });
        }
  });
  var allConfig = new Config({id_config:1,
    header:"Breed,Adapts Well to Apartment Living,Affectionate with Family,Amount Of Shedding,Dog Friendly,Drooling Potential,Easy To Groom,Easy To Train,Energy Level,Exercise Needs,Friendly Toward Strangers,General Health,Good For Novice Owners,Incredibly Kid Friendly Dogs,Intelligence,Intensity,Potential For Mouthiness,Potential For Playfulness,Potential For Weight Gain,Prey Drive,Sensitivity Level,Size,Tendency To Bark Or Howl,Tolerates Being Alone,Tolerates Cold Weather,Tolerates Hot Weather,Wanderlust Potential,Cardiac Frequency,Average Temperature,Weight,Breaths per second,sick"});
  allConfig.save()
//  console.log(allConfig.header)
  var initConfig = new Config({id_config:2,
    header:"Breed,Cardiac Frequency,Average Temperature,Weight,Breaths per second,Exercise Needs,sick"});
  initConfig.save()
//  console.log(initConfig.header)
  // API routers
  var data = express.Router();

  data.route('/load')
  	.get(ConfigCtrl.loadData)

  data.route('/data')
    .get(ConfigCtrl.configData)

  data.route('/model')
    .get(ConfigCtrl.getModel)

  data.route('/modify/:columns/:dataset_id')
    .post(ConfigCtrl.modifyData)

  app.use('/', data);

  // Start Server
  app.listen(3000, function(){
  	console.log("Server runing on http://localhost:3000");
  })
