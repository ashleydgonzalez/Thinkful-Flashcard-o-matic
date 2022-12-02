import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {

    // Declaring the deck state
    const [deck, setDeck] = useState({})

    // Declaring a blank initial form state
    const initialFormState = {
        front: "",
        back: "",
    }
    
    // Declaring form data using the initial form state and declaring some basic variables (useParams, history)
    const [formData, setFormData] = useState({ ...initialFormState })
    const params = useParams()
    const deckId = params.deckId
    const history = useHistory()

    // Whenever deck ID changes, re-read the deck and Set Deck state based on results
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
        }
      loadDeck()
    },[deckId])

    // Declaring save handler to create a new card and reset form data
    const handleSaveCard = (event) => {
        event.preventDefault()
        createCard(deckId, formData)
        setFormData(initialFormState)
    }

    //The return below has AddCard page with the navigation bar and the buttons in the appropriate format:
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>

            <h2>{deck.name}: Add Card</h2>

            <CardForm formData={formData} setFormData={setFormData} />

            <button value="cancel" className="btn btn-secondary" style={{marginRight: "10px"}} onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
            <button value="submit" className="btn btn-primary" onClick={handleSaveCard}>Save</button>
        </React.Fragment>
    )

}
