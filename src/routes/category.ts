import { Router } from 'express'

import category from '../controllers/category'

const router = Router()

router.route('/')
    .get((req, res, next) => {
        try {
            category.getCategories()
                .then(articles => res.status(200).send(articles))
                .finally(next)
        } catch {
            res.sendStatus(500)
        }
    })


export default router