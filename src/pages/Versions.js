import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getVersions } from "../API";
import { useBibleContext } from "../store/Context";
import styled from "styled-components";
import { truncateString } from "../utils";

const StyledVersions = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: ${(p) => p.theme.text};
    text-decoration: none;
    border: 1px solid ${(p) => p.theme.text};
    padding: 0.5rem;
    transition: 0.2s ease;
    display: flex;
    justify-content: space-between;

    &:hover {
      color: ${(p) => p.theme.accent};
      box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    }
  }
`;

const Versions = () => {
  const [state, dispatch] = useBibleContext();
  const { versions } = state;

  useEffect(() => {
    window.scrollTo(0, -9999);

    // return () => dispatch({ type: "SET_VERSIONS", payload: { data: [] } });
  }, []);

  return (
    <>
      <h1>Select a Bible Version</h1>
      <StyledVersions>
        {versions.map((v, i) => (
          <Link key={i} to={`/books/${v.id}`}>
            <span>{v.abbreviationLocal}</span>
            <span>{truncateString(v.description, 15)}</span>
          </Link>
        ))}
      </StyledVersions>
    </>
  );
};

export default Versions;
