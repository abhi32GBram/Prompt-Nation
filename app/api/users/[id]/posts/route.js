// Import the Prompt model and the connectToDB utility
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Define a GET request handler
export const GET = async (request, { params }) => {
    try {
        // Connect to the database
        await connectToDB();

        // Find prompts by the specified creator ID and populate the 'creator' field
        const prompts = await Prompt.find({ creator: params.id }).populate('creator');

        // Return a successful response with the prompts as JSON
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        // Handle errors and return an error response
        return new Response("Failed to fetch prompts by creator", { status: 500 });
    }
};
