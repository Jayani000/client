import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PostWidget from "./PostWidget";
import { useGetAllPostsQuery } from "state/api-hook";

const PostsWidget = ({ posts, refetch }) => {
  console.log(posts);

  // const getPosts = async () => {
  //   const response = await fetch("http://localhost:8080/api/posts/getPosts", {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   getPosts();
  // }, []);

  return (
    <>
      <div>
        {posts &&
          [...posts]
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(({ id, user, description, location, pictures }) => (
              <PostWidget
                key={id}
                id={id}
                user={user}
                description={description}
                location={location}
                pictures={pictures}
                refetch={refetch}
              />
            ))}
      </div>
    </>
  );
};

export default PostsWidget;
