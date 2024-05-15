import {$authHost} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const getCategories = async (id) => {
    const {data} = await $authHost.get('api/category', id)
    return data
}

export const getOneCategory = async (id) => {
    const {data} = await $authHost.get('api/category' + id)
    return data
}

export const changeCategories = async (category, id) => {
    const {data} = await $authHost.put('api/category/' + id, category)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete('api/category/' + id)
    return data
}

