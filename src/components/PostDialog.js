import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PostDialog(props) {

    const selectedUserDetails = props.selectedUserDetails
    const [openDialog, setOpenDialog] = useState(true)
    const [newPost, setNewPost] = useState({ title: "", body: "" })

    const handleCloseDialog = () => {
        setOpenDialog(false);
        props.onCloseDialog();
    };

    const handleAddNewPost = () => {
        if (newPost.title !== null && newPost.title !== "") {
            handleCloseDialog();
            props.onAddNewPost(newPost)
        }
    };

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{selectedUserDetails.name} - Post</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    In order to add a new post please enter clear title and detailed body
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    placeholder="Title"
                    required
                    onBlur={(e) => { setNewPost({ title: e.target.value, body: newPost.body }) }}
                />
                <TextField
                    autoFocus
                    multiline={true}
                    margin="dense"
                    id="name"
                    label="Body"
                    type="text"
                    fullWidth
                    variant="standard"
                    placeholder="Body"
                    onBlur={(e) => { setNewPost({ title: newPost.title, body: e.target.value }) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleAddNewPost}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}