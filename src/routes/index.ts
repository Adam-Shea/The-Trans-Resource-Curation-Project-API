import { Router } from 'express'
import dotenv from "dotenv"
const cors = require('cors');
import articleRoutes from './article'
import adminRoutes from './admin'

dotenv.config()


const router = Router()
router.use(cors())
router.use('/article', articleRoutes)
router.use('/' + process.env.ADMIN_URL!, adminRoutes)


export default router