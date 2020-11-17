import React, { useRef } from "react";
import styled from "styled-components";
import { useBibleContext } from "../store/Context";
import { getParams, truncateString } from "../utils";
import { useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsX, BsSearch } from "react-icons/bs";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 5vh;

  position: sticky;
  top: 0;
  background: ${(p) => p.theme.navigation};
  box-shadow: 0 0 5px 6px rgba(0, 0, 0, 0.3);

  svg {
    cursor: pointer;
    fill: ${(p) => p.theme.text};
    transition: 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  .sideBarContainer {
    background: none;
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100vh;
    transition: 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
    display: flex;

    &.open {
      left: 0;
    }

    .sideBar {
      width: 50%;
      max-width: 20rem;
      height: 100vh;
      background: ${(p) => p.theme.background};
      color: ${(p) => p.theme.text};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

      display: flex;
      flex-direction: column;

      select {
        padding: 0.5rem;
      }

      .sidebarItem {
        display: flex;
        border-bottom: 2px solid ${(p) => p.theme.text};
        padding: 0.5rem;
        font-size: 1.2rem;
        transition: 0.2s ease;

        &.button {
          cursor: pointer;
          user-select: none;

          &:hover {
            background: ${(p) => p.theme.navigation};
          }
        }

        &.darkMode {
          justify-content: space-between;

          .dark {
            color: #12ff12;
          }

          .notDark {
            color: red;
          }
        }

        &.close {
          justify-content: flex-end;
        }
      }

      form {
        flex: 1;
        input {
          background: ${(p) => p.theme.navigation};
          color: ${(p) => p.theme.text};
          padding: 0.5rem;
          border: none;
          outline: none;
          transition: 0.1s ease;
          width: 100%;
        }
      }
    }

    .sidebarCloser {
      flex: 1;
    }
  }

  .rightSide {
    display: flex;
    align-items: center;

    select,
    svg {
      margin-left: 1rem;
    }
  }
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
    sidebar,
  } = state;
  const history = useHistory();
  const params = getParams(window.location.pathname);

  const onVersionChange = (e) => {
    history.push(`/books/${e.target.value}`);
    closeSidebar();
  };

  const onBookChange = (e) => {
    history.push(`/book/${params.versionId}/${e.target.value}`);
  };

  const onChapterChange = (e) => {
    history.push(
      `/chapter/${params.versionId}/${chapter.bookId}/${e.target.value}`,
    );
  };

  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const toggleDarkMode = () => {
    dispatch({ type: "SET_DARKMODE", payload: { darkMode: !state.darkMode } });
    localStorage.darkMode = !state.darkMode;
  };

  const go = (where) => {
    history.push(where);
    closeSidebar();
  };

  const toggleSearch = () => {
    openSidebar();
    searchRef.current.focus();
  };

  const searchRef = useRef();

  const handleChange = (e) => {
    dispatch({ type: "HANDLE_CHANGE", payload: { value: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.selectedVersion)
      return alert("Select a Bible version to search first");
    if (!state.searchQuery.trim()) return;
    history.push(`/search/${params.versionId}/${state.searchQuery}/1`);
    closeSidebar();
  };

  return (
    <StyledHeader>
      <GiHamburgerMenu size={20} onClick={openSidebar} />

      <div className={sidebar ? `sideBarContainer open` : "sideBarContainer"}>
        <div className="sideBar">
          <div className="sidebarItem close">
            <BsX size={30} onClick={closeSidebar} />
          </div>
          <div className="sidebarItem button" onClick={() => go("/")}>
            Home
          </div>
          <div className="sidebarItem darkMode button" onClick={toggleDarkMode}>
            Dark Mode{" "}
            <span className={state.darkMode ? "dark" : "notDark"}>
              {state.darkMode ? "ON" : "OFF"}
            </span>
          </div>
          {selectedVersion && (
            <select onChange={onVersionChange} value={selectedVersion}>
              {versions.map((v, i) => (
                <option value={v.id} key={i}>
                  {truncateString(
                    `${v.abbreviationLocal} ${v.description}`,
                    15,
                  )}
                </option>
              ))}
            </select>
          )}
          <div className="sidebarItem">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                ref={searchRef}
                placeholder="Search the bible"
                value={state.searchQuery}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>

        <div className="sidebarCloser" onClick={closeSidebar}></div>
      </div>

      <div className="rightSide">
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
          <select onChange={onChapterChange} value={chapter?.number}>
            {chapters?.map((c, i) => (
              <option value={c.number} key={i}>
                {c.number}
              </option>
            ))}
          </select>
        )}
        <BsSearch onClick={toggleSearch} />
      </div>
    </StyledHeader>
  );
};

export default Header;
