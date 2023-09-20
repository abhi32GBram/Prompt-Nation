import React from 'react';
import PromptCard from './PromptCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      {/* Profile title */}
      <h1 className='head_text text-left'>
        <span className='purple_gradient'>{name} Profile</span>
      </h1>
      {/* Profile description */}
      <p className='desc text-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
        {/* Render prompt cards */}
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            // Pass functions for editing and deleting prompts
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
