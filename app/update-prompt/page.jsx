'use client'
import React, { useEffect }  from 'react'

import { useState } from 'react'
import { useRouter , useSearchParams } from 'next/navigation'

// import { useSession } from 'next-auth/react' NOT NEEDED ANYMORE 

import Form from '@components/Form'

const UpdatePrompt = () => {
    const router = useRouter()
     // const {data :session} = useSession()   NOT NEEDED ANYMORE 

    const [submitting, setIsSubmitting] = useState(false)
    const [post, setpost] = useState({prompt : '',tag:''})

    const  searchParams = useSearchParams()
    const promptId = searchParams.get("id")

    useEffect(() => 
    {
        const getPromptDetails = async () => 
        {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data =  await response.json()

            setpost({
                prompt : data.prompt,
                tag : data.tag
            })

            if(promptId) getPromptDetails()
        }
    },[promptId])

    const updatePrompt = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        if(!promptId) return alert("Prompt ID Not Found !! ")
        
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            }) 
            if(response.ok) {
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
    <Form type='Edit' post={post} setpost={setpost} submitting={submitting} handleSubmit={updatePrompt}/>
)}

export default UpdatePrompt
