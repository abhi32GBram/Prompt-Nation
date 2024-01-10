'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

// MyProfile component for displaying the user's profile
const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    // State to store user's posts
    const [posts, setPosts] = useState([]);

    // Fetch user's posts when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            if (session?.user.id) {
                try {
                    // Make a GET request to fetch user's posts by their ID
                    const response = await fetch(`/api/users/${session.user.id}/posts`);
                    const data = await response.json();
                    setPosts(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        // Check if a user session exists before fetching posts
        if (session) {
            fetchPosts();
        }
    }, [session]);

    // Function to handle editing a post
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    // Function to handle deleting a post
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                // Make a DELETE request to delete the post
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                // Filter out the deleted post from the state
                const filteredPosts = posts.filter((item) => item._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Profile
            name="My"
            desc="Welcome to your Personalized Profile Page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
