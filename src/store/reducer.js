export default (state, action) => {
  console.log(action.type);
  const set = (s) => ({ ...state, ...s });
  switch (action.type) {
    case "SET_VERSIONS":
      return set({ versions: action.payload.data });
    case "SET_BOOKS":
      return set({
        books: action.payload.data,
        selectedVersion: action.payload.version,
      });
    case "SET_CHAPTERS":
      return set({
        chapters: action.payload.data,
        selectedBook: action.payload.book,
      });
    case "SET_CHAPTER":
      return set({ chapter: action.payload.data });
    case "COMPONENT_UNMOUNTED":
      return set({ ...action.payload });
    case "COMPONENT_MOUNTED":
      return set({ ...action.payload });
    default:
      return state;
  }
};
