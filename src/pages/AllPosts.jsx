import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../appwrite/database'
function AllPosts() {
    const [posts, setPosts] = useState([])
    
    const fetchPosts = async () => {
        try {
            const posts = await getAllPosts([])
            if (posts) {
                setPosts(posts?.documents)
            }
        } catch (error) {
            console.error("Error fetching posts:", error)
        }
    }
    
    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap gap-4'>
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

export default AllPosts