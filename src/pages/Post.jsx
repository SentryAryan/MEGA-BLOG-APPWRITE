import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { deletePost, getPost } from '../appwrite/database'
import { deleteFile, getFilePreview } from '../appwrite/storage'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'

function Post() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const [post, setPost] = useState(null);
    const isAuthor = post && userData ? userData.$id === post.userId : false;

    const fetchPost = async () => {
        try {
            if (slug) {
                const post = await getPost(slug);
                if (post) {
                    setPost(post);
                } else {
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPost();
    }, [slug])

    const deletePostHandler = async () => {
        try {
            const status = await deletePost(post.$id);
            if (status) {
                await deleteFile(post.featuredImage);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return post ? (
        <div className='py-8'>
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={getFilePreview(post.featuredImage).url}
                        alt={post.title}
                        className='rounded-xl'
                    />

                    {isAuthor && (
                        <div className='absolute top-6 right-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button>
                                    Edit Post
                                </Button>
                            </Link>
                            <Button
                                onClick={deletePostHandler}
                                bgColor='bg-red-500'
                            >
                                Delete Post
                            </Button>
                        </div>
                    )}
                </div>
                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                </div>
                <div className='browser-css'>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post