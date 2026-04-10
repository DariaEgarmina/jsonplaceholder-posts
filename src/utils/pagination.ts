export const calculateTotalPages = (
  totalPosts: number,
  postsPerPage: number,
): number => {
  return Math.ceil(totalPosts / postsPerPage);
};

export const getCurrentPosts = <T>(
  posts: T[],
  currentPage: number,
  postsPerPage: number,
): T[] => {
  const startIndex = (currentPage - 1) * postsPerPage;
  return posts.slice(startIndex, startIndex + postsPerPage);
};

export const generatePageNumbers = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};
