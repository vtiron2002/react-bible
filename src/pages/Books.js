import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBooks } from "../API";
import { useBibleContext } from "../store/Context";

const Books = ({ history }) => {
  const params = useParams();
  const { versionId } = params;
  const [state, dispatch] = useBibleContext();
  const { books } = state;

  useEffect(() => {
    (async () => {
      const data = await getBooks(versionId);
      dispatch({ type: "SET_BOOKS", payload: { data, version: versionId } });
    })();

    return () =>
      history.location.pathname === "/" &&
      dispatch({
        type: "COMPONENT_UNMOUNTED",
        payload: { selectedVersion: null },
      });
  }, [history.location.pathname]);

  return (
    <div>
      {books.map((b, i) => (
        <div key={i}>
          <Link to={`/book/${b.bibleId}/${b.id}`}>{b.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Books;
