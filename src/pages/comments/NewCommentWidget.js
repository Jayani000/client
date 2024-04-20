import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBox from "components/FlexBox";
import ProfileImage from "components/ProfileImage";
import { useSelector } from "react-redux";
import { Send } from "@mui/icons-material";

const NewCommentWidget = ({ refetch, post }) => {
  const user = useSelector((state) => state.auth.user.id);
  const picturePath = useSelector((state) => state.auth.user.picturePath);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [comment, setComment] = useState("");

  const createComment = async () => {
    const serverResponse = await fetch(
      `http://localhost:8080/api/comments/createComment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment, post: post, user: user }),
      }
    );

    const comments = await serverResponse.json();
    console.log(serverResponse);
    if (!serverResponse.ok) {
      throw new Error(comments.message);
    }

    setComment("");
    refetch();
  };

  const handleComment = async () => {
    try {
      await createComment();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <WidgetWrapper>
        <FlexBox gap="1.5rem">
          <ProfileImage image={picturePath} />
          <InputBase
            placeholder="Add a comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            sx={{
              width: "100%",
              backgroundColor: "#F0F0F0",
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
            endAdornment={
              <IconButton onClick={handleComment}>
                <Send />
              </IconButton>
            }
          />
        </FlexBox>
      </WidgetWrapper>
    </div>
  );
};

export default NewCommentWidget;
