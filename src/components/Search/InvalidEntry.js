import React from "react";
import WAlert from '../../toolbox/components/Alert';

const InvalidEntry = ({entry}) => {
  return (
    <WAlert bg="danger" className="text-center mb-3">
      <h4>"{entry}"</h4>
      <p>
        The word you've entered isn't in the dictionary. Click on a spelling
        suggestion below or try again using the search bar above.
      </p>
    </WAlert>
  );
};

export default InvalidEntry;
