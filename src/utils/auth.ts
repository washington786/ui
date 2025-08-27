import { TOKEN } from "./AuthVals"

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN, token)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN)
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN)
}

export const isAuthenticated = () => {
    return !!getToken()
}