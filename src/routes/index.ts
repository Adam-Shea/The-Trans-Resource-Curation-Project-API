import { Router } from 'express'
var cors = require('cors');

import articleRoutes from './article'

const router = Router()
router.use(cors())
router.use('/article', articleRoutes)


export default router