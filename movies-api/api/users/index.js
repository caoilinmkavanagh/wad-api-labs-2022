import express from 'express';
import User from './userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel.js';

const router = express.Router(); 

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Register OR authenticate a user
router.post('/',asyncHandler( async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
      return next();
    }
    if (req.query.action === 'register') {
      await User.create(req.body);
      res.status(201).json({code: 201, msg: 'Successful created new user.'});
    } else {
      const user = await User.findByUserName(req.body.username);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password matches, create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({success: true, token: 'BEARER ' + token});
          } else {
            res.status(401).json({code: 401,msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  }));
  


// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);
    
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ code: 404, msg: 'User not found.' });
    }
    
    // Check if the movie is already in the favourites array
    if(user.favourites.includes(movie._id)) {
      return res.status(409).json({ code: 409, msg: 'Movie is already in favourites.' });
    }
  
    user.favourites.push(movie._id);
    await user.save();
      
    res.status(201).json(user);
  }));
  

/* router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);
    
    // Check if the movie is already in the favourites array
    if(user.favourites.includes(movie._id)) {
      return res.status(409).json({ code: 409, msg: 'Movie is already in favourites.' });
    }
  
    user.favourites.push(movie._id);
    await user.save();
    
    res.status(201).json(user);
  })); */
  

/* //Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);
    await user.favourites.push(movie._id);
    await user.save(); 
    res.status(201).json(user); 
  })); */

  router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favourites');
    res.status(200).json(user.favourites);
  }));


export default router;


/* router.post('/:id/favourites', async (req, res) => {
    const newFavourite = req.body;
    if (newFavourite && newFavourite.id) {
        const user = await User.findById(req.params.id);
        if (user) {
            user.favourites.push(newFavourite);
            user.save();
            res.status(201).json({ code: 201, msg: "Added Favourite" });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to add favourites' });
        }
    }
}); */

/* router.get('/:id/favourites', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user.favourites);
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find favourites' });
    }
}); */

/* // register(Create)/Authenticate User
router.post('/', async (req, res) => {
    await User(req.body).save();
    res.status(201).json({
        code: 201,
        msg: 'Successful created new user.',
    });
}); */


/* 
// register
router.post('/', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {  //if action is 'register' then save to DB
        await User(req.body).save();
        res.status(201).json({
            code: 201,
            msg: 'Successful created new user.',
        });
    }
    else {  //NEW CODE!!!
        const user = await User.findByUserName(req.body.username);
        if (user.comparePassword(req.body.password)) {
            req.session.user = req.body.username;
            req.session.authenticated = true;
            res.status(200).json({
                success: true,
                token: "temporary-token"
              });
        } else {
            res.status(401).json('authentication failed');
        }
    }
}));
 */
/* // register
router.post('/', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {  //if action is 'register' then save to DB
        await User(req.body).save();
        res.status(201).json({
            code: 201,
            msg: 'Successful created new user.',
        });
    }
    else {  //Must be authenticating then! Query the DB and check if there's a match
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' })
        } else {
            return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' })
        }
    }
})); */

/* // register(Create)/Authenticate User
router.post('/', async (req, res) => {
    if (req.query.action === 'register') {  //if action is 'register' then save to DB
        await User(req.body).save();
        res.status(201).json({
            code: 201,
            msg: 'Successful created new user.',
        });
    }
    else {  //Must be an authenticate then!!! Query the DB and check if there's a match
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' });
        }else{
            return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' });
        }
    }
}); */