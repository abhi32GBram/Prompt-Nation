import Feed from '@components/Feed'
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center ">
            Discover & Share 
            <br  className="max-md:hidden"/>
            <span className="orange_gradient text-center ">Powerful Prompts</span>
        </h1>
        <p className="desc text-center">
          Prompt Nation is a Collaborative Environment for the World to Discover, Create, Share Useful & Creative Prompts 
        </p>
        <Feed />
    </section>
  )
}

export default Home 


