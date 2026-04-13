import axios from "axios";
import type { Post } from "../types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

type PaginatedResponse = { posts: Post[]; totalCount: number };
type CacheEntry = { data: PaginatedResponse; timestamp: number };

const paginationCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000;

// Вспомогательная функция для получения постов для конкретной страницы.
// Сначала проверяет кэш, потом идёт в API.
const fetchPostsForPage = async (
  page: number,
  limit: number,
): Promise<PaginatedResponse> => {
  const cacheKey = `page-${page}-limit-${limit}`;
  const cachedEntry = paginationCache.get(cacheKey);

  // Если в кэше есть свежие данные для этой страницы, возвращает их
  if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL) {
    return cachedEntry.data;
  }

  // Запрашивает только нужные посты
  try {
    const response = await axios.get<Post[]>(
      `${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`,
    );

    const totalCount = Number(response.headers["x-total-count"] ?? 0);
    const result: PaginatedResponse = { posts: response.data, totalCount };

    paginationCache.set(cacheKey, { data: result, timestamp: Date.now() });

    return result;
  } catch (error) {
    // Логирует техническую ошибку в консоль для разработчика
    console.error(`[API Error] Failed to fetch page ${page}:`, error);

    // Пробрасывает понятное пользовательское сообщение дальше, в компонент
    // Сохраняет оригинальную ошибку, чтобы не потерять стек
    throw new Error(
      `Unable to load posts for page ${page}. Please try again later.`,
      { cause: error },
    );
  }
};

export const api = {
  getPostsPage: async (
    page: number,
    limit: number,
  ): Promise<PaginatedResponse> => {
    return fetchPostsForPage(page, limit);
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await axios.get<Post>(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  },
};
