import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  BookmarkOutlined,
  BookmarkBorder,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBox from "components/FlexBox";
import FriendWidget from "components/FriendWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserByIdQuery } from "state/api-hook";
import { setSavedItems } from "state/auth-hook";
import Comments from "pages/comments";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const PostWidget = ({ id, user, description, location, pictures, refetch }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [isComments, setIsComments] = useState(false);
  const [likes, setLikes] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  //like post
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const isLiked = Boolean(likes.includes(loggedInUserId));
  const likeCount = likes.length;
  //save post
  const savedItems = useSelector((state) => state.auth.savedItems);
  const isSaved = Boolean(savedItems.includes(id));

  const postImages = pictures.filter(Boolean);
  const { data } = useGetUserByIdQuery({ user });

  const [open, setOpen] = useState(false);

  const getLikes = async () => {
    const response = await fetch(
      `http://localhost:8080/api/posts/getLikes/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const likes = await response.json();
    if (!response.ok) {
      alert("Not Successful");
    } else {
      setLikes(likes);
    }
  };
  useEffect(() => {
    getLikes();
  }, []);

  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:8080/api/posts/${id}/likePost?userId=${loggedInUserId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedPost = await response.json();
    if (!response.ok) {
      alert("Not Successful");
    } else {
      console.log(updatedPost);
      refetch();
    }
  };

  const patchSave = async () => {
    const response = await fetch(
      `http://localhost:8080/api/users/${loggedInUserId}/savePost?postId=${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedUser = await response.json();
    if (!response.ok) {
      alert("Not Successful");
    } else {
      console.log(updatedUser);
      const savedItems = updatedUser.savedItems;
      dispatch(setSavedItems({ savedItems: savedItems }));
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      {data && (
        <FriendWidget
          friendId={data.id}
          postId={id}
          name={data.fullName}
          subtitle={location}
          description={description}
          refetch={refetch}
          userPicturePath={data.picturePath}
        />
      )}

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {pictures && (
        <Swiper
          grabCursor
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          navigation
          loop
          modules={[Pagination]}
          style={{
            paddingBottom: "3rem",
            "& .swiper-pagination-bullet": {
              background: "blue",
            },
            "& .swiper-button-next:after": {
              fontSize: "2rem !important",
            },
            "& .swiper-button-prev:after": {
              fontSize: "2rem !important",
            },
          }}
        >
          {postImages.map((image, index) => (
            <SwiperSlide key={index}>
              <LazyLoadImage
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`http://localhost:8080/uploads/images/${image}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <FlexBox mt="0.25rem">
        <FlexBox gap="1rem">
          <FlexBox gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary, fontSize: "25px" }} />
              ) : (
                <FavoriteBorderOutlined sx={{ fontSize: "23px" }} />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBox>

          <FlexBox gap="0.3rem">
            <IconButton onClick={() => setOpen(!open)}>
              <ChatBubbleOutlineOutlined sx={{ fontSize: "23px" }} />
            </IconButton>
            <Typography>4</Typography>
            {open && <Comments open={open} setOpen={setOpen} postId={id} />}
          </FlexBox>
        </FlexBox>

        <IconButton onClick={patchSave}>
          {isSaved ? (
            <BookmarkOutlined sx={{ color: "#E0F7FA", fontSize: "25px" }} />
          ) : (
            <BookmarkBorder sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
      </FlexBox>
      {/* {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )} */}
    </WidgetWrapper>
  );
};

export default PostWidget;
