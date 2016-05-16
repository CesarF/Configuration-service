exports = module.exports = function(app, mongoose) {
  var ConfigSchema = new mongoose.Schema({
    id_config: { type: Number },
    header: {type: "String"}
  },
  { collection: 'data_config' });
  mongoose.model('Config', ConfigSchema,'data_config');
};
