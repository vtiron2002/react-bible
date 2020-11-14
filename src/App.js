import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useBibleContext } from "./store/Context";

import Versions from "./pages/Versions";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Chapter from "./pages/Chapter";
import Header from "./components/Header";

import styled from "styled-components";
import { getBooks, getVersions } from "./API";
import { getParams } from "./utils";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const App = () => {
  const [state, dispatch] = useBibleContext();
  const params = getParams(window.location.pathname);

  useEffect(() => {
    console.log(params);
    getVersions().then((data) => {
      dispatch({ type: "SET_VERSIONS", payload: { data } });
    });

    getBooks(params.versionId).then((data) => {
      dispatch({ type: "SET_BOOKS", payload: { data } });
    });

    dispatch({
      type: "COMPONENT_MOUNTED",
      payload: {
        selectedVersion: params.versionId,
        selectedBook: params.bookId,
      },
    });
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      <Header />

      <Container>
        <Switch>
          <Route exact path="/" component={Versions} />
          <Route path="/books/:versionId" component={Books} />
          <Route path="/book/:versionId/:bookId" component={Book} />
          <Route
            path="/chapter/:versionId/:bookId/:chapter"
            component={Chapter}
          />
        </Switch>
      </Container>
    </>
  );
};

export default App;
