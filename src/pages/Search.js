import React, { useEffect } from "react";
import { searchBible } from "../API";
import { Link, useParams } from "react-router-dom";
import { useBibleContext } from "../store/Context";
import styled from "styled-components";

const StyledSearch = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;

    @media (max-width: 400px) {
      flex-direction: column;
      align-items: stretch;

      h3 {
        margin-bottom: 1rem;
      }
    }

    h3 {
      font-size: 0.9rem;

      span {
        font-size: 1.5rem;
      }
    }

    form {
      input {
        background: ${(p) => p.theme.navigation};
        color: ${(p) => p.theme.text};
        padding: 0.5rem;
        border: none;
        outline: none;
        transition: 0.1s ease;
        width: 100%;
      }

      input:focus {
        border-bottom: 2px solid ${(p) => p.theme.accent};
      }
    }
  }

  > p {
    margin-bottom: 2rem;
  }

  .verses {
    .verse {
      margin-bottom: 2rem;
      border-bottom: 1px solid #ccc;

      strong {
        font-size: 1.2rem;
        margin-bottom: 0.5em;
        display: inline-block;
      }

      p {
        margin-bottom: 0.5em;
      }

      a {
        color: ${(p) => p.theme.accent};
        margin-bottom: 1rem;
        text-decoration: none;
        display: inline-block;
        transition: 0.2s ease;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    transition: 0.2s ease;

    a {
      text-decoration: none;
      color: ${(p) => p.theme.text};

      &:hover {
        color: ${(p) => p.theme.accent};
      }
    }
  }
`;

const Search = ({ history }) => {
  const params = useParams();
  const [state, dispatch] = useBibleContext();
  const { searchResults } = state;

  useEffect(() => {
    scrollTo(0, -9999);
    (async () => {
      const data = await searchBible(
        params.versionId,
        params.query,
        params.page,
      );
      dispatch({
        type: "COMPONENT_MOUNTED",
        payload: { searchQuery: params.query },
      });
      const payload = {};
      const { limit, total, offset } = data;
      const left = total - (limit * (offset + 1) - limit);
      if (left < 10) {
        payload.data = { ...data, verses: data.verses.slice(0, left) };
      } else {
        payload.data = data;
      }
      dispatch({ type: "FINISH_SEARCH", payload });
    })();
  }, [history.location.pathname]);

  const handleChange = (e) => {
    dispatch({ type: "HANDLE_CHANGE", payload: { value: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.searchQuery.trim()) return;
    history.push(`/search/${params.versionId}/${state.searchQuery}/1`);
  };

  if (!state.searchResults) return null;

  const { limit, offset, total, verses } = searchResults;

  const goToPage = (p) => `/search/55212e3cf5d04d49-01/${params.query}/${p}`;

  return (
    <StyledSearch>
      <div className="top">
        <h3>
          Search results for: <br /> <span>{searchResults.query}</span>
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={state.searchQuery}
            onChange={handleChange}
          />
        </form>
      </div>

      {!state.searchResults.total ? (
        <>
          <span>
            There are no results for the search "{state.searchResults.query}"
          </span>
        </>
      ) : (
        <>
          <p>
            Showing{" "}
            <strong>
              {offset === 0 ? 1 : limit * (offset + 1) - limit + 1}
            </strong>
            -
            <strong>
              {limit * (offset + 1) > total ? total : limit * (offset + 1)}
            </strong>{" "}
            of <strong>{total}</strong> results.
          </p>

          <div className="verses">
            {verses?.map((v) => (
              <div key={v.id} className="verse">
                <strong>{v.reference}</strong>
                <p>{v.text}</p>
                <Link
                  to={`/chapter/${v.bibleId}/${v.bookId}/${
                    v.chapterId.split(".")[1]
                  }`}
                >
                  View Chapter
                </Link>
              </div>
            ))}
          </div>

          <div className="navigation">
            <Link
              to={goToPage(parseInt(params.page) - 1)}
              style={{ visibility: params.page - 1 < 1 ? "hidden" : "visible" }}
            >
              Prev
            </Link>
            <p>{params.page}</p>
            <Link
              style={{
                visibility:
                  parseInt(params.page) === Math.ceil(total / limit)
                    ? "hidden"
                    : "visible",
              }}
              to={goToPage(parseInt(params.page) + 1)}
            >
              Next
            </Link>
          </div>
        </>
      )}
    </StyledSearch>
  );
};

export default Search;
