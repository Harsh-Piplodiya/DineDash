import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; // this is the in-built File System of node.js

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // file has been uploaded successfully
        // console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteFromCloudinary = async (publicFilePath) => {
    try {
        const result = await cloudinary.uploader.destroy(publicFilePath);
        console.log(result);
        if (result.result === 'ok') {
          console.log('File deleted successfully.');
        } else {
          console.log('Failed to delete file:', result.result);
        }
      } catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
      }
}

export { uploadOnCloudinary, deleteFromCloudinary };