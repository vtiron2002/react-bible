import React, { useEffect } from "react";
import styled from "styled-components";
import { getBooks, getChapters, getVersions } from "../API";
import { useBibleContext } from "../store/Context";
import { truncateString } from "../utils";
import { useHistory, useParams } from "react-router-dom";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;

const Header = () => {
  const [state, dispatch] = useBibleContext();
  const {
    versions,
    selectedVersion,
    books,
    selectedBook,
    chapters,
    chapter,
  } = state;
  const history = useHistory();
  const pathnameSplit = history.location.pathname.split("/");

  useEffect(() => {
    (async () => {
      // if (!books.length) {
      //   const data = await getBooks(pathnameSplit[2]);
      //   dispatch({
      //     type: "SET_BOOKS",
      //     payload: { data },
      //   });
      // }
      // if (!chapters.length && pathnameSplit[1] === "book") {
      //   const data = await getChapters(pathnameSplit[2], pathnameSplit[3]);
      //   dispatch({
      //     type: "SET_CHAPTERS",
      //     payload: { data },
      //   });
      // }
    })();
  }, [history.location.pathname]);

  const onVersionChange = (e) => {
    history.push(`/books/${e.target.value}`);
  };

  const onBookChange = (e) => {
    history.push(`/book/${pathnameSplit[2]}/${e.target.value}`);
  };

  const onChapterChange = (e) => {
    history.push(
      `/chapter/${pathnameSplit[2]}/${chapter.bookId}/${e.target.value}`,
    );
  };

  return (
    <StyledHeader>
      {selectedVersion && (
        <select onChange={onVersionChange} value={selectedVersion}>
          {versions.map((v, i) => (
            <option value={v.id} key={i}>
              {truncateString(`${v.abbreviationLocal} ${v.description}`, 15)}
            </option>
          ))}
        </select>
      )}

      {selectedBook && (
        <select onChange={onBookChange} value={selectedBook}>
          {books.map((b, i) => (
            <option value={b.id} key={i}>
              {truncateString(b.name, 15)}
            </option>
          ))}
        </select>
      )}

      {JSON.stringify(chapter) !== "{}" && (
        <select
          onChange={onChapterChange}
          value={pathnameSplit[pathnameSplit.length - 1]}
        >
          {chapters.map((c, i) => (
            <option value={c.number} key={i}>
              {c.number}
            </option>
          ))}
        </select>
      )}
    </StyledHeader>
  );
};

export default Header;
