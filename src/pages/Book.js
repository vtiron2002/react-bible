import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getChapters } from "../API";
import { useBibleContext } from "../store/Context";
import styled from "styled-components";

const StyledChapters = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  gap: 1rem;

  a {
    padding: 1rem;
    text-decoration: none;
    color: black;
    border: 2px solid black;
    text-align: center;
    transition: 0.1s ease;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.9);
    }
  }
`;

const Book = ({ history }) => {
  const params = useParams();
  const { versionId, bookId } = params;
  const [state, dispatch] = useBibleContext();
  const { chapters } = state;

  useEffect(() => {
    (async () => {
      const data = await getChapters(versionId, bookId);
      dispatch({ type: "SET_CHAPTERS", payload: { data, book: bookId } });
    })();

    return () =>
      history.location.pathname.includes("/books") &&
      dispatch({
        type: "COMPONENT_UNMOUNTED",
        payload: { selectedBook: null },
      });
  }, [history.location.pathname]);

  return (
    <StyledChapters>
      {chapters.map((c, i) => (
        <Link key={i} to={`/chapter/${c.bibleId}/${c.bookId}/${c.number}`}>
          {c.number}
        </Link>
      ))}
    </StyledChapters>
  );
};

export default Book;
