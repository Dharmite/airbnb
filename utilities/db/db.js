const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


async function postToDB(model, document) {
  const modelFound = await mongoose.model(model);
  const resultPromise = await modelFound.create(document);
  return resultPromise;
}

async function findDocumentByProperty(model, object) {
  const modelFound = await mongoose.model(model);
  const resultPromise = await modelFound.findOne(object);
  return resultPromise;
}

module.exports = {
  postToDB: postToDB,
  findDocumentByProperty
};
