import React from "react";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBox from "components/FlexBox";
import ProfileImage from "components/ProfileImage";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import {
  ManageAccountsOutlined,
  DriveFileRenameOutlineOutlined,
  AttachEmailOutlined,
} from "@mui/icons-material";

const UserWidget = ({ user }) => {
  const { id, fullName, username, picturePath, email, followers, following } = user;
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const numberOfFollowers = followers ? followers.length : 0;
  const numberOfFollowing = following ? following.length : 0;

  return (
    <WidgetWrapper
      sx={{
        backgroundColor: "#E0F7FA", // Set background color to light blue
        borderRadius: "12px", // Add border radius
        padding: "1rem", // Add padding
        color: "#000000", // Set font color to black
      }}
    >
      {/* FIRST ROW */}
      <FlexBox
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${id}`)}
      >
        <FlexBox gap="1rem">
          <ProfileImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="bold" // Set font weight to bold
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {fullName}
            </Typography>
            {/* <Typography color={medium}>{friends.length}</Typography> */}
          </Box>
        </FlexBox>
      </FlexBox>
      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <AttachEmailOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{email}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <DriveFileRenameOutlineOutlined
            fontSize="large"
            sx={{ color: main }}
          />
          <Typography color={medium}>{username}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBox mb="0.5rem">
          <Typography color={medium} fontWeight="bold" fontSize="1rem">Followers</Typography>
          <Typography color={main} fontWeight="bold" fontSize="1rem">
            {numberOfFollowers}
          </Typography>
        </FlexBox>
        <FlexBox>
          <Typography color={medium} fontWeight="bold" fontSize="1rem">Following</Typography>
          <Typography color={main} fontWeight="bold" fontSize="1rem">
            {numberOfFollowing}
          </Typography>
        </FlexBox>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
