
"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation' 

import Profile from '@components/profile'

const MyProfile = () => {
    const { data: session } = useSession()
    const router = useRouter() 

    const [posts, setposts] = useState([])
    
    useEffect(() => {
        const fetchPosts = async () => { 
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setposts(data)
        }

        if (session?.user.id) {
            fetchPosts()
        }
    }, [session]) 

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post.id}`) 
    }

    const handleDelete = async (post) => {
        
    }

    return (
        <Profile name="My " desc="Welcome to your Personalized Profile Page " data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
    )
}

export default MyProfile
