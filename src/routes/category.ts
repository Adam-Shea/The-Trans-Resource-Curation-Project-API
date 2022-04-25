import { Router } from 'express'

import category from '../controllers/category'

const router = Router()

router.route('/')
    .get((req, res, next) => {
        try {
            category.getCategories()
                .then(response => res.status(200).send(response))
                .finally(next)
        } catch {
            res.sendStatus(500)
        }
    })
router.route('/:id')
    .get((req, res, next) => {
        try {
            category.getCategory(parseInt(req.params.id))
                .then(response => res.status(200).send(response))
                .finally(next)
        } catch {
            res.sendStatus(500)
        }
    })



export default router