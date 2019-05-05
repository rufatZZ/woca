import React from "react";
import { Alert } from "../../toolbox/components/";

const InvalidEntry = ({ entry }) => {
  return (
    <Alert bg="danger" className="text-center mb-3">
      <h4>"{entry}"</h4>
      <p>
        The word you've entered isn't in the dictionary. Click on a spelling
        suggestion below or try again using the search bar above.
      </p>
    </Alert>
  );
};

export default InvalidEntry;
