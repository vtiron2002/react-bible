import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBooks } from "../API";
import { useBibleContext } from "../store/Context";

import styled from "styled-components";

const StyledBooks = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${(p) => p.theme.text};
    padding: 0.5rem;
    border: 1px solid ${(p) => p.theme.text};
    transition: 0.1s ease;

    &:hover {
      color: ${(p) => p.theme.accent};
      transform: scale(1.05);
      box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Books = ({ history }) => {
  const params = useParams();
  const { versionId } = params;
  const [state, dispatch] = useBibleContext();
  const { books, selectedVersion, versions } = state;

  useEffect(() => {
    (async () => {
      const data = await getBooks(versionId);
      dispatch({ type: "COMPONENT_MOUNTED", payload: { selectedBook: null } });
      dispatch({ type: "SET_BOOKS", payload: { data, version: versionId } });
      window.scrollTo(0, -9999);
    })();

    return () =>
      history.location.pathname === "/" &&
      dispatch({
        type: "COMPONENT_UNMOUNTED",
        payload: { selectedVersion: null },
      });
  }, [history.location.pathname]);

  return (
    <>
      <h1>
        Pick a Book from {versions.find((v) => v.id === selectedVersion)?.name}
      </h1>
      <StyledBooks>
        {books.map((b, i) => (
          <Link key={i} to={`/book/${b.bibleId}/${b.id}`}>
            {b.name}
          </Link>
        ))}
      </StyledBooks>
    </>
  );
};

export default Books;
