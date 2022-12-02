import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import CardForm from "../AddCard/CardForm";

export default function EditCard() {
    // Declaring my deck state
    const [deck, setDeck] = useState({})
    // Declaring my form state
    const [formData, setFormData] = useState({})
    // Decalring variable for params function
    const params = useParams()
    // Setting deckId param to a variable
    const deckId = params.deckId
    // Setting cardId param to a variable
    const cardId = params.cardId
    const history = useHistory();

    // Anytime the deckId or cardId changes, the deck and card data will be re-read from database.
    useEffect(() => {
        const abortController = new AbortController()

        async function loadDeck() {
            const deckResponse = await readDeck(deckId, abortController.signal)
            setDeck(deckResponse)
            const cardResponse = await readCard(cardId, abortController.signal)
            setFormData(cardResponse)
        }
        loadDeck()
        return () => abortController.abort()
    }, [deckId, cardId])

    // Declaring the submit handler function to update the card state and push user to `/decks/${deckId}`.
    const submitHandler = (event) => {
        event.preventDefault()
        updateCard(formData)
        history.push(`/decks/${deckId}`)
    }

    // The return below constructs the Edit Card page(format):
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>

            <h2>Edit Card</h2>

            <CardForm formData={formData} setFormData={setFormData} />

            <button value="cancel" className="btn btn-secondary" style={{marginRight: "10px"}} onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
            <button value="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>
        </React.Fragment>
    )

}
