import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";

const Pdf: React.FC = (props: any) => {
  const isDisplay = useMediaQuery("(min-width:600px)");
  const filename = props.src;
  return (
    <div>
      {!isDisplay && (
        <embed
          src={filename}
          type="application/pdf"
          width="200px"
          height="400px"
        ></embed>
      )}
      {isDisplay && (
        <embed
          src={filename}
          type="application/pdf"
          width="600px"
          height="800px"
        ></embed>
      )}
    </div>
  );
};

export default Pdf;
