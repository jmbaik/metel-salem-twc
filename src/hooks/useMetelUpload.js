import React, { useState } from "react";
import AWS from "aws-sdk";

export const useMetelUpload = ({ file, fileName }) => {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const SECRET_ACCESS_KEY = import.meta.env.VITE_APP_SECRET_ACCESS_KEY;
  const REGION = import.meta.env.VITE_APP_REGION;
  const S3_BUCKET = import.meta.env.VITE_APP_S3_BUCKET;
  const [fileName, setFileName] = useState("");

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
      Key: "upload/" + dir + "/" + fileName + "." + ext,
    };
    myBucket
      .putObject(params)
      .on("httpUploadProgress", (e) => {
        setProgress(Math.round((e.loaded / e.total) * 100));
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setSelectedFile(null);
          setDone("done");
          props.onDoneState(true);
          setImgUrl(`${dir}/${fileName}.${ext}`);
          console.log("upload imgurl = " + `${dir}/${fileName}.${ext}`);
          props.getImgUrl(`${dir}/${fileName}.${ext}`);
        }, 2000);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return {
    result,
  };
};
