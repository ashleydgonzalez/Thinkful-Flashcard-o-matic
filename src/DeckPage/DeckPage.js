import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";

export default function DeckPage() {
    // Declaring a deck and card state
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    // Declaring a deckId param and history variable
    const params = useParams()
    const deckId = params.deckId
    const history = useHistory()

    // Whenever deck ID is updated the deck and card states will update accordingly
    useEffect(() => {
        const abortController = new AbortController()

        async function loadDecks() {
            const response = await readDeck(deckId, abortController.signal)
            setDeck(response)
            setCards(response.cards)
        }
        loadDecks()
        return () => abortController.abort()
    }, [deckId])

    // This is the deck deletion handler that we will be using when we want to delete a deck.
    const handleDeleteDeck = (deckId) => {
        if (window.confirm("Are you sure you want to delete this deck?")) {
            deleteDeck(deckId)
            history.push("/")
        }
    }

    // This is the card deletion handler when we want to delete a card.
    const handleDeleteCard = (cardId) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteCard(cardId)
            window.location.reload(false)
        }
    }

    // The return below will generate the Deck page
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>

            <div>
                <h5>{deck.name}</h5>
                <p>{deck.description}</p>
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary" style={{marginRight: "10px"}}>Edit</Link>
                <Link to={`/decks/${deckId}/study`} className="btn btn-primary" style={{marginRight: "10px"}}>Study</Link>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary" style={{marginRight: "10px"}}>+ Add Cards</Link>
                <button onClick={() => handleDeleteDeck(deckId)} name="delete" className="btn btn-danger float-right" type="button">Delete</button>
            </div>

            
            <h2 style={{marginTop: "30px"}}>Cards</h2>

            {cards.map((card, index) => {
                return (
                <div className="card" key={index}>
                    <div className="card-body">
                        <div className="row">
                            <p className="col card-text">{card.front}</p>
                            <p className="col card-text">{card.back}</p>
                        </div>
                        <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)} style={{float: "right"}}>Delete</button>
                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary" style={{float: "right", marginRight: "10px"}}>Edit</Link>
                    </div>
                </div>
                )
            })
            }
        </React.Fragment>
    )
}
