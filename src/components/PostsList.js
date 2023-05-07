import React, { useState } from "react";
import Button from '@mui/material/Button';
import { GridAddIcon } from '@mui/x-data-grid';
import { Tooltip } from "@mui/material";
import PostDialog from "./PostDialog";

export default function PostsList(props) {

    const { selectedUserPosts, selectedUserDetails } = props
    const [isNewPost, setIsNewPost] = useState(false);

    const handleIsNewPost = () => {
        setIsNewPost(true);
    };

    const handleCloseDialog = () => {
        setIsNewPost(false);
    };

    return (
        <>
            <div style={{ position: "relative", left: '65vw', bottom: '46vh', width: '30vw', height: '40vh', background: '#1976d21c' }}>
                <h3 style={{ position: "relative", left: '1vw', top: '0.5vh' }}>{selectedUserDetails.name} Posts</h3>
                <Button variant="outline" onClick={handleIsNewPost}>
                    <GridAddIcon></GridAddIcon>
                    new post
                </Button>
                <ul style={{ overflow: "scroll", height: '30vh' }}>
                    {selectedUserPosts.map((p, i) => <Tooltip key={i} title={p.body} placement="bottom"><li>{p.title}</li></Tooltip>)}
                </ul>
            </div>
            {isNewPost && <PostDialog selectedUserDetails={selectedUserDetails} onCloseDialog={handleCloseDialog}  onAddNewPost={props.onAddNewPost} />}
        </>
    )
}