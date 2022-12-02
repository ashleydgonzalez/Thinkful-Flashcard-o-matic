import React from "react";
import { Link } from "react-router-dom";


// This page is shown when there are less than 3 cards to study from in a single deck.
export default function NotEnoughCards({ length, deckId }) {
    return(
        <React.Fragment>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There {length > 1 ? `are ${length} cards` : `is ${length} card`} in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+ Add Cards</Link>
        </React.Fragment>
    )
}
