import { Router } from 'express'
import controller from '../controllers/article'
import category from '../controllers/category'

const router = Router()

router.route('/')
    .get((req, res, next) => {
        controller.getArticles()
            .then(articles => res.status(200).send(articles))
            .finally(next)
    })

router.route('/:id')
    .get((req, res, next) => {
        controller.getArticle(parseInt(req.params.id))
            .then(articles => res.status(200).send(articles))
            .finally(next)
    })

router.route('/cat/articles/:id')
    .get((req, res, next) => {
        controller.getArticleByCat(parseInt(req.params.id))
            .then(articles => res.status(200).send(articles))
            .finally(next)
    })

router.route('/categories')
    .get((req, res, next) => {
        category.getCategories()
            .then(response => res.status(200).send(response))
            .finally(next)
    })

export default router