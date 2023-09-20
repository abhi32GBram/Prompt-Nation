'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

// Component for creating a new prompt
const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });

    // Function to create a new prompt
    const createPrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
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
        <Form type="Create" post={post} setpost={setPost} submitting={submitting} handleSubmit={createPrompt} />
    );
};

export default CreatePrompt;
