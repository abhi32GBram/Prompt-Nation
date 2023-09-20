import Link from "next/link";

const Form = ({ type, post, setpost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      {/* Form title */}
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      {/* Form description */}
      <p className='desc text-left max-w-md'>
        {type} & share creative prompts with the world, let your imagination run wild with any AI-Powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        {/* Prompt input */}
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Prompt Here
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setpost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea'
          />
        </label>

        {/* Tag input */}
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Tag Here{" "}
            <span className='font-normal'>
              ( #webdev #research #idea )
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setpost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        {/* Cancel and submit buttons */}
        <div className='flex-end mx-3 mb-5 gap-4'>
          {/* Cancel link */}
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          {/* Submit button */}
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
