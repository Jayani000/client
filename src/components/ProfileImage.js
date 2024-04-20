import React from "react";
import { Box } from "@mui/material";

const ProfileImage = ({ image, size = "60px" }) => {
  return (
    <Box>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:8080/uploads/images/${image}`}
      />
    </Box>
  );
};

export default ProfileImage;
