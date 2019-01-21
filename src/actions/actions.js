import { apiKeys, apiUri } from "../constants/constants";

export function getDefinitionByWord(word) {
    
  fetch(apiUri("collagiate", word, apiKeys.dictionaryKey))
    .then(function(response) {
      return response.json();
    })
    // return fetch(url, {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, cors, *same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //         "Content-Type": "application/json",
    //         // "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     redirect: "follow", // manual, *follow, error
    //     referrer: "no-referrer", // no-referrer, *client
    //     body: JSON.stringify(data), // body data type must match "Content-Type" header
    // })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
}
