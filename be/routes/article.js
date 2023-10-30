const express = require('express')
const Articles = express.Router()
const ArticleModel = require('../models/articleModel')

Articles.post('/article/create', async (req, res) => {
    const NewArticle = new ArticleModel({
        Img: req.body.Img,
        Title: req.body.Title,
        Price: req.body.Price,
        Brand: req.body.Brand,
        Description: req.body.Description,
        Author: req.body.Author
    })
    try {
        const Article = await NewArticle.save()

        res.status(201).send({
            statuscode: 201,
            message: 'Article created successfully',
            payload: Article
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Articles.get('/article', async (req, res) => {
    try {
        const article = await ArticleModel.find()
            .populate('Author');

        res.status(200).send({
            statuscode: 200,
            article
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Articles.delete('/article/delete/:articleId', async (req, res) => {
    const { articleId } = req.params;

    try {
        const articleToDelete = await ArticleModel.findByIdAndDelete(articleId)

        if (!articleToDelete) {
            return res.status(404).send({
                statuscode: 404,
                message: 'article not found'
            })
        }

        res.status(200).send({
            statuscode: 200,
            message: 'Article deleted succesfully'
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Articles.patch('/article/edit/:articleId', async (req, res) => {
    const { articleId } = req.params;
    try {
        const articleExists = await ArticleModel.findById(articleId)

        if (!articleExists) {
            return res.status(404).send({
                statuscode: 404,
                message: 'Article not found'
            })
        }
        const articleToEdit = req.body
        const options = { new: true }
        const result = await ArticleModel.findByIdAndUpdate(articleId, articleToEdit, options)
        res.status(200).send({
            statuscode: 200,
            message: 'Article updated successfully',
            result
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Articles.get('/article/byId/:articleId', async (req, res) => {
    const { articleId } = req.params

    try {
        const articleExists = await ArticleModel.findById(articleId)
        if (!articleExists) {
            return res.status(404).send({
                statuscode: 404,
                message: 'Article not found'
            })
        }

        res.status(200).send({
            statuscode: 200,
            article: [articleExists]
        })
    } catch (error) {
        res.status(500).send({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message
        })
    }
})

Articles.get('/articles/byTitle/:Title', async (req, res) => {
    const { Title } = req.params;

    try {
        const articles = await ArticleModel.find({
            Title: {
                $regex: Title,
                $options: 'i'
            }
        });

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                statuscode: 404,
                message: 'No articles found for the search term',
            });
        }

        res.status(200).json({
            statuscode: 200,
            message: 'Articles found',
            articles: articles,
        });
    } catch (error) {
        res.status(500).json({
            statuscode: 500,
            message: 'An error occurred',
            error: error.message,
        });
    }
});


module.exports = Articles