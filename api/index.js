const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'qwertyuiopasdfghjklzxcvbnm1234567890';

// Middleware setup
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Connect to the database
mongoose.connect('mongodb+srv://altordilla:akosithordz@blog-final.fb0xtzc.mongodb.net/?retryWrites=true&w=majority&appName=blog-final');

// Register (creates a new user)
app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

// Login (verify user and return a token)
app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials'); //if wrong pass
  }
});

// Profile (it gets info from the requested token)
app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

// Logout (clear cookie token)
app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok'); //delete the cookie
});

// Create a new post
app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  try {
    let newPath = null;

    // this is added to avoid error when posting without image by only processing the file if it's actually uploaded
    if (req.file) {
      const { originalname, path } = req.file;
      const ext = originalname.split('.').pop();
      newPath = path + '.' + ext;
      await fs.promises.rename(path, newPath);
    }

    const { token } = req.cookies;
    const info = jwt.verify(token, secret);
    const { title, summary, content } = req.body;

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath, // this can be null if no file was uploaded
      author: info.id,
    });

    res.json(postDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong while creating the post' });
  }
});

// update exisiting post
app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    postDoc.set({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    await postDoc.save();

    res.json(postDoc);
  });

});

//get all post from the most recent order
app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

//get a single post by id
app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

//[new page] get all post of the logged-in user
app.get('/my-posts', async (req, res) => {
  try {
    const { token } = req.cookies;
    const info = jwt.verify(token, secret); // Decode the user's ID from the token

    const userPosts = await Post.find({ author: info.id })
      .populate('author', ['username'])
      .sort({ createdAt: -1 });

    res.json(userPosts);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized or invalid token' });
  }
});

//start the server 'localhost:4000'
app.listen(4000);
