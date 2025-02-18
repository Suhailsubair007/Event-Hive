import axios from "axios";

export const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "event_hive");
    formData.append("cloud_name", "dupo7yv88"); 
    
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dupo7yv88/image/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
