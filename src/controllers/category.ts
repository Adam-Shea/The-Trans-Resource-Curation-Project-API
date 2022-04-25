import { Sequelize } from 'sequelize';
import { Article, Category, Articles_Category } from '../models'

/* GET /students
 *   > Returns a list of all students */

interface categoryRequest {
    title: string,
};

async function updateCategory(id: number, data: categoryRequest): Promise<any | null> {
    try {
        await Category.update({ title: data.title, }, { where: { id: id } }
        )
    } catch {
        return 500
    }
    return 200
}

async function deleteCategory(id: number): Promise<any | null> {
    await Articles_Category.sequelize?.query(`DELETE FROM Articles_Category WHERE ArticleId=${id}`)

    try {
        await Category.destroy({ where: { id: id } })
    } catch {
        return 500
    }
    return 200
}

async function createCategory(data: categoryRequest): Promise<any | null> {
    try {
        await Category.create({ title: data.title })
    } catch {
        return 500
    }
    return 200
}

async function getCategories(): Promise<any | null> {
    try {
        return await Category.findAll()
    } catch {
        return 500
    }
}

export default {
    createCategory: createCategory,
    deleteCategory: deleteCategory,
    updateCategory: updateCategory,
    getCategories: getCategories
}