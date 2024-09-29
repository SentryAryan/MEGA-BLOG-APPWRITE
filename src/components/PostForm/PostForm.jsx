import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import RTE from '../RTE'
import Input from '../Input'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { uploadFile, deleteFile } from '../../appwrite/storage'
import { createPost, updatePost } from '../../appwrite/database'

// Schema for creating a new post
const createSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    slug: yup.string().required('Slug is required'),
    status: yup.string().required('Status is required'),
    image: yup.mixed().required('Image is required'),
})

// Schema for updating an existing post
const updateSchema = yup.object().shape({
    title: yup.string(),
    content: yup.string(),
    slug: yup.string(),
    status: yup.string(),
    image: yup.mixed(),
})

const PostForm = ({ post }) => {
    // Choose the appropriate schema based on whether we're editing an existing post
    const schema = post ? updateSchema : createSchema

    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || '',
            image: post?.featuredImage || null,
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const postFormSubmit = async (data) => {
        try {
            let dbPost;
            let featuredImage = post?.featuredImage;

            if (data.image) {
                const file = await uploadFile(data.image);
                featuredImage = file.$id;
                
                if (post) {
                    await deleteFile(post.featuredImage);
                }
            }

            if (post) {
                // Update existing post
                dbPost = await updatePost(post.slug, {
                    ...data,
                    featuredImage,
                    userId: userData.$id,
                });
            } else {
                // Create new post
                dbPost = await createPost({
                    ...data,
                    featuredImage,
                    userId: userData.$id,
                });
            }

            navigate(`/post/${dbPost.slug}`);
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    }

    const slugTransform = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    return (
        <div>PostForm</div>
    )
}

export default PostForm