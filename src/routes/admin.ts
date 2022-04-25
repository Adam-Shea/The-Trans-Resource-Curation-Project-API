import { Router } from 'express'
import article from '../controllers/article'
import category from '../controllers/category'

const twofactor = require("node-2fa");
const router = Router()

router.route('/articles')
    .get((req, res, next) => {
        try {
            if (twofactor.verifyToken(process.env.ADMIN_TOKEN!, req.headers.token)) {
                article.getArticles()
                    .then(response => res.status(200).send(response))
                    .finally(next)
            } else {
                res.sendStatus(401)
            }
        } catch {
            res.sendStatus(500)
        }
    })

router.route('/articles/:id')
    .put((req, res, next) => {
        try {
            if (twofactor.verifyToken(process.env.ADMIN_TOKEN!, req.headers.token)) {
                article.updateArticle(parseInt(req.params.id), req.body)
                    .then(response => res.sendStatus(response))
                    .finally(next)
            } else {
                res.sendStatus(401)
            }
        } catch {
            res.sendStatus(500)
        }
    })

router.route('/articles/:id')
    .delete((req, res, next) => {
        try {
            if (twofactor.verifyToken(process.env.ADMIN_TOKEN!, req.headers.token)) {
                article.deleteArticle(parseInt(req.params.id),)
                    .then(response => res.sendStatus(response))
                    .finally(next)
            } else {
                res.sendStatus(401)
            }
        } catch {
            res.sendStatus(500)
        }
    })

router.route('/articles')
    .post((req, res, next) => {
        try {
            if (twofactor.verifyToken(process.env.ADMIN_TOKEN!, req.headers.token)) {
                article.createArticle(req.body)
                    .then(response => res.sendStatus(response))
                    .finally(next)
            } else {
                res.sendStatus(401)
            }
        } catch {
            res.sendStatus(500)
        }
    })

router.route('/categories/:id')
    .delete((req, res, next) => {
        try {
            if (twofactor.verifyToken(process.env.ADMIN_TOKEN!, req.headers.token)) {
                category.deleteCategory(parseInt(req.params.id))
                    .then(response => res.sendStatus(response))
                    .finally(next)
            } else {
                res.sendStatus(401)
            }
        } catch {
            res.sendStatus(500)
        }
    })

router.route('/categories/:id')
    .put((req, res, next) => {
        try {
            if (twofactor.verifyToken(process.env.ADMIN_TOKEN!, req.headers.token)) {
                category.updateCategory(parseInt(req.params.id), req.body)
                    .then(response => res.sendStatus(response))
                    .finally(next)
            } else {
                res.sendStatus(401)
            }
        } catch {
            res.sendStatus(500)
        }
    })

router.route('/categories')
    .post((req, res, next) => {
        try {
            if (twofactor.verifyToken(process.env.ADMIN_TOKEN!, req.headers.token)) {
                category.createCategory(req.body)
                    .then(response => res.sendStatus(response))
                    .finally(next)
            } else {
                res.sendStatus(401)
            }
        } catch {
            res.sendStatus(500)
        }
    })

export default router