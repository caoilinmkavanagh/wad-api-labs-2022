import fetch from 'node-fetch';

export const getUpcomingMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getPopularPeople = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Something went wrong");
    }
    return await response.json();
  };
//get movei by id
export const getMovieById = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`);
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Something went wrong');
  }
  return await response.json();
};

