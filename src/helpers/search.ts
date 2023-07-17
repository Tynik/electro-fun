export const checkSearchKeyword = (content: string, searchKeyword: string) => {
  const loweredContentWords = content
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .split(/\s+|\n/)
    .filter(word => word && !/^\W$/.test(word));

  return loweredContentWords.some(
    word => word.startsWith(searchKeyword) || word.replace(/-|'|"/g, '').startsWith(searchKeyword)
  );
};
