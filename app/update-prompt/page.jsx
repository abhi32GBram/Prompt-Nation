"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

// UpdatePrompt component for updating a prompt
const UpdatePrompt = () => {
    const router = useRouter();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    // Get the prompt ID from the URL
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    // Function to fetch and update prompt details
    useEffect(() => {
        const getPromptDetails = async () => {
            if (!promptId) return; // Don't proceed if prompt ID is not found

            try {
                // Make a GET request to fetch prompt details by ID
                const response = await fetch(`/api/prompt/${promptId}`);
                const data = await response.json();

                // Update the post state with fetched data
                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                });
            } catch (error) {
                console.error(error);
            }
        };

        getPromptDetails();
    }, [promptId]);

    // Function to update a prompt
    const updatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!promptId) {
            return alert("Prompt ID Not Found!!");
        }

        try {
            // Make a PATCH request to update the prompt
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form type='Edit' post={post} setpost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
    );
};

export default UpdatePrompt;
