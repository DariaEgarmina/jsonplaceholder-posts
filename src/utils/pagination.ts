export const generatePageNumbers = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};
