import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>The Daily Posts - Page not found</title>
      </Helmet>
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Back to main page</Link>
      </div>
    </>
  );
};
