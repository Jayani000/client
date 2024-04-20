import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import Navbar from "components/Navbar";
import HomeFeed from "pages/homeFeed";
// import Recipes from "pages/recipes";
// import Friends from "pages/friends";
import Notifications from "pages/notifications";
import Login from "pages/authenticate";
// import Profile from "pages/userProfile";
// import ViewRecipe from "pages/recipes/ViewRecipe";
// import Followers from "pages/friends/followers";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Navbar />}>
              <Route path="/feed" element={isAuth ? <HomeFeed /> : <Login />} />
              {/* <Route
                path="/friends"
                element={isAuth ? <Friends /> : <Login />}
              /> */}
              <Route
                path="/notifications"
                element={isAuth ? <Notifications /> : <Login />}
              />
              {/* <Route
                path="/recipes"
                element={isAuth ? <Recipes /> : <Login />}
              /> */}
              {/* <Route
                path="/recipes/:recipeId"
                element={isAuth ? <ViewRecipe /> : <Login />}
              /> */}
              {/* <Route
                path="/profile/:id"
                element={isAuth ? <Profile /> : <Login />}
              /> */}
              {/* <Route
                path="/friends/:userId"
                element={isAuth ? <Followers /> : <Login />}
              /> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
