import React from "react";

const Toggle = props => {
  let classes = "fa fa-toggle-off";
  
  if (!props.liked) classes = "fa fa-toggle-on";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Toggle;
