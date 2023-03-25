import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Delete = () => {
  return (
    <button
      style={{
        padding: "8px",
        borderRadius: "10px",
        backgroundColor: "rgb(236, 65, 35)",
        cursor: "pointer",
      }}
    >
      <FontAwesomeIcon icon={faTrashCan} style={{ marginRight: "8px" }} />
      Delete
    </button>
  );
};

export default Delete;
