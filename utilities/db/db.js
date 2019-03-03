const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

async function postToDB(model, document) {
  const modelFound = await mongoose.model(model);
  const resultPromise = await modelFound.create(document);
  return resultPromise;
}

async function findDocumentByProperty(model, object, populate = "") {
  const modelFound = await mongoose.model(model);
  return modelFound.findOne(object).populate(populate);
}

async function updateDocumentByProperty(
  model,
  property,
  newObject,
  populate = ""
) {
  const modelFound = await mongoose.model(model);
  return modelFound.findOneAndUpdate(property, newObject).populate(populate);
}

async function deleteDocumentByProperty(model, property, populate = "") {
  const modelFound = await mongoose.model(model);
  return modelFound.findOneAndRemove(property).populate(populate);
}

module.exports = {
  postToDB: postToDB,
  findDocumentByProperty: findDocumentByProperty,
  updateDocumentByProperty: updateDocumentByProperty,
  deleteDocumentByProperty: deleteDocumentByProperty
};
