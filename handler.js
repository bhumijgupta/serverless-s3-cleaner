"use strict";

// Setup config
const aws = require("aws-sdk"),
  s3 = new aws.S3(),
  params = {
    Bucket: "cert-s3-bucket"
  };

// List all the objects in s3 bucket
let listObj = () => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
};

// Lambda function
module.exports.s3Cleaner = async event => {
  try {
    const response = await listObj();
    let today = new Date();
    let toBeDeleted = [];
    // Iterate through all the documents in S3
    response["Contents"].forEach(doc => {
      let date = new Date(doc.LastModified);
      // If LastModified is more than 7 days old, delete the object
      if ((today - date) / (1000 * 60 * 60 * 24) >= 7) {
        toBeDeleted.push({
          Key: doc.Key
        });
      }
    });
    // If no file more than 7 days ols
    if (toBeDeleted.length === 0) {
      console.log("No item deleted");
      return {
        statusCode: 200,
        body: "No item deleted"
      };
    }
    console.log(toBeDeleted);
    var params = {
      Bucket: "cert-s3-bucket",
      Delete: {
        Objects: toBeDeleted
      }
    };
    s3.deleteObjects(params, (err, succ) => {
      if (err) console.log("err: ", err);
      else {
        console.log(succ);
      }
    });
    return {
      statusCode: 200,
      body: "Finished Execution"
    };
  } catch (err) {
    return { statusCode: 500, body: err };
  }
};
