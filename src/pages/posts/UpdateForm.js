import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const postSchema = yup.object().shape({
  description: yup.string().required("Description cannot be empty"),
  location: yup.string().required("Location cannot be empty"),
});

const initialValues = {
  description: "",
  location: "",
};

const UpdateForm = ({ id, location, description, refetch, setIsForm }) => {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);

  initialValues.description = description;
  initialValues.location = location;

  const submitRequest = async (values, onSubmitProps) => {
    const response = await fetch(
      `http://localhost:8080/api/posts/updatePost/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    if (response.ok) {
      if (responseData) {
        onSubmitProps.resetForm();
        refetch();
        setIsForm(false);
      }
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await submitRequest(values, onSubmitProps);
    } catch (error) {
      setError(error.message);
      console.log(error);
      setOpen(true);
    }
  };

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={postSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreen ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                color="success"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                color="success"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  borderRadius: "1.5rem",
                  fontWeight: "bold",
                  fontSize: "0.8rem",

                  // "&:hover": { color: palette.primary.main },
                }}
              >
                Update Post
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateForm;
