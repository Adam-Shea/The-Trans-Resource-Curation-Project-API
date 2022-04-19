import { Router } from 'express'

import articleRoutes from './article'

const router = Router()

router.use('/article', articleRoutes)

export default router