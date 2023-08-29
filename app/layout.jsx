import '@styles/globals.css'
import { HtmlContext } from 'next/dist/shared/lib/html-context'
import { Children } from 'react'

export const metadata = {
    title : "Prompt Nation",
    description : "Discover & Share Useful LLM Prompts to Boost Productivity"

}


const RootLayout = ({children}) => {
  return (
    <html len="en">
        <body>
            <div className='main'>
                <div className='gradient '/>
            </div>
            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout