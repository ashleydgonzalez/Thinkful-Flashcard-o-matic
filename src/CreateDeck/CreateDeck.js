import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CreateDeckView from "./CreateDeckView";
import { createDeck } from "../utils/api";

export default function CreateDeck() {
  const history = useHistory();

  // Setting initial form state to blank for both name and description.
  const initialFormState = {
    name: "",
    description: "",
  };

  //Declaring my formData to utilize the initialFormState.
  const [formData, setFormData] = useState({ ...initialFormState });

  // This is the submit handler that will create a new deck based on the data the user entered on the form, and then redirect the user to the appropriate deck page.
  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(formData).then((results) => {
      history.push(`/decks/${results.id}`);
    });
  };

  // The return below is generating the CreateDeck page.
  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>

      <CreateDeckView formData={formData} setFormData={setFormData} />

      <button
        type="cancel"
        className="btn btn-secondary"
        style={{ marginRight: "10px" }}
        onClick={() => history.push("/")}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </React.Fragment>
  );
}
