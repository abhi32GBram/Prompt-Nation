// Import necessary modules
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

// UserProfile component for displaying a user's profile
const UserProfile = ({ params }) => {
    // Get the search parameters from the URL
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    // State to store user's posts
    const [userPosts, setUserPosts] = useState([]);

    // Fetch user's posts when the component mounts or when the user ID changes
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Make a GET request to fetch user's posts by their ID
                const response = await fetch(`/api/users/${params?.id}/posts`);
                const data = await response.json();
                setUserPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        // Check if a user ID is available before fetching posts
        if (params?.id) {
            fetchPosts();
        }
    }, [params.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPosts}
        />
    );
};

export default UserProfile;
