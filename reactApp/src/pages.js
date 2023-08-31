import React, { useContext } from 'react';
import { MoviesContext } from './moviesContext';
import { Link } from 'react-router-dom';
import Chip from "@mui/material/Chip";
import { Card,CardContent,CardHeader,CircularProgress,Container, Grid,Typography,CardMedia} from '@mui/material';
import Button from '@mui/material/Button';

const chip = { margin: 0.5 };

export const PublicPage = () => {
  return <h2>Public page</h2>;
};

export const Movies = () => {
  const context = useContext(MoviesContext);
  let movies = '';

  if (context.movies) {
    movies = (
      <Container>
        <Grid container spacing={3}>
          {context.movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card elevation={3}>
              <Link to={`/movies/${movie.id}`}>
                <CardHeader title={movie.title} />
                </Link>
                <CardContent>
                <CardMedia
                    sx={{ 
                        height: 500, 
                        objectFit: 'contain'  
                    }}
                    component="img"
                    image={
                        movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img }
                    />
                    <br></br>
                    <Chip
                      label={`Release Date (${movie.release_date})`} 
                      color="primary" 
                      sx={{ marginRight: 1, marginBottom: 1 }}
                    />
                     <Button 
                      variant="contained" 
                      color="primary" 
                      component={Link} 
                      to={`/movies/${movie.id}/review`} 
                    >
                      Review
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    movies = (
      <Container style={{ textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Movies are loading</Typography>
      </Container>
    );
  }

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: '16px' }}>
        Movies Data
      </Typography>
      {movies}
    </>
  );
};

export const Profile = () => {
  return <h2>My Profile</h2>;
};

export const HomePage = () => {
  return <h2>Home page</h2>;
};
