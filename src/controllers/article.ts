import { article } from '../models'

/* GET /students
 *   > Returns a list of all students */
async function getArticles(): Promise<any[]> {
    return await article.findAll({
        attributes: ['id', 'title', 'text'],
        order: [['id', 'ASC']]
    })
}

export default {
    getArticles: getArticles,
}