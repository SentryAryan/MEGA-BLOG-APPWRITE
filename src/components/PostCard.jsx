import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getFilePreview } from "../appwrite/storage";

function PostCard({ $id, title, featuredImage, }) {

  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  async function getImagePreview() {
    try {
      const url = await getFilePreview(featuredImage);
      setFilePreviewUrl(url);
    } catch (error) {
      console.error("Error getting file preview:", error);
    }
  }

  useEffect(() => {
    getImagePreview();
  }, []);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={filePreviewUrl} alt={title} />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  )

}