import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Alert } from "@material-tailwind/react";
import React from "react";

const MNotification = ({ text }) => {
  return (
    <Alert
      key={"red"}
      show={true}
      color={"red"}
      icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
    >
      {text}
    </Alert>
  );
};

export default MNotification;
