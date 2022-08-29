import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddEditWord from "./Pages/AddEditWord/AddEditWord";
import Profile from "./Pages/Profile/Profile";
import List from "./Pages/Lists/List";
import { Lists } from "./Pages/Table/Lists";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setLogout } from "./redux/features/userSlice";
import { setEmpty } from "./redux/features/dictionaryWordSlice";
import { getWords, setInitial } from "./redux/features/wordSlice";
import { clearToken } from "./redux/features/authSlice";
import { setLoginTheme } from "./redux/features/themeSlice";
import Progress from "./Pages/Porgress/Progress";
import { configureApi } from "./redux/api";
import Word from "./Pages/SingleWord/Word";

const App = () => {
  const token = localStorage.getItem("_accessToken");
  const { user, error } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(setLogout());
        dispatch(setEmpty());
        dispatch(setInitial());
        dispatch(clearToken());
        return;
      }
      configureApi(token);
      dispatch(getUser({ id: decodedToken.id }));
      dispatch(getWords({ userId: decodedToken.id }));
      dispatch(setLoginTheme());
    }
  }, [token, dispatch, error]);

  return (
    <>
      <ToastContainer autoClose={1500} hideProgressBar={true} limit={1} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/register" exact element={<SignUp />} />
            <Route path="/login" exact element={<SignIn />} />
            <Route
              path="/users/:id/verify/:token"
              exact
              element={<VerifyEmail />}
            />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route
              path="/reset-password/:id/:token"
              exact
              element={<ResetPassword />}
            />
          </>
        )}

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/lists"
          element={
            <PrivateRoute>
              <Lists />
            </PrivateRoute>
          }
        />
        <Route
          path="/words/list/:list"
          element={
            <PrivateRoute>
              <List />
            </PrivateRoute>
          }
        />
        <Route
          path="/addWord"
          element={
            <PrivateRoute>
              <AddEditWord />
            </PrivateRoute>
          }
        />
        <Route
          path="/editWord/:id"
          element={
            <PrivateRoute>
              <AddEditWord />
            </PrivateRoute>
          }
        />
        <Route
          path="/editWord/:id/progress"
          element={
            <PrivateRoute>
              <AddEditWord />
            </PrivateRoute>
          }
        />
        <Route
          path="/word/:id"
          element={
            <PrivateRoute>
              <Word />
            </PrivateRoute>
          }
        />
        <Route
          path="/wordProgress"
          element={
            <PrivateRoute>
              <Progress />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
