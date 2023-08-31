import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularPeople } from '../../api/movie-api';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PopularPeopleList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopularPeople()
      .then((data) => {
        console.log(data);
        setPeople(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);  
        setError(error.message);
        setLoading(false);
      });
  }, []);
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ margin: '0 auto', maxWidth: '80%' }}>
      {people.map((person) => (
        <Accordion key={person.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${person.id}-content`}
            id={`panel${person.id}-header`}
          >
              <Typography>{person.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
            <p><strong>Known For:</strong> {person.known_for_department}</p>
            <ul>
                {person.known_for.map((movie, index) => (
                  <li key={index}>
                    <strong>{movie.title}</strong> ({movie.release_date})
                    <br />
                    {movie.overview}
                  </li>
                ))}
              </ul>
              <ul>
                {person.known_for.map((movie, index) => (
                  <li key={index}>
                    <Link to={`/movies/${movie.id}`}>
                      <strong>{movie.title}</strong> ({movie.release_date})
                    </Link>
                    <br />
                    {movie.overview}
                  </li>
                ))}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default PopularPeopleList;
