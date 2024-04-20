import React from "react";
import CommentModal from "./CommentModal";
import CommentsWidget from "./CommentsWidget";

const Comments = ({ open, setOpen, postId }) => {
return (
<div>
    <CommentModal setOpen={setOpen} open={open}>
    <CommentsWidget postId={postId} />
    </CommentModal>
</div>
);
};

export default Comments;
