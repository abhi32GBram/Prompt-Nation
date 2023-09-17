'use client'
import React  from 'react'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatePrompt = () => {
    const router = useRouter()
    const {data :session} = useSession()

    const [submitting, setIsSubmitting] = useState(false)
    const [post, setpost] = useState({prompt : '',tag:''})

    const createPrompt = async (e) => {
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
    
    <Form type="Create" post={post} setpost={setpost} submitting={submitting} handleSubmit={createPrompt}/>
)}

export default CreatePrompt