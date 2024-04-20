import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import FlexBox from "components/FlexBox";

import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/auth-hook";

const userRegisterSchema = yup.object().shape({
  fullname: yup.string().required("This field cannot be empty"),
  email: yup
    .string()
    .email("invalid email")
    .required("This field cannot be empty"),
  password: yup
    .string()
    .min(7, "must be at least 7 characters long")
    .required("This field cannot be empty"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This field cannot be empty"),
});

const userLoginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const initialLoginFormValues = {
  username: "",
  password: "",
};

const Form = (props) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const [pageType, setPageType] = useState("login");
  const [captchaKey, setCaptchaKey] = useState("");
  const [error, setError] = useState("");

  const isRegister = pageType === "register";
  const isLogin = pageType === "login";

  props.isLoginHandle(isLogin);

  const recaptchaHandler = (value) => {
    setCaptchaKey(value);
  };

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const serverResponse = await fetch(
      "http://localhost:8080/api/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    const savedUser = await serverResponse.json();
    console.log(savedUser);
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const serverResponse = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const logged = await serverResponse.json();

    if (!serverResponse.ok) {
      throw new Error(serverResponse);
    }

    if (serverResponse.ok) {
      onSubmitProps.resetForm();
      if (logged.authentication) {
        dispatch(
          setLogin({
            user: logged.user,
            accessToken: logged.authentication.accessToken,
            refreshToken: logged.authentication.refreshToken,
            savedItems: logged.user.savedItems,
          })
        );
        navigate("/feed");
      }
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) {
      try {
        await register(values, onSubmitProps);
      } catch (err) {
        setError(err.message);
        alert(error);
      }
    }

    if (isLogin) {
      try {
        await login(values, onSubmitProps);
      } catch (err) {
        setError(err.message);
        alert(error);
      }
    }
  };

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialLoginFormValues : initialValuesRegister}
        validationSchema={isLogin ? userLoginSchema : userRegisterSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
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
              {isRegister && (
                <>
                  <TextField
                    label="Full Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullname}
                    name="fullname"
                    color="success"
                    error={
                      Boolean(touched.fullname) && Boolean(errors.fullname)
                    }
                    helperText={touched.fullname && errors.fullname}
                    sx={{ gridColumn: "span 4", color: "green" }}
                  />
                </>
              )}
              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                color="success"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 4" }}
              />
              {isRegister && (
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  color="success"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              )}
              {isRegister && (
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("file", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.light}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.file ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBox>
                            <Typography>{values.file.name}</Typography>
                            <EditOutlined />
                          </FlexBox>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              )}
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                color="success"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              {isRegister && (
                <TextField
                  label="Re-enter password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.passwordConfirmation}
                  name="passwordConfirmation"
                  color="success"
                  error={
                    Boolean(touched.passwordConfirmation) &&
                    Boolean(errors.passwordConfirmation)
                  }
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              )}
              {!isLogin && (
                <ReCAPTCHA
                  sitekey="6LcreUskAAAAABVC02ZrdpVnOfFSwC7bxP-oN5cp"
                  onChange={recaptchaHandler}
                />
              )}
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
                disabled={!captchaKey && !isLogin}
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  borderRadius: "1.5rem",
                  fontWeight: "bold",
                  fontSize: "0.8rem",

                  // "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: "#2e4cf1",
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
