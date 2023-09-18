'use client'
import React from 'react'

import { useState } from 'react'
import { useEffect } from 'react'

import  PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => { 
  return(
    <div className='mt-16 prompt_layout'>
        {data.map((post) => ( 
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
        ))}
    </div>
  )
}
const Feed = () => {

  const [searchText, setsearchText] = useState('')
  const [posts, setposts] = useState([])
  const handleSearchChange = (e) => {

  }
  useEffect(()=>{
    const fetchPosts = async () => { 
      const reponse  = await fetch('/api/prompt')
      const data = await reponse.json()

      setposts(data)
    }
    fetchPosts()

  },[])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center '>
        <input type='text' placeholder='Search for Prompts, Tags, Usernames...' value={searchText} onChange={handleSearchChange} required className='search_input peer'/>
      </form>
      <PromptCardList  data={posts} handleTagClick={() => {

      }}/>
    </section>
  )
}

export default Feed
