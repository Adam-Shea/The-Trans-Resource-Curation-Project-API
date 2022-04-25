import { Sequelize } from 'sequelize';
import { Article, Category, Articles_Category } from '../models'


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
        attributes: ["id", "title", "text", "image", "author", "createdAt"]
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
        attributes: ["id", "title", "text", "image", "author", "createdAt"]
    });
}


interface articleRequest {
    data: {
        title: string,
        text: string,
        image: string,
        author: string,
        categories: number[],
    }
};

async function updateArticle(id: number, data: articleRequest): Promise<any | null> {
    await Articles_Category.sequelize?.query(`DELETE FROM Articles_Category WHERE ArticleId=${id}`)
    for (const catId of data.data.categories) {
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
                title: data.data.title,
                text: data.data.text,
                image: data.data.image,
                author: data.data.author,
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
                title: data.data.title,
                text: data.data.text,
                image: data.data.image,
                author: data.data.author,
            }
        ).then(async function (article) {
            for (const catId of data.data.categories) {
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