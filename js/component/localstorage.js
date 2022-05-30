export function getItemLocal(key) {
    return JSON.parse(localStorage.getItem(key)) || []
}

export function setItemLocal(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
}
