export function apiUri(_type, _word, _apiKey) {
  let type = encodeURI(_type);
  let word = encodeURI(_word);
  let apiKey = encodeURI(_apiKey);
  return `https://www.dictionaryapi.com/api/v3/references/${type}/json/${word}?key=${apiKey}`;
}
