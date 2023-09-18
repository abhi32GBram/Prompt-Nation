'use client'
import React, { useEffect }  from 'react'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter , useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const UpdatePrompt = () => {
    const router = useRouter()
    const {data :session} = useSession()

    const [submitting, setIsSubmitting] = useState(false)
    const [post, setpost] = useState({prompt : '',tag:''})

    const  searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    useEffect(() => {
        

    },[promptId])

    const UpdatePrompt = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        try {
            const responce = await fetch('/api/prompt/new',{
                method:'POST',
                body:JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
                    tag:post.tag
                })
            }) 
            if(responce.ok) {
                router.push('/')
            }

        } catch (error) {
            console.log(error)
        }finally
        {
            setIsSubmitting(false)
        }
    }
    return (
    
    <Form type="Create" post={post} setpost={setpost} submitting={submitting} handleSubmit={UpdatePrompt}/>
)}

export default UpdatePrompt