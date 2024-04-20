import React from "react";
import CommentWidget from "./CommentWidget";
import { Box } from "@mui/material";
import { useGetAllCommentsQuery } from "state/api-hook";
import NewCommentWidget from "./NewCommentWidget";

const CommentsWidget = ({ postId }) => {
  const { data, refetch } = useGetAllCommentsQuery();
  let postComments = [];
  if (data) {
    console.log(postComments);
    postComments = data.filter((comment) => comment.post === postId);
  }

  return (
    <div>
      {postComments &&
        postComments.map((comment) => (
          <CommentWidget
            name="Anusara"
            id={comment.id}
            key={comment.id}
            comment={comment.comments}
            user={comment.user}
            userPicturePath=""
            refetch={refetch}
            postId={comment.post}
          />
        ))}
      <Box>
        <NewCommentWidget refetch={refetch} post={postId} />
      </Box>
    </div>
  );
};

export default CommentsWidget;
