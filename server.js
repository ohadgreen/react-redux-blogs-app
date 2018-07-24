"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoUrl = "mongodb://ogreen:cY3jsjxy@ds249355.mlab.com:49355/comment-box-dev";
const PORT = 5000;
var Blog = require("./model/blog");

// create express app
var app = express();
var router = express.Router();

var blogsDb = mongoose.connect(mongoUrl);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    //and remove cacheing so we get the most recent comments
    res.setHeader("Cache-Control", "no-cache");
    next();
});

// define a simple route
app.get('/test', (req, res) => {
    res.json({ "message": "Blogs app server" });
});

//adding the /comments route to our /api router retrieve all comments from the database
router.route("/blogs")
    .get(function (req, res) {
        //looks at our BlogSchema 
        Blog.find(function (err, blogs) {
            if (err) {
                res.send(err);
            }
            else {
                //responds with a json object of our database blogs.
                Blog.count({}, function (err, c) {
                    console.log('found ' + c + ' blogs in database');
                });
                res.json(blogs);
            }
        });
    })
    //post new blog to the database
    .post(function (req, res) {
        var blog = new Blog();
        //body parser lets us use the req.body
        blog.title = req.body.title;
        // blog.category = req.body.category;
        blog.content = req.body.content;
        console.log("New blog: " + blog);
        blog.save(function (err) {
            if (err)
                res.send(err);
            else{               
                return res.json({ data: blog });
            }
        });
    });

router.route("/blogs/:blog_id")
    //The put method updates a blog based on id
    .put(function (req, res) {
        console.log("server update:" + req);
        Blog.findById(req.params.blog_id, function (err, blog) {
            if (err)
                res.send(err);
            //setting the new author and text to whatever was changed. If 
            //nothing was changed we will not alter the field.
            (req.body.title) ? blog.title = req.body.title : null;
            (req.body.category) ? blog.category = req.body.category : null;
            (req.body.content) ? blog.content = req.body.content : null;
            //save updated blog
            blog.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: "Blog has been updated" });
            });
        });
    })
    .get(function (req, res) {
        Blog.findById(req.params.blog_id, function (err, blog) {
            if (err) {
                console.log("couldnt find document with id " + req.params.blog_id);
                res.send(err);
            }
            else {
                //responds with a json object of our database blog
                Blog.count({ _id: req.params.blog_id }, function (err, c) {
                    var msg = (c === 1) ? "single document found" : "couldnt find document";
                    console.log(msg);
                });
                res.json(blog);
            }
        });
    })
    //delete method for removing a blog from the database
    .delete(function (req, res) {
        //selects the blog by its ID, then removes it.
        Blog.remove({ _id: req.params.blog_id }, function (err, blog) {
            if (err)
                res.send(err);
            res.json({ message: "Blog has been deleted", id: req.params.blog_id })
        })
    });

app.use("/api", router);
// listen for requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});