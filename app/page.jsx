'use client'
import React, { useEffect, useRef } from "react";
import Feed from '@components/Feed'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Refs for elements to animate
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const feedRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const feed = feedRef.current;

    // Animation for title and subtitle
    gsap.fromTo(
      [title, subtitle],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: "top bottom-=100",
        },
      }
    );

    // Animation for description
    gsap.fromTo(
      description,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: description,
          start: "top bottom-=100",
        },
      }
    );

    // Animation for feed
    gsap.fromTo(
      feed,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: feed,
          start: "top bottom-=100",
        },
      }
    );
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center" ref={titleRef}>
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Powerful Prompts</span>
      </h1>
      <p className="desc text-center" ref={subtitleRef}>
        Prompt Nation is a Collaborative Environment for the World to Discover, Create, Share Useful & Creative Prompts
      </p>
      <Feed ref={feedRef} />
    </section>
  );
};

export default Home;
