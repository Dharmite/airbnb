const mongoose = require("mongoose");

async function postToDB(model, document) {
  const modelFound = await mongoose.model(model);
  const resultPromise = await modelFound.create(document);
  return resultPromise;
}

async function findDocumentByProperty(model, object) {
    console.log(object);
  const modelFound = await mongoose.model(model);
  const resultPromise = await modelFound.findOne(object);
  console.log(resultPromise);
  return resultPromise;
}

module.exports = {
  postToDB: postToDB,
  findDocumentByProperty: findDocumentByProperty
};
