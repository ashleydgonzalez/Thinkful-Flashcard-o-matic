import React from "react";
import Deck from "./Deck";
import { Link } from "react-router-dom";

// This component is the home page which shows all decks in the database. 
export default function DeckList() {
    return (
        <React.Fragment>
            <Link to="/decks/new" className="btn btn-secondary" style={{marginBottom: "10px"}}>+ Create Deck</Link>
            <Deck />
        </React.Fragment>
        
    )
}

