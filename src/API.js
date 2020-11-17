const urlPrefix = "https://api.scripture.api.bible/v1/bibles";
const MY_API_KEY = "c04aa8699c8c452196945e80495487d3";

const CustomFetch = (url) =>
  fetch(url, {
    headers: {
      "api-key": "81f316c5f31960d155555818b8d0a59c" || MY_API_KEY,
      // "api-key": MY_API_KEY,
    },
  });

export const getVersions = async () => {
  try {
    const res = await CustomFetch(urlPrefix);
    if (!res.ok) throw Error(res.statusText);
    const { data } = await res.json();
    return data.filter((v) => v.language.id === "eng");
  } catch (e) {
    console.log(e.message);
  }
};

export const getBooks = async (versionId) => {
  const urlSuffix = `/${versionId}/books`;
  try {
    const res = await CustomFetch(urlPrefix + urlSuffix);
    if (!res.ok) throw Error(res.statusText);
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getChapters = async (versionId, bookId) => {
  const urlSuffix = `/${versionId}/books/${bookId}/chapters`;
  try {
    const res = await CustomFetch(urlPrefix + urlSuffix);
    if (!res.ok) throw Error(res.statusText);
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getChapter = async (versionId, bookId, chapter) => {
  const urlSuffix = `/${versionId}/chapters/${bookId}.${chapter}`;
  try {
    const res = await CustomFetch(urlPrefix + urlSuffix);
    if (!res.ok) throw Error(res.statusText);
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const searchBible = async (versionId, searchTerm, page) => {
  // https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/search?query=john&offset=1
  const urlSuffix = `/${versionId}/search?query=${searchTerm}&offset=${page - 1}
  `;
  try {
    const res = await CustomFetch(urlPrefix + urlSuffix);
    if (!res.ok) throw Error(res.statusText);
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
