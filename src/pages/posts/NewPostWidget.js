/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import FlexBox from "components/FlexBox";
import ProfileImage from "components/ProfileImage";
import WidgetWrapper from "components/WidgetWrapper";
import {
  InputBase,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Grid,
  Card,
  CardHeader,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DeleteOutlined, LocationOn, Image } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";

const FormDialog = ({ location, setLocation, isLocation, setIsLocation }) => {
  const handleClose = () => {
    setIsLocation(false);
  };

  return (
    <div>
      <Dialog
        open={isLocation}
        onClose={handleClose}
        sx={{
          ".MuiPaper-root": {
            width: "600px",
          },
        }}
      >
        <DialogTitle>Add a location</DialogTitle>
        <DialogContent>
          <TextField
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mt: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const NewPostWidget = ({ picturePath, refetch }) => {
  const [isImages, setIsImages] = useState(false);
  const [images, setImages] = useState([]);
  const [post, setPost] = useState("");
  const [location, setLocation] = useState("");
  const [isLocation, setIsLocation] = useState(false);
  const [grid, setGrid] = useState(12);
  const [imageSize, setImageSize] = useState("500px");
  const { palette } = useTheme();
  const mediumMain = "#858585";
  const medium = "#A3A3A3";
  const user = useSelector((state) => state.auth.user.id);
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => images.forEach((image) => URL.revokeObjectURL(image.preview));
  }, []);

  const imageDeleteHandler = (image) => {
    setImages(images.filter((e) => e !== image));
  };

  useEffect(() => {
    if (images.length === 1) {
      setGrid(12);
    } else {
      setGrid(6);
    }
  }, [grid, images]);

  const createPost = async () => {
    const formData = new FormData();
    formData.append("user", user);
    formData.append("description", post);
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    if (location) {
      formData.append("location", location);
    } else {
      formData.append("location", "From somewhere unknown");
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const serverResponse = await fetch(
      `http://localhost:8080/api/posts/createPost`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    const posts = await serverResponse.json();
    console.log(serverResponse);
    if (!serverResponse.ok) {
      throw new Error(posts.message);
    }

    setImages([]);
    setPost("");
    refetch();
  };

  const handlePost = async () => {
    try {
      await createPost();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBox gap="1.5rem">
        <ProfileImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: "#E0F7FA",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBox>
      {isImages && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={true}
            onDrop={(acceptedFiles) =>
              setImages(
                acceptedFiles.map((image) =>
                  Object.assign(image, {
                    preview: URL.createObjectURL(image),
                  })
                )
              )
            }
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBox>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {images.length < 4 && <p>Add Images Here</p>}
                </Box>
                {images && (
                  <IconButton
                    onClick={() => setImages(images)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBox>
            )}
          </Dropzone>
        </Box>
      )}
      {isImages && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {images.map((image, index) => (
                <Grid item xs={grid}>
                  <FlexBox>
                    <Box
                      p="1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <Card>
                        <CardHeader
                          action={
                            <IconButton
                              aria-label="settings"
                              onClick={() => imageDeleteHandler(image)}
                            >
                              <DeleteOutlined />
                            </IconButton>
                          }
                        />
                        <img
                          src={image.preview}
                          style={{ objectFit: "cover" }}
                          onLoad={() => URL.revokeObjectURL(image.preview)}
                          width={imageSize}
                          height={imageSize}
                        />
                      </Card>
                    </Box>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
      {isLocation && (
        <FormDialog
          location={location}
          setLocation={setLocation}
          isLocation={isLocation}
          setIsLocation={setIsLocation}
        />
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBox>
        <FlexBox gap="0.25rem" onClick={() => setIsImages(!isImages)}>
          <Image sx={{ color: "green", fontSize: "1.5rem" }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBox>
        <FlexBox gap="0.25rem" onClick={() => setIsLocation(!isLocation)}>
          <LocationOn sx={{ color: "red", fontSize: "1.5rem" }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Location
          </Typography>
        </FlexBox>
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            backgroundColor: "#5e70b8",
            borderRadius: "3rem",
          }}
        >
          <Typography color="#E0F7FA"> POST</Typography>
        </Button>
      </FlexBox>
    </WidgetWrapper>
  );
};

export default NewPostWidget;
