import { DatasheetIdT } from '../types';

export const matchDatasheetIdKeyword = (datasheetId: DatasheetIdT, keyword: string): boolean => {
  if (datasheetId.length < keyword.length) {
    return false;
  }
  let keywordCharIndexOffset = -1;
  let keywordFrameLen = keyword.length;

  while (keywordFrameLen && keywordCharIndexOffset === -1) {
    keywordCharIndexOffset = datasheetId.toLowerCase().indexOf(
      keyword.substring(0, keywordFrameLen)
    );
    keywordFrameLen--;
  }
  keywordCharIndexOffset = keywordCharIndexOffset === -1
    ? 0
    : keywordCharIndexOffset;

  return keyword.split('').every((keywordChar, keywordCharIndex) => {
    const datasheetIdChar = datasheetId[keywordCharIndexOffset + keywordCharIndex];
    return datasheetIdChar && (
      datasheetIdChar === 'x' || keywordChar === datasheetIdChar.toLowerCase()
    );
  });
};

export const matchDatasheetKeywords = (datasheetId: DatasheetIdT, keywords: string[]): boolean =>
  keywords.every(keyword => matchDatasheetIdKeyword(datasheetId, keyword));
