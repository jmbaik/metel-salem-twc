import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

export function useMetelUpload(file, fileName) {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const SECRET_ACCESS_KEY = import.meta.env.VITE_APP_SECRET_ACCESS_KEY;
  const REGION = import.meta.env.VITE_APP_REGION;
  const S3_BUCKET = import.meta.env.VITE_APP_S3_BUCKET;

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const uploadFile = (file) => {
    console.log(file.name);
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: "upload/" + fileName,
    };
    return myBucket.putObject(params).promise();
    // .then((res) => {
    //   console.log(`Upload succeed - `, res);
    //   uploadResult = true;
    // })
    // .catch((err) => {
    //   console.log("upload failed", err);
    //   uploadResult = false;
    //   uploadError = err;
    // });
  };
  return uploadFile;
}
