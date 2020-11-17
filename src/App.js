import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useBibleContext } from "./store/Context";

import Versions from "./pages/Versions";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Chapter from "./pages/Chapter";
import Loading from "./pages/Loading";
import Search from "./pages/Search";

import Header from "./components/Header";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { getBooks, getChapters, getVersions } from "./API";
import { getParams } from "./utils";
import { light, dark } from "./themes";

const GlobalStyles = createGlobalStyle`
  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    body {
      background: ${(p) => p.theme.background}
    }

    select {
      appearance: none;
      font-size: .7rem;
      padding: .3rem;
      border: none;
      cursor: pointer;
      transition: .2s ease;
      outline: none;
      border-bottom: 2px solid ${(p) => p.theme.accent};
      color: ${(p) => p.theme.text};
      background: ${(p) => p.theme.background};
      border-radius: none;

      &:hover {
        opacity: .7
      }
    }
    
`;

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  background: ${(p) => p.theme.background};
  color: ${(p) => p.theme.text};
  min-height: 95vh;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const App = () => {
  const [state, dispatch] = useBibleContext();
  const params = getParams(window.location.pathname);

  useEffect(() => {
    (async () => {
      if (localStorage.darkMode) {
        dispatch({
          type: "SET_DARKMODE",
          payload: { darkMode: JSON.parse(localStorage.darkMode) },
        });
      }
      const payload = {};
      const v = await getVersions();
      if (params.versionId) {
        const b = await getBooks(params.versionId);
        payload.books = b;
      }
      if (params.chapter) {
        const c = await getChapters(params.versionId, params.bookId);
        payload.chapters = c;
      }
      payload.versions = v;
      payload.selectedBook = params.bookId;
      payload.selectedVersion = params.versionId;
      if (params.where === "search") {
        delete payload.selectedBook;
      }
      dispatch({ type: "COMPONENT_MOUNTED", payload });
    })();
  }, []);

  if (state.loading) return <Loading />;

  return (
    <ThemeProvider theme={state.darkMode ? dark : light}>
      <GlobalStyles />
      <Header />

      <StyledContainer>
        <Switch>
          <Route exact path="/" component={Versions} />
          <Route path="/books/:versionId" component={Books} />
          <Route path="/book/:versionId/:bookId" component={Book} />
          <Route
            path="/chapter/:versionId/:bookId/:chapter"
            component={Chapter}
          />
          <Route path="/search/:versionId/:query/:page" component={Search} />
        </Switch>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default App;
