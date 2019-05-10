import { apiKeys, apiUri, apiTypes } from "../constants/";

export async function getDefinitionByWord(word) {
  const response = await fetch(
    apiUri(apiTypes.learners, word, apiKeys.learnersKey)
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

export function addHistory(word) {
  let wordHistoryArray = JSON.parse(
    sessionStorage.getItem("wordHistory") || "[]"
  );
  let wordObj = {
    value: word,
    time: new Date().toLocaleString()
  };
  wordHistoryArray.push(wordObj);
  sessionStorage.setItem("wordHistory", JSON.stringify(wordHistoryArray));
}

export function getAllHistory(asc = false) {
  let historyList = JSON.parse(sessionStorage.getItem("wordHistory") || "[]");

  historyList.sort(function (a, b) {
    if (asc) {
      return Date.parse(a.time) - Date.parse(b.time);
    } else {
      return Date.parse(b.time) - Date.parse(a.time);
    }
  });

  return historyList;
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

// lists

export async function getAllLists() { }

export async function getList(list) { }

export async function saveList(list) {
  try {
    const response = await fetch("http://localhost:5000/api/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({ title: list })
    });
    return await response.json();
  } catch (e) {
    // console.log(e);
  }
}

export async function deleteList(list) { }
