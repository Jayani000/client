import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Notifications,
  Menu,
  Close,
} from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, useNavigate } from "react-router-dom";
import FlexBox from "components/FlexBox";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "state/auth-hook";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const neutralDark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <>
      <FlexBox padding="1rem 6%" backgroundColor="#E0F7FA">
        <FlexBox gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="#000000"
            onClick={() => navigate("/feed")}
            sx={{
              "&:hover": {
                color: primary,
                cursor: "pointer",
              },
            }}
          >
            Mansa Fitness
          </Typography>
          {isNonMobileScreens && (
            <FlexBox
              backgroundColor={alt}
              borderRadius="9px"
              gap="1rem"
              padding="0.1rem 1rem"
              alignItems="center"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBox>
          )}
        </FlexBox>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBox gap="2rem" alignItems="center">
            <HomeIcon
              sx={{
                fontSize: "28px",
                color: neutralDark,
                "&:hover": {
                  color: primary,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/feed")}
            />
            <Notifications
              sx={{
                fontSize: "25px",
                color: neutralDark,
                "&:hover": {
                  color: primary,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/notifications")}
            />
            {isAuth && (
              <FormControl variant="standard" value={user.username}>
                <Select
                  value={user.username}
                  sx={{
                    backgroundColor: alt,
                    color: neutralDark,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: alt,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={user.username}>
                    <Typography>{user.username}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Select>
              </FormControl>
            )}
          </FlexBox>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={theme.palette.background.default}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBox
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <HomeIcon
                sx={{
                  fontSize: "28px",
                  color: neutralDark,
                  "&:hover": {
                    color: primary,
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate("/feed")}
              />
              <Notifications
                sx={{
                  fontSize: "25px",
                  color: neutralDark,
                  "&:hover": {
                    color: primary,
                    cursor: "pointer",
                  },
                }}
              />
              {isAuth && (
                <FormControl variant="standard" value={user.username}>
                  <Select
                    value={user.username}
                    sx={{
                      backgroundColor: alt,
                      color: neutralDark,
                      width: "150px",
                      borderRadius: "0.25rem",
                      p: "0.25rem 1rem",
                      "& .MuiSvgIcon-root": {
                        pr: "0.25rem",
                        width: "3rem",
                      },
                      "& .MuiSelect-select:focus": {
                        backgroundColor: alt,
                      },
                    }}
                    input={<InputBase />}
                  >
                    <MenuItem value={user.username}>
                      <Typography>{user.username}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Select>
                </FormControl>
              )}
            </FlexBox>
          </Box>
        )}
      </FlexBox>
      <Outlet />
    </>
  );
};

export default Navbar;
