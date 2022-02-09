import React from "react";
import { 
  Box
} from '@material-ui/core';

const NotFound = () => {
  return (
    <div>

      <Box
        component="div" 
        fontWeight="fontWeightRegular" 
        fontSize={16}
        lineHeight={5}
        textAlign="left">
        License Untitled.  
      </Box>
      <Box 
        component="div"
        fontWeight="fontWeightRegular" 
        fontSize={9}
        lineHeight={5}
        fontStyle="italic" 
        textAlign="left">
        Q-Free ASA. Copyright 2020-2021.
      </Box>

    </div>

  );
  
};

export default NotFound;
