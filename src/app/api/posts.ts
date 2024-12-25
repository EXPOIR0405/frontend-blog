import api from './axios';

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: {
    id: number;
    username: string;
  };
  tag: string;
  thumbnail?: string;
}

export const getPosts = () => api.get<Post[]>('/posts/');
export const getPost = (id: number) => api.get<Post>(`/posts/${id}/`);
export const createPost = (data: FormData) => api.post('/posts/', data);
export const updatePost = (id: number, data: FormData) => api.put(`/posts/${id}/`, data);
export const deletePost = (id: number) => api.delete(`/posts/${id}/`); 