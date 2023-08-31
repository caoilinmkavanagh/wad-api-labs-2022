export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getMovies = () => {
    return fetch(
       '/api/movies', {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => {
        return res.json();
    }).catch((error) => {
        console.log(error);
    });
  };

  export const getMovieID = (id) => {
    return fetch(`http://localhost:8080/api/movies/tmdb/${id}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
  };
  
  export const getPopularPeople = () => {
    return fetch(
       '/api/movies/tmdb/popular', { 
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
};


