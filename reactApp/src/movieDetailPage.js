import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieID } from './api/movie-api';
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetailPage = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { id } = useParams();
    console.log("useParams ID:", id); 
    const [movie, setMovie] = useState(null);

    

    useEffect(() => {
        console.log("Inside useEffect, ID is:", id); 
        getMovieID(id)
            .then(data => {
                console.log("Fetched Data:", data); 
                setMovie(data);
            })
            .catch(error => {
                console.error("There was a problem fetching movie details:", error);
            });
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }
    console.log("Rendering movie:", movie);

     return (
    <>
    <h2>{movie.title} </h2>
<CardMedia
  sx={{ 
    height: 500, 
    objectFit: 'contain'  
  }}
  component="img"
  image={
    movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img }
/>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries " sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      </>
  );
};

export default MovieDetailPage;
