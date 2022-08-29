import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const configureApi = (token) => {
  API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
}

export const login = (formData) => API.post("/login", formData);
export const register = (formData) => API.post("/users", formData);

export const deleteList = (list, id) => API.put(`/users/deleteList/${id}/${list}`)
export const changeList = (oldList, newList, id) => API.patch(`/users/${id}/${oldList}`, {list: newList})
export const createList = (newList, id) => API.put(`/users/createList/${id}`, {list: newList})
export const updateUserInfo = (updatedUserInfo, id) => API.patch(`/users/${id}`, updatedUserInfo)
export const changePassword = (userPassword, id) => API.put(`/users/${id}`, userPassword)
export const deleteUser = (id) => API.delete(`/users/${id}`)
export const getUser = (id) => API.get(`/users/${id}`)

export const getWord = (id) => API.get(`/words/${id}`)
export const createWord = (wordData, userId) => API.post(`/words/${userId}`, wordData)
export const updateWord = (updatedWordData, id) => API.patch(`/words/${id}`, updatedWordData)
export const deleteWord = (id) => API.delete(`/words/${id}`)
export const getWordsByList = (list) => API.get(`/words/list/${list}`)
export const getWords = (userId) => API.get(`/words/userWords/${userId}`)