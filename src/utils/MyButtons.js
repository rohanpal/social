import React from "react";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({ tip, placement, children, btnClass, tipClass, onClick }) => (
  <ToolTip title={tip} className={tipClass} placement={placement}>
    <IconButton onClick={onClick} className={btnClass}>
      {children}
    </IconButton>
  </ToolTip>
);
