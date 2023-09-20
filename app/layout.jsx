// Import global styles
import "@styles/globals.css";
import NavBar from "@components/NavBar";
import Provider from "@components/Provider";

// Import necessary modules
import { HtmlContext } from "next/dist/shared/lib/html-context";
import { Children } from "react";

// Metadata for SEO
export const metadata = {
    title: "Prompt Nation",
    description: "Discover & Share Useful LLM Prompts to Boost Productivity",
};

// RootLayout component
const RootLayout = ({ children }) => {
    return (
        <html lang="en"> {/* Set the document language to English */}
            
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    {/* Main content area */}
                    <main className="app">
                        <NavBar />
                        {children} {/* Render the child components */}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;


// 2023-09-20T23:55:51.225Z