import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import CreateDeckView from "../CreateDeck/CreateDeckView";

export default function EditDeck() {
    // Declaring the initial form state.
    const initialFormState = {
        name: "",
        description: "",
    }
    // Declare my formData state
    const [formData, setFormData] = useState({ ...initialFormState })
    // Declare params for useParams
    const params = useParams()
    // Declare deckId from params
    const deckId = params.deckId
    // Declare history from useHistory
    const history = useHistory()
    // When deckId changes, re-read the deck and setFormData accordingly.
    useEffect(() => {
        const abortController = new AbortController()

        async function loadDeck() {
            const response = await readDeck(deckId, abortController.signal)
            setFormData(response)
        }
        loadDeck()
        return () => abortController.abort()
    }, [deckId])

    
    // Declaring the submit handler function
    const submitHandler = (event) => {
        event.preventDefault()
        updateDeck(formData)
        .then((results) => {
            history.push(`/decks/${results.id}`)
        })
    }

    // In the return below I'm forming the EditDeck page
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{formData.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>

            <h2>Edit Deck</h2>

            <CreateDeckView formData={formData} setFormData={setFormData} />

            <button type="cancel" className="btn btn-secondary" style={{marginRight: "10px"}} onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
            <button type="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>

        </React.Fragment>
    )
}
