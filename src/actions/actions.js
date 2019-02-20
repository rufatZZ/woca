import { apiKeys, apiUri, apiTypes } from "../constants/";

export async function getDefinitionByWord(word) {
  const response = await fetch(
    apiUri(apiTypes.collegiate, word, apiKeys.dictionaryKey)
  );
  return await response.json();
}

export async function getAllSavedWords() {
  const response = await fetch("http://localhost:5000/api/words");
  return await response.json();
}

export async function saveWord(entry) {
  const response = await fetch("http://localhost:5000/api/word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ title: entry })
  });

  return await response.json();
}

export async function getSavedWord(entry) {
  const response = await fetch(`http://localhost:5000/api/word/${entry}`);
  return await response.json();
}

export async function deleteSavedWord(word_id){
  const response = await fetch(`http://localhost:5000/api/word/${word_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({id: word_id})
  });

  return await response.json();
}
