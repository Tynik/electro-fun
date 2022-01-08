export const checkSearchKeyword = (content: string, searchKeyword: string) => {
  const loweredContent = content.toLowerCase();

  return loweredContent.includes(searchKeyword)
    || loweredContent.replace(/-|'|"/g, '').includes(searchKeyword);
};
