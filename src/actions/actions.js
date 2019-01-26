import { apiKeys, apiUri, apiTypes } from "../constants/";

export async function getDefinitionByWord(word) {
  const response = await fetch(
    apiUri(apiTypes.collegiate, word, apiKeys.dictionaryKey)
  );
  return await response.json();
}


