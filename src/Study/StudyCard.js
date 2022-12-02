import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function StudyCard ({ cards }) {

    // Declaring various variables - card state, flip state and history.
    const [card, setCard] = useState(0)
    const [flip, setFlip] = useState(false)
    const history = useHistory()

    // This function will either display the next card in the deck or show the "restart card" prompt.
    const nextCard = () => {
        if(card < cards.length - 1) {
            setCard(card + 1)
        } else {
            if(window.confirm("Restart cards? \n\nClick 'Cancel' to return to the home page.")) {
                setCard(0)
            } else {
                history.push("/")
            }
        }
        setFlip(false)
    }
 
    // This function will set the flip state between true and false based on the current value.
    const handleFlip = () => {
        setFlip(!flip)
    }

    // The return below will display the card body information used in the Study page
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Card {card + 1} of {cards.length}</h4>
                <p className="card-text">{flip ? cards[card].back : cards[card].front}</p>
                <button onClick={handleFlip} className="btn btn-secondary" style={{marginRight: "10px"}}>Flip</button>
                {flip ? <button onClick={() => nextCard()} className="btn btn-primary">Next</button> : null}
            </div>
        </div>
    )

}
