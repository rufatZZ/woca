import React from "react";

const Error = ({ type }) => {
  return (
    <div className="alert alert-danger text-center">
      {type === 1 && <h4>Whoops!</h4>}
      {type === 0 && (
        <div>
          <h4>Words fail us</h4>
          <p>
            Sorry, the word you’re looking for can’t be found in the dictionary.
          </p>
        </div>
      )}
    </div>
  );
};

export default Error;
