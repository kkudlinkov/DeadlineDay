import {$authHost} from "./index";

export const createReminder = async (reminder) => {
    const {data} = await $authHost.post('api/reminder', reminder)
    return data
}

export const getReminders = async (id) => {
    const {data} = await $authHost.get('api/reminder', id)
    return data
}

export const getOneReminder = async (id) => {
    const {data} = await $authHost.get('api/reminder' + id)
    return data
}

export const changeReminders = async (reminder, id) => {
    const {data} = await $authHost.put('api/reminder/' + id, reminder)
    return data
}

export const deleteReminder = async (id) => {
    const {data} = await $authHost.delete('api/reminder/' + id)
    return data
}