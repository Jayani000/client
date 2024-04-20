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
import FlexBox from "components/FlexBox";
import ProfileImage from "components/ProfileImage";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "state/api-hook";
import WidgetWrapper from "components/WidgetWrapper";
import UpdateCommentModal from "./UpdateCommentModal";
import UpdateForm from "./UpdateForm";

const CommentWidget = ({
  user,
  name,
  id,
  comment,
  userPicturePath,
  postId,
  refetch,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [isForm, setIsForm] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.auth.user.id);
  const isOwner = loggedInUser === user;

  const accessToken = useSelector((state) => state.auth.accessToken);

  const { data } = useGetUserByIdQuery({ user });
  if (data) {
    userPicturePath = data.picturePath;
  }

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
      `http://localhost:8080/api/comments/deleteComment/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!serverResponse.ok) {
      alert(serverResponse.json());
    }

    if (serverResponse.ok) {
      const response = await serverResponse.json();
      console.log(response);
      refetch();
    }
  };

  return (
    <div>
      <WidgetWrapper>
        <FlexBox>
          <FlexBox gap="1rem">
            {data && <ProfileImage image={userPicturePath} size="55px" />}
            <Box
              onClick={() => {
                navigate(`/profile/${user}`);
                navigate(0);
              }}
            >
              <Typography
                color={main}
                variant="h6"
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
                {comment}
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
                <MenuItem onClick={deleteHandler}>Delete comment</MenuItem>
                <MenuItem onClick={() => setIsForm(!isForm)}>
                  Update comment
                </MenuItem>
                {isForm && (
                  <UpdateCommentModal setOpen={setIsForm} open={isForm}>
                    <UpdateForm
                      id={id}
                      comment={comment}
                      refetch={refetch}
                      setIsForm={setIsForm}
                    />
                  </UpdateCommentModal>
                )}
              </Menu>
            </IconButton>
          )}
        </FlexBox>
      </WidgetWrapper>
    </div>
  );
};

export default CommentWidget;
