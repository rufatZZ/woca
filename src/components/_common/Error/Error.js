import React from "react";
import { Alert } from "../../../toolbox/components/";

const Error = ({ type }) => {
  return (
    <Alert bg="danger" className="text-center">
      {type === 1 && <h4>Whoops!</h4>}
      {type === 0 && (
        <div>
          <h4>Words fail us</h4>
          <p>
            Sorry, the word you’re looking for can’t be found in the dictionary.
          </p>
        </div>
      )}
    </Alert>
  );
};

export default Error;
