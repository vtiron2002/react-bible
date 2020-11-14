import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getVersions } from "../API";
import { useBibleContext } from "../store/Context";
import styled from "styled-components";

const StyledVersions = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: black;
    text-decoration: none;
    text-align: center;
    border: 1px solid black;
    padding: 0.5rem;
    transition: 0.2s ease;

    &:hover {
      & {
        color: red;
      }
      
      transform: scale(1.05);
    }
  }
`;

const Versions = () => {
  const [state, dispatch] = useBibleContext();
  const { versions } = state;

  useEffect(() => {
    // return () => dispatch({ type: "SET_VERSIONS", payload: { data: [] } });
  }, []);

  return (
    <StyledVersions>
      {versions.map((v, i) => (
        <Link key={i} to={`/books/${v.id}`}>
          {v.name}
        </Link>
      ))}
    </StyledVersions>
  );
};

export default Versions;
