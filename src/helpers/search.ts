export const checkSearchKeyword = (content: string, searchKeyword: string) =>
  content.toLowerCase().replace(/-|'|"/g, '').includes(searchKeyword);
