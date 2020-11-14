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
  background: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px 6px rgba(0, 0, 0, 0.3);

  button {
    cursor: pointer;
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    transition: 0.2s ease;

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
      color: red;
      font-size: 1.5rem;
    }
  }
`;

const StyledChapterTitle = styled.h3`
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
      dispatch({ type: "SET_CHAPTER", payload: { data } });
    })();

    return () =>
      history.location.pathname.includes("/book") &&
      dispatch({ type: "COMPONENT_UNMOUNTED", payload: { chapter: {} } });
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
