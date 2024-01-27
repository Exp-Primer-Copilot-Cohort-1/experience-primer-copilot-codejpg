// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');

// GET /comments
router.get('/', function (req, res, next) {
    Comment.find(function (err, comments) {
        if (err) {
            return next(err);
        }
        res.json(comments);
    });
});

// POST /comments
router.post('/', function (req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function (err, comment) {
        if (err) {
            return next(err);
        }
        res.status(201).json(comment);
    });
});

// GET /comments/:id
router.get('/:id', function (req, res, next) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            return next(err);
        }
        if (comment === null) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    });
});

// PUT /comments/:id
router.put('/:id', function (req, res, next) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            return next(err);
        }
        if (comment === null) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        comment.content = req.body.content;
        comment.save(function (err, comment) {
            if (err) {
                return next(err);
            }
            res.json(comment);
        });
    });
});

// DELETE /comments/:id
router.delete('/:id', function (req, res, next) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            return next(err);
        }
        if (comment === null) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        comment.remove(function (err, comment) {
            if (err) {
                return next(err);
            }
            res.json(comment);
        });
    });
});

// GET /comments/:id/post
router.get('/:id/post', function (req, res, next) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            return next(err);
        }
        if (comment === null) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        Post.findById(comment.post, function (err, post) {
            if (err) {
                return next(err);
            }
            if (post === null) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        });
    });
}   );