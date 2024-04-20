import React, { useState } from "react";
import { Box, Typography, useMediaQuery, Grid, Divider, useTheme } from "@mui/material";
import Form from "./Form";
import Wallpaper from "../../assets/authwallpaper.jpg";

const Login = () => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState();

  const isLoginHandle = (status) => {
    setIsLogin(status);
  };

  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Mansa Fitness
        </Typography>
      </Box>
      <Box
        width="100%"
        direction="column"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="2rem"
        mb="2rem"
      >
        <Box width={isNonMobileScreen ? "70%" : "90%"}>
          <Grid container>
            <Grid
              xs={5}
              sx={{
                backgroundImage: `url(${Wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "1.5rem 0 0 1.5rem",
              }}
            ></Grid>
            <Grid
              xs={7}
              backgroundColor="white"
              sx={{ borderRadius: "0 1.5rem 1.5rem 0" }}
            >
              <Box m="1.5rem">
                <Typography
                  fontWeight="bold"
                  variant="h3"
                  color="#375379"
                  sx={{ mb: "1.5rem" }}
                >
                  {!isLogin ? "Create Account" : "Login"}
                </Typography>
                <Box pr="3rem" pl="3rem">
                  <Divider color="#375379" />
                </Box>
                <Box m="3rem">
                  <Form isLoginHandle={isLoginHandle} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
