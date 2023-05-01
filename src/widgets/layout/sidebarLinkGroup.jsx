import React from "react";
import { useState } from "react";

const SidebarLinkGroup = (props) => {
  const [open, setOpen] = useState(props.activeCondition);
  const handleClick = () => {
    setOpen(!open);
  };
  return <li>{props.children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
