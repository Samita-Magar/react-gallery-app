import React from "react";

// Component for no images returned from API request
const NoPhoto = () => {
  return (
    <li className="not-found">
      <h3>No Results Found</h3>
      <p>Your search did not return any results. Please try again.</p>
    </li>
  );
};

export default NoPhoto;