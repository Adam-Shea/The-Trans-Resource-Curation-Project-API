import { Article, Category } from '../models'

/* GET /students
 *   > Returns a list of all students */
async function getArticles(): Promise<any[]> {
    return await Article.findAll({
        order: [['id', 'ASC']],
        include: [{
            model: Category,
            required: false,
            attributes: ["title"],
            through: { attributes: [] }
        }],
        attributes: ["title", "text", "image", "author", "createdAt"]
    });
}

async function getArticle(id: number): Promise<any | null> {
    return await Article.findOne({
        where: { id: id },
        include: [{
            model: Category,
            required: false,
            attributes: ["title"],
            through: { attributes: [] }
        }],
        attributes: ["title", "text", "image", "author", "createdAt"]
    });
}

async function getArticleByCat(id: number): Promise<any | null> {
    return await Article.findAll({
        include: [{
            model: Category,
            where: { id: id },
            required: false,
            attributes: ["title"],
            through: { attributes: [] }
        }],
        order: [['id', 'ASC']],
        attributes: ["title", "text", "image", "author", "createdAt"]
    });
}

export default {
    getArticles: getArticles,
    getArticle: getArticle,
    getArticleByCat: getArticleByCat
}