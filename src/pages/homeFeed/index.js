import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import NewPostWidget from "pages/posts/NewPostWidget";
import PostsWidget from "pages/posts/PostsWidget";
import {
  useGetAllPostsQuery,
  useGetFollowersQuery,
  useGetUserByIdQuery,
} from "state/api-hook";
import UserWidget from "./UserWidget";
import WidgetWrapper from "components/WidgetWrapper";

const HomeFeed = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.auth.user);
  const { data, error, isLoading, refetch } = useGetAllPostsQuery({
    refetchOnMountOrArgChange: true,
  });

  const following = user.following;
  const followers = user.followers;
  const filteredFollowers = followers.filter(
    (follower) => !following.includes(follower)
  );
  console.log(filteredFollowers);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const data = await Promise
      //   .all
      //   // filteredFollowers.map((follower) =>
      //   //   useGetUserByIdQuery({ user: follower })
      //   // )
      //   ();
      // setSuggestions(data);
    };
    fetchData();
  }, [filteredFollowers]);

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          sx={{
            height: 700,
            overflow: "hidden",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: 0,
            },
          }}
        >
          <NewPostWidget picturePath={user.picturePath} refetch={refetch} />
          <PostsWidget posts={data} refetch={refetch} />
        </Box>
        {isNonMobileScreens && (
          <WidgetWrapper flexBasis="26%" textAlign="center">
            <Typography
              color={palette.neutral.main}
              variant="h5"
              fontWeight="500"
              mb="1rem"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              Friend Suggestions
            </Typography>
            <Divider />
          </WidgetWrapper>
        )}
      </Box>
    </Box>
  );
};

export default HomeFeed;
