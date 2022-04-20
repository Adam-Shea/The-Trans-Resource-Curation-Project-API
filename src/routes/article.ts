import { Router } from 'express'
import controller from '../controllers/article'

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

export default router