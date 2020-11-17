import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getChapter } from "../API";
import { useBibleContext } from "../store/Context";
import styled from "styled-components";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const StyledBottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${(p) => p.theme.navigation};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.16), 0 -3px 6px rgba(0, 0, 0, 0.23);

  button {
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    transition: 0.2s ease;
    background: ${(p) => p.theme.background};
    border: none;

    &:disabled {
      visibility: hidden;
    }

    svg {
      fill: ${(p) => p.theme.text};
    }

    &:hover {
      transform: scale(1.2);
      box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: scale(0.9);
      box-shadow: none;
    }
  }
`;

const StyledChapter = styled.div`
  margin-bottom: 5rem;

  p {
    span.v {
      color: ${(p) => p.theme.accent};
      font-size: 1.5rem;
      margin-right: 0.3rem;
    }
  }

  p.s {
    font-weight: bold;
    margin: 0.5rem 0;
  }
`;

const StyledChapterTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Chapter = ({ history }) => {
  const params = useParams();
  const { bookId, versionId } = params;
  const [state, dispatch] = useBibleContext();
  const { chapter } = state;
  const { reference, previous, next } = chapter;

  useEffect(() => {
    (async () => {
      const data = await getChapter(versionId, bookId, params.chapter);
      dispatch({
        type: "COMPONENT_MOUNTED",
        payload: {
          chapter: data,
          selectedVersion: versionId,
          selectedBook: bookId,
        },
      });
      window.scrollTo(0, -9999);
    })();

    return () => {
      const has = (what) => history.location.pathname.includes(what);
      const payload = {};
      payload.chapter = {};
      if (has("/search")) {
        payload.selectedBook = null;
      }
      dispatch({ type: "COMPONENT_UNMOUNTED", payload });
    };
  }, [history.location.pathname]);

  const nextChapter = () => {
    history.push(
      `/chapter/${chapter.bibleId}/${chapter.bookId}/${next?.number}`,
    );
  };

  const prevChapter = () => {
    history.push(
      `/chapter/${chapter.bibleId}/${chapter.bookId}/${previous?.number}`,
    );
  };

  return (
    <>
      <StyledChapterTitle>{reference}</StyledChapterTitle>
      <StyledChapter
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      ></StyledChapter>
      <StyledBottomNavigation>
        <button
          onClick={prevChapter}
          disabled={!parseInt(previous?.number)}
          className="prev"
        >
          <BsFillCaretLeftFill size={16} />
        </button>
        <button
          onClick={nextChapter}
          disabled={!parseInt(next?.number)}
          className="next"
        >
          <BsFillCaretRightFill size={16} />
        </button>
      </StyledBottomNavigation>
    </>
  );
};

export default Chapter;
