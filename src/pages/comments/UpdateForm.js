import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const commentSchema = yup.object().shape({
  comment: yup.string().required("Comment cannot be empty"),
});

const UpdateForm = ({ id, comment, refetch, setIsForm }) => {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);

  const submitRequest = async (values, onSubmitProps) => {
    const response = await fetch(
      `http://localhost:8080/api/comments/updateComment/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: values.comment }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      alert(responseData.message);
      throw new Error(responseData.message);
    }

    onSubmitProps.resetForm();
    refetch();
    setIsForm(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await submitRequest(values, onSubmitProps);
    } catch (error) {
      setError(error.message);
      setOpen(true);
    }
  };

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ comment: comment }}
        validationSchema={commentSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                label="Comment"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.comment}
                name="comment"
                color="success"
                error={Boolean(touched.comment) && Boolean(errors.comment)}
                helperText={touched.comment && errors.comment}
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
                }}
              >
                Update Comment
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateForm;
