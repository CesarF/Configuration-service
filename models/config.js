exports = module.exports = function(app, mongoose) {
  var ConfigSchema = new mongoose.Schema({
    id_config: { type: Number },
    header: {type: "String"},
    dataset_id: { type: Number },
    model_id:{ type: Number }
  },
  { collection: 'data_config' });
  mongoose.model('Config', ConfigSchema,'data_config');
};
