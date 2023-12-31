import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { PublicPage, Movies, Profile, HomePage } from "./pages";
import SignUpPage from "./signUpPage";
import LoginPage from "./loginPage";
import MovieProvider from "./moviesContext";
import PopularPeoplePage from "./popularPeople";
import AuthProvider from "./authContext";
import AuthHeader from "./authHeader";
import ProtectedRoutes from "./protectedRoutes";
import MovieDetailPage from "./movieDetailPage";
import SiteHeader from "./components/siteHeader";
import ReviewForm from "./components/reviewForm";


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <SiteHeader />
        <AuthHeader />
{/*         <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/public">Public</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
          <Link to="/movies/tmdb/popular">Popular People</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul> */}
        <MovieProvider>
        <Routes>
          <Route path="/public" element={ <PublicPage /> } />
          <Route path="/" element={ <HomePage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/movies/:id" element={ <MovieDetailPage /> } />
          <Route path="/movies/:id/review" element={ <ReviewForm/> } />
          
          <Route path="/signup" element={ <SignUpPage /> } />
          <Route path="/movies/tmdb/popular" element={<PopularPeoplePage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/movies" element={<Movies />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));