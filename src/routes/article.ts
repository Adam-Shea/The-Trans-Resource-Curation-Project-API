import { Router } from 'express'
import controller from '../controllers/article'
import category from '../controllers/category'

const router = Router()

router.route('/')
    .get((req, res, next) => {
        try {
            controller.getArticles()
                .then(articles => res.status(200).send(articles))
                .finally(next)
        } catch {
            res.sendStatus(500)
        }
    })

router.route('/:id')
    .get((req, res, next) => {
        try {
            controller.getArticle(parseInt(req.params.id))
                .then(articles => res.status(200).send(articles))
                .finally(next)
        } catch {
            res.sendStatus(500)
        }
    })

router.route('/cat/articles/:id')
    .get((req, res, next) => {
        try {
            controller.getArticleByCat(parseInt(req.params.id))
                .then(articles => res.status(200).send(articles))
                .finally(next)
        } catch {
            res.sendStatus(500)
        }
    })

export default router