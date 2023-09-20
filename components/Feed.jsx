'use client'
import React, { useState, useEffect } from "react";
import gsap from "gsap"; // Import GSAP
import PromptCard from "./PromptCard";

// Component for displaying a list of prompt cards
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

// Main feed component
const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Add a state to track animation readiness

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Function to fetch all prompts
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    // Fetch prompts when the component mounts
    fetchPosts();

    // Apply slide-in animation when content is loaded
    gsap.fromTo(
      ".feed",
      { y: 1000 }, // Initial state (offscreen to the left)
      {
        y: 0, // Final state (slide in from the left)
        duration: 0.75, // Animation duration in seconds
        onComplete: () => setIsLoaded(true), // Mark animation as complete
      }
    );
  }, []);

  // Function to filter prompts based on search text
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce method to delay search execution
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // Function to handle tag click (triggering a search)
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className={`feed ${isLoaded ? "loaded" : ""}`}> {/* Add a class based on animation state */}
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* Display prompts based on search or all prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
