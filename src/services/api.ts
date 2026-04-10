import axios from "axios";
import type { Post } from "../types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = {
  getPosts: async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await axios.get<Post>(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  },
};
