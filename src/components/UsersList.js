import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PostList from "./PostsList";

export default function UsersList() {

    const [users, setUsers] = useState([])
    const [usersPosts, setUserPosts] = useState([])
    const [selectedUserPosts, setSelectedUserPosts] = useState([])
    const [selectedUserDetails, setSelectedUserDetails] = useState({ id: 0, name: "" })
    const [displayPostsList, setdisplayPostsList] = useState(false)
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 280,
        },
        {
            field: 'companyName',
            headerName: 'Company',
            width: 200,
            valueGetter: (params) => {
                return params.row.company.name
            },
            filterable: false
        },
    ];

    const handleSelectedRow = (params) => {
        setSelectedUserPosts(usersPosts.filter((p) => {
            if (p.userId === params.row.id) return p;
            else return false;
        }));
        setSelectedUserDetails({ id: params.row.id, name: params.row.name });
        setdisplayPostsList(true);
    };

    const handleAddNewPost = (newPost) => {
        setSelectedUserPosts([...selectedUserPosts, { userId: selectedUserDetails.id, id: selectedUserPosts.length + 1, title: newPost.title, body: newPost.body }])
    };

    useEffect(() => {
        const getUsersAsync = async () => {
            await axios.get('https://jsonplaceholder.typicode.com/users')
                .then((res) => {
                    setUsers(res.data)
                })
                .catch((error) => console.log(error))
        }
        const getUsersPostsAsync = async () => {
            await axios.get('https://jsonplaceholder.typicode.com/posts')
                .then((res) => {
                    setUserPosts(res.data)
                })
                .catch((error) => console.log(error))
        }
        getUsersAsync();
        getUsersPostsAsync();
    }, [])

    return (
        <>
            <div style={{ height: 700, width: '45vw', position: "relative", left: '15vw', top: '10vh' }}>
                <DataGrid rows={users} columns={columns} onRowClick={handleSelectedRow}
                    slots={{ toolbar: GridToolbar }} />
            </div>
            {displayPostsList && <PostList selectedUserPosts={selectedUserPosts} selectedUserDetails={selectedUserDetails}
                onAddNewPost={handleAddNewPost} />}
        </>
    )
}