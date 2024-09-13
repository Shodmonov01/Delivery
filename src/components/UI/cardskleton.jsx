import React from "react";
import { Skeleton } from "@mui/material";
const CardSkeleton = () => {
  return (
    <div>
      {" "}
      <Skeleton
        variant="rectangular"
        width={300}
        height={150}
        animation="wave"
      />{" "}
      <Skeleton variant="text" width={300} />{" "}
      <Skeleton variant="text" width={300} />{" "}
    </div>
  );
};
export default CardSkeleton;
