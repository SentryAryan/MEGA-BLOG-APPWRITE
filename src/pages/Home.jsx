import React, { useState, useEffect } from 'react'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../appwrite/database'

function Home() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const posts = await getAllPosts([]);
            if (posts) {
                setPosts(posts?.documents);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to see posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home