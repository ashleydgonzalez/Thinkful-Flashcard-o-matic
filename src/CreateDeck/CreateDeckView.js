import React from "react";

//CreateDeckView will be used by both the CreateDeck and EditDeck components.
export default function CreateDeckView({ formData, setFormData }) {
  // Declaring the change handler function.
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  //The return below has the form for the Edit/Create Deck views.
  return (
    <React.Fragment>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="name"
            className="form-control"
            placeholder="Deck Name"
            required
            onChange={changeHandler}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="description"
            className="form-control"
            placeholder="Brief description of the deck"
            required
            onChange={changeHandler}
            value={formData.description}
          />
        </div>
      </form>
    </React.Fragment>
  );
}
