import { Sequelize } from 'sequelize';
import { Article, Category, Articles_Category } from '../models'

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
        attributes: ["id", "title", "text", "image", "author", "createdAt"]
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


interface articleRequest {
    title: string,
    text: string,
    image: string,
    author: string,
    categories: number[],
};

async function updateArticle(id: number, data: articleRequest): Promise<any | null> {
    await Articles_Category.sequelize?.query(`DELETE FROM Articles_Category WHERE ArticleId=${id}`)

    for (const catId of data.categories) {
        const newDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try {
            await Articles_Category.sequelize?.query(`INSERT INTO Articles_Category VALUES ('${newDate}','${newDate}',${id},${catId});`)
        } catch (error) {
            return 400;
        }
    }

    try {
        await Article.update(
            {
                title: data.title,
                text: data.text,
                image: data.image,
                author: data.author,
            }, { where: { id: id } }
        )
    } catch {
        return 500
    }
    return 200
}

async function deleteArticle(id: number): Promise<any | null> {
    await Articles_Category.sequelize?.query(`DELETE FROM Articles_Category WHERE ArticleId=${id}`)

    try {
        await Article.destroy(
            { where: { id: id } }
        )
    } catch {
        return 500
    }
    return 200
}

async function createArticle(data: articleRequest): Promise<any | null> {

    try {
        await Article.create(
            {
                title: data.title,
                text: data.text,
                image: data.image,
                author: data.author,
            }
        ).then(async function (article) {
            for (const catId of data.categories) {
                const newDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
                try {
                    await Articles_Category.sequelize?.query(`INSERT INTO Articles_Category VALUES ('${newDate}','${newDate}',${article.id},${catId});`)
                } catch (error) {
                    return 400;
                }
            }
        })
    } catch {
        return 500
    }

    return 200


}

export default {
    getArticles: getArticles,
    getArticle: getArticle,
    getArticleByCat: getArticleByCat,
    updateArticle: updateArticle,
    createArticle: createArticle,
    deleteArticle: deleteArticle
}