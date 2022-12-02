import React from "react";

export default function CardForm({ formData, setFormData }) {

    // Declaring the change handler
    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }
    
    // In the return below is the CardForm data that is imported to AddCard.js and EditCard.js. 
    return (
        <form>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea name="front" required className="form-control" placeholder="Front side of card" onChange={changeHandler} value={formData.front}/>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea name="back" required className="form-control" placeholder="Back side of card" onChange={changeHandler} value={formData.back}/>
            </div>
        </form>
    )
}

