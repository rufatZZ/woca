import { apiKeys, apiUri, apiTypes } from "../constants/";

export async function getDefinitionByWord(word) {
  const response = await fetch(
    apiUri(apiTypes.collegiate, word, apiKeys.dictionaryKey)
  );
  return await response.json();
}

export async function getAllSavedWords() {
  try {
    const response = await fetch("http://localhost:5000/api/words");
    return await response.json();
  } catch (e) {
    return {
      isExist: false,
      connectionError: true
    };
  }
}

export async function saveWord(entry) {
  try {
    const response = await fetch("http://localhost:5000/api/word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({ title: entry })
    });
    return await response.json();
  } catch (e) {
    // console.log(e);
  }
}

export async function getSavedWord(entry) {
  try {
    const response = await fetch(`http://localhost:5000/api/word/${entry}`);
    return await response.json();
  } catch (e) {
    if (String(e) === "TypeError: Failed to fetch") {
      return {
        isExist: false,
        connectionError: true
      };
    }
  }
}

export async function deleteSavedWord(word_id) {
  const response = await fetch(`http://localhost:5000/api/word/${word_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ id: word_id })
  });

  return await response.json();
}
