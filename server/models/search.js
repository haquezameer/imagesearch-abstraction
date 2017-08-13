const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const _ = require('lodash');

const searchschema = new mongoose.Schema({
    term : {
      type: String,
      required: true
    },
    when : {
      type: Date,
      required: true
    }
});

searchschema.methods.toJSON = function(){
  const search = this;
  const searchObj = search.toObject();
  return _.pick(searchObj,['term','when']);
}

const searchTerm = mongoose.model('searchTerm',searchschema);

module.exports = {
  searchTerm
};
