"use-client";

// Displays some profile information as text with an edit button
// When the edit button is pressed, changes to an input and a submit/cancel button

import { FormEventHandler, useState } from "react";

// Takes in: the variable (the info), the vars setter, and the submit function
const EditableProfileInformation = (props: { info: string; setInfo: Function; onSubmit: Function; }) => {
    const { info, setInfo, onSubmit } = props;

    const [editing, setEditing] = useState(false);
    const [tempInfo, setTempInfo] = useState(info); // Temporary state for editing

    const exitEditing = () => {
        setTempInfo(info);
        setEditing(false);
    }

    const enterEditing = (e: React.FormEvent) => {
        e.preventDefault();
        setTempInfo(info);
        setEditing(true);
    }

    if (editing) {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                setInfo(tempInfo);
                onSubmit(tempInfo);
                setEditing(false);
              }} 
            className="form">
                <textarea
                className="form-textarea"
                placeholder="Your info here..."
                value={tempInfo}
                onChange={(e) => setTempInfo(e.target.value)}
                />
                <div className="button-group">
                <button type="submit" className="btn">
                    Confirm
                </button>
                <button type="button" className="btn" onClick={exitEditing}>
                    Cancel
                </button>
                </div>
            </form>
        );
    } else {
        return (
            <form onSubmit={enterEditing} className="form">
                <p>{info}</p>
                <button type="submit" className="btn">
                Edit
                </button>
            </form>
        )
    }
    
}

export default EditableProfileInformation;