import React from "react";
import WAlert from '../../../toolbox/components/Alert';

const Error = ({ type }) => {
  return (
    <WAlert bg="danger" className="text-center">
      {type === 1 && <h4>Whoops!</h4>}
      {type === 0 && (
        <div>
          <h4>Words fail us</h4>
          <p>
            Sorry, the word you’re looking for can’t be found in the dictionary.
          </p>
        </div>
      )}
    </WAlert>
  );
};

export default Error;
