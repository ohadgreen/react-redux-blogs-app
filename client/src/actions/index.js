import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_POST = 'CREATE_POST';

const apiUrl = 'http://localhost:5000/api';

// fetch all posts
export function fetchPosts() {
    const request = axios.get(`${apiUrl}/blogs`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

// create new blog
export function createPost(values) {
    const request = axios.post(`${apiUrl}/blogs`, values)
        .then((response) => {console.log("response:", response)});    
    return {
        type: CREATE_POST,
        payload: request
    };
}

export function deletePost(id) {
    let deleteUrl = `${apiUrl}/blogs/${id}`;
    console.log("deleteUrl: " + deleteUrl);
    const request = axios.delete(deleteUrl)
        .then((res) => {console.log("delete res msg: " + res.message)});

    return {
        type: DELETE_POST,
        payload: id
    }
}