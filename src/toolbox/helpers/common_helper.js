export function getParams(word) {
  let search = window.location.search;
  let url = new URLSearchParams(search);
  return word !== undefined ? url.get(word) : false;
}

export function setParams({ query = "" }) {
  const searchParam = new URLSearchParams();
  searchParam.set("word", query);
  return searchParam.toString();
}
