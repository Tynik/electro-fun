import { DatasheetIdT } from '../types';

export const matchDatasheetIdWithSearchKeyword = (datasheetId: DatasheetIdT, searchKeyword: string): boolean => {
  if (datasheetId.length < searchKeyword.length) {
    return false;
  }
  let keywordCharIndexOffset = -1;
  let keywordFrameLen = searchKeyword.length;

  while (keywordFrameLen && keywordCharIndexOffset === -1) {
    keywordCharIndexOffset = datasheetId.toLowerCase().indexOf(
      searchKeyword.substring(0, keywordFrameLen)
    );
    keywordFrameLen--;
  }
  keywordCharIndexOffset = keywordCharIndexOffset === -1
    ? 0
    : keywordCharIndexOffset;

  return searchKeyword.split('').every((keywordChar, keywordCharIndex) => {
    const datasheetIdChar = datasheetId[keywordCharIndexOffset + keywordCharIndex];
    return datasheetIdChar && (
      datasheetIdChar === 'x' || keywordChar === datasheetIdChar.toLowerCase()
    );
  });
};

export const matchDatasheetWithSearchKeywords = (datasheetId: DatasheetIdT, searchKeywords: string[]): boolean =>
  searchKeywords.every(searchKeyword =>
    matchDatasheetIdWithSearchKeyword(datasheetId, searchKeyword)
  );
