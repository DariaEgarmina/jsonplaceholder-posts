// Простая пагинация для 10 страниц. Для большего количества страниц нужна логика с "..."
 export const generatePageNumbers = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};
