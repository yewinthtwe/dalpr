import React from "react";

const isAdmin = props => {
  let classes = "fa fa-check";
  if (!props.isAdmin) classes = "fa fa-times";
  return (
    <i
      onClick={props.onClick}
      // style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};
//fa fa-toggle-on
export default isAdmin;
