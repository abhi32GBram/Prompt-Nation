
// import Prompt from "@models/prompt";
// import { connectToDB } from "@utils/database";
// import { Response } from "next/dist/client/components/redirect";

// // GET Endpoint for Retrieving the Prompts from the User Profile 
// export const GET = async (request, { params }) => {
//     try {
//         await connectToDB();

//         const prompt = await Prompt.findById(params._id).populate('creator');
//         if (!prompt) {
//             return new Response("Prompt Not Found", { status: 404 });
//         }

//         return new Response(JSON.stringify(prompt), { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return new Response("Failed to fetch the prompt", { status: 500 });
//     }
// }

// // PATCH Endpoint for Updating/Editing the Prompt
// export const PATCH = async (request, { params }) => {
//     const { prompt, tag } = await request.json();

//     try {
//         await connectToDB();
//         const existingPrompt = await Prompt.findById(params._id);

//         if (!existingPrompt) {
//             return new Response("Prompt Not Found", { status: 404 });
//         }

//         // Validate and update the prompt with new data
//         if (prompt) {
//             existingPrompt.prompt = prompt;
//         }
//         if (tag) {
//             existingPrompt.tag = tag;
//         }

//         const updatedPrompt = await existingPrompt.save();

//         return new Response(JSON.stringify(updatedPrompt), { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return new Response("Failed to update the prompt", { status: 500 });
//     }
// }

// // DELETE Endpoint for Deleting the Prompt Card 
// export const DELETE = async (request, { params }) => {
//     try {
//         await connectToDB();
//         const deletedPrompt = await Prompt.findByIdAndRemove(params._id);

//         if (!deletedPrompt) {
//             return new Response("Prompt Not Found", { status: 404 });
//         }

//         return new Response("Prompt Deleted Successfully", { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return new Response("Failed to delete the prompt", { status: 500 });
//     }
// }

// // OLD ENDPOINTS ... ADDED VALDATION ON TOP 

// // import Prompt from "@models/prompt";
// // import { connectToDB } from "@utils/database";
// // import { Response } from "next/dist/client/components/redirect";

// // // GET Endpoint for Retrieving the Prompts from the User Profile 
// // export const GET = async (request, { params }) => {
// //     try {
// //         await connectToDB();

// //         // Find the prompt by its ID and populate the creator field
// //         const prompt = await Prompt.findById(params.id).populate('creator');
// //         if (!prompt) return new Response("OOP's Prompt Not Found", { status: 404 });

// //         // Return the prompt data as JSON with a 200 status code
// //         return new Response(JSON.stringify(prompt), { status: 200 });
// //     } catch (error) {
// //         // Return an error response with a 500 status code if there's an issue
// //         return new Response("Failed to fetch the prompt", { status: 500 });
// //     }
// // }

// // // PATCH Endpoint for Updating/Editing the Prompt
// // export const PATCH = async (request, { params }) => {
// //     const { prompt, tag } = await request.json();

// //     try {
// //         await connectToDB();
// //         const existingPrompt = await Prompt.findById(params.id);

// //         if (!existingPrompt) return new Response("Sorry, Prompt Not Found", { status: 404 });

// //         // Update the prompt with new data
// //         existingPrompt.prompt = prompt;
// //         existingPrompt.tag = tag;

// //         await existingPrompt.save();

// //         // Return the updated prompt data as JSON with a 200 status code
// //         return new Response(JSON.stringify(existingPrompt), { status: 200 });
// //     } catch (error) {
// //         // Return an error response with a 500 status code if there's an issue
// //         return new Response("Failed to update the prompt", { status: 500 });
// //     }
// // }

// // // DELETE Endpoint for Deleting the Prompt Card 
// // export const DELETE = async (request, { params }) => {
// //     try {
// //         await connectToDB();
        
// //         // Find and remove the prompt by its ID
// //         await Prompt.findByIdAndRemove(params.id);

// //         // Return a success message with a 200 status code
// //         return new Response("Prompt Deleted Successfully", { status: 200 });
// //     } catch (error) {
// //         // Return an error response with a 500 status code if there's an issue
// //         return new Response("OOP's Failed to Delete Prompt", { status: 500 });
// //     }
// // }

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};