import React from "react";
import { Link } from "react-router-dom";
const ConditionalLink = ({ to, children, condition }) => {
  return condition ? (
    <Link style={{ textDecoration: "none" }} to={to}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export default ConditionalLink;
