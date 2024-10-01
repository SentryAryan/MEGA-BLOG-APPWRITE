import React from 'react'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../appwrite/database'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getAllPosts()
                setPosts(posts.documents)
            } catch (error) {
                console.error("Error fetching posts:", error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <div className='py-8'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default Home