"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { UseSessionOptions, useSession } from 'next-auth/react'
import  {useRouter} from 'next/navigation'

import Profile from '@components/profile'

const MyProfile = () => {
    const {data : session} = useSession() 

    const [posts, setposts] = useState([])
    useEffect(()=>{
        const fetchPosts = async () => { 
        const reponse  = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await reponse.json()

        const router = useRouter()
    
        setposts(data)
        }
        if(session?.user.id)fetchPosts()
    
    },[])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async () => {

    }
    return (
        <Profile name="My " desc="Welcome to your Personalized Profile Page " data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
    )
}

export default MyProfile