import {$authHost} from "./index";

export const createTask = async (task) => {
    const {data} = await $authHost.post('api/task', task)
    return data
}

export const getTasks = async (id) => {
    const {data} = await $authHost.get('api/task', id)
    return data
}

export const getOneTask = async (id) => {
    const {data} = await $authHost.get('api/task' + id)
    return data
}

export const changeTask = async (task, id) => {
    const {data} = await $authHost.put('api/task/' + id, task)
    return data
}

export const deleteTask = async (id) => {
    const {data} = await $authHost.delete('api/task/' + id)
    return data
}

