import React from "react";

const InvalidEntry = ({entry}) => {
  return (
    <div className="alert alert-warning text-center mb-3">
      <h4>"{entry}"</h4>
      <p>
        The word you've entered isn't in the dictionary. Click on a spelling
        suggestion below or try again using the search bar above.
      </p>
    </div>
  );
};

export default InvalidEntry;
