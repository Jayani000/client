import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import { useSelector } from "react-redux";
import FlexBox from "./FlexBox";
import ProfileImage from "./ProfileImage";
import UpdatePostModal from "pages/posts/UpdatePostModel";
import UpdateForm from "pages/posts/UpdateForm";
import { useNavigate } from "react-router-dom";

const FriendWidget = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  postId,
  description,
  refetch,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [isForm, setIsForm] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.auth.user.id);
  const isOwner = loggedInUser === friendId;

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = async () => {
    const serverResponse = await fetch(
      `http://localhost:8080/api/posts/deletePost/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!serverResponse.ok) {
      alert("unsuccessful!");
    }

    if (serverResponse.ok) {
      const response = await serverResponse.json();
      console.log(response);
      refetch();
    }
  };

  return (
    <FlexBox>
      <FlexBox gap="1rem">
        <ProfileImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBox>
      {isOwner && (
        <IconButton>
          {" "}
          <MoreVert
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={deleteHandler}>Delete this post</MenuItem>
            <MenuItem onClick={() => setIsForm(!isForm)}>Update post</MenuItem>
            {isForm && (
              <UpdatePostModal setOpen={setIsForm} open={isForm}>
                <UpdateForm
                  id={postId}
                  location={subtitle}
                  description={description}
                  refetch={refetch}
                  setIsForm={setIsForm}
                />
              </UpdatePostModal>
            )}
          </Menu>
        </IconButton>
      )}
    </FlexBox>
  );
};

export default FriendWidget;
