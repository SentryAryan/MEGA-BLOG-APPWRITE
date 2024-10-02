import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import RTE from '../RTE'
import { createPost, updatePost } from '../../appwrite/database'
import { uploadFile, deleteFile, getFilePreview } from '../../appwrite/storage'
import { useCallback, useEffect } from 'react'

function PostForm({ post }) {

    console.log("PostForm.jsx")
    const { register, handleSubmit, formState: { errors }, getValues, watch, setValue, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const postFormSubmit = async (data) => {
        let dbPost;
        try {
            if (post) {
                // Updating an existing post
                let featuredImage = post.featuredImage; // Keep the existing featuredImage by default

                if (data.image[0]) {
                    // If a new image is uploaded
                    const file = await uploadFile(data.image[0]);
                    await deleteFile(post.featuredImage);
                    featuredImage = file.$id;
                }

                dbPost = await updatePost(post.$id, {
                    ...data,
                    featuredImage,
                });
            } else {
                // Creating a new post
                const file = await uploadFile(data.image[0]);
                dbPost = await createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id
                });
            }

            navigate(`/post/${dbPost.$id}`);
        } catch (error) {
            console.error("Error submitting post:", error);
            // Handle error (e.g., show error message to user)
            return;
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform]);

    return (
        <form onSubmit={handleSubmit(postFormSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title:"
                    placeholder="Enter title here"
                    className="mb-4"
                    {...register("title", { required: 'Title is required' })}
                    errors={errors}
                />
                <p className="text-red-600 font-bold">
                    {errors.title?.message}
                </p>

                <Controller
                    name="slug"
                    control={control}
                    rules={{ required: 'Slug is required' }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Input
                            label="Slug:"
                            placeholder="Enter slug here"
                            className="mb-4"
                            value={value}
                            onChange={(e) => {
                                const transformedSlug = slugTransform(e.target.value);
                                onChange(transformedSlug);
                            }}
                            onBlur={onBlur}
                            ref={ref}
                            errors={errors}
                        />
                    )}
                />
                <p className="text-red-600 font-bold">
                    {errors.slug?.message}
                </p>

                <RTE
                    label="Content:"
                    name="content"
                    placeholder="Enter content here"
                    defaultValue={getValues("content")}
                    className="mb-4"
                    control={control}
                    rules={{ required: 'Content is required' }}
                    errors={errors}
                />
                <p className="text-red-600 font-bold">
                    {errors.content?.message}
                </p>
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image:"
                    type="file"
                    accept="image/*"
                    className="mb-4"
                    {...register("image", { required: 'Image is required' })}
                    errors={errors}
                />
                <p className="text-red-600 font-bold">
                    {errors.image?.message}
                </p>

                {post && (
                    <div className='w-full mb-4'>
                        <img
                            src={getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    label="Status:"
                    options={['active', 'inactive']}
                    className="mb-4"
                    {...register("status")}
                    errors={errors}
                />

                <Button type="submit" className="w-full">
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm


