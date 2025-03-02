"use-client";

import { Typography, TextField, Button, Box, } from "@mui/material";

// Displays some profile information as text with an edit button
// When the edit button is pressed, changes to an input and a submit/cancel button

import { useState } from "react";

// Takes in: the variable (the info), the vars setter, and the submit function
const EditableProfileInformation = (props: { 
    info: string; 
    setInfo: (value: string) => void; 
    onSubmit: (value: string) => void; 
}) => {
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
        <Box sx={{ mb: 4 }}>
            <TextField
                fullWidth
                multiline
                value={tempInfo}
                onChange={(e) => setTempInfo(e.target.value)}
                autoFocus
                sx={{ mb: 2, fontSize: "1.25rem" }} 
                InputProps={{ sx: { fontSize: "1.25rem" } }} 
            />
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => { setInfo(tempInfo); onSubmit(tempInfo); setEditing(false); }}
                    >
                        Save
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={exitEditing}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        );
    } else {
        return (
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: "1.25rem"}}>{info}</Typography>
                <Button 
                    variant="text" 
                    onClick={enterEditing} 
                    sx={{ textTransform: "none", fontWeight: "bold", color: "primary.main", mt: 1,  }}
                >
                    Edit
                </Button>
            </Box>
        );
    }
}

export default EditableProfileInformation;