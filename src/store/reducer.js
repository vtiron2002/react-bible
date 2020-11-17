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
        loading: false,
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
      return set({ ...action.payload, loading: false });
    case "OPEN_SIDEBAR":
      return set({ sidebar: true });
    case "CLOSE_SIDEBAR":
      return set({ sidebar: false });
    case "START_LOADING":
      return set({ loading: true });
    case "SET_DARKMODE":
      return set({ ...action.payload });
    case "HANDLE_CHANGE":
      return set({ searchQuery: action.payload.value });
    case "FINISH_SEARCH":
      return set({ searchResults: action.payload.data });
    default:
      return state;
  }
};
