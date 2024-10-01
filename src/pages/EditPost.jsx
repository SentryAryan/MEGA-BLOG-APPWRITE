import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import PostForm from '../components/PostForm/PostForm'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost } from '../appwrite/database'

function EditPost() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    const post = await getPost(slug)
                    setPost(post)
                } else {
                    navigate('/')
                }
            } catch (error) {
                console.error("Error fetching post:", error)
            }
        }
        fetchPost()
    }, [slug])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost