import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getFilePreview } from "../appwrite/storage";

function PostCard({ post }) {
  const { $id, title, featuredImage } = post;
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  useEffect(() => {
    // Get the file preview URL directly
    const previewUrl = getFilePreview(featuredImage);
    setFilePreviewUrl(previewUrl);
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {filePreviewUrl && <img src={filePreviewUrl} alt={title} />}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard;