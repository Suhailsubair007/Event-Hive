import QRCode from "qrcode";
import { uploadImageToCloudinary } from "./imageUpload";
export const generateAndUploadQR = async (
  value: string
): Promise<string | null> => {
  try {
    const qrDataUrl = await QRCode.toDataURL(value);

    const response = await fetch(qrDataUrl);
    const blob = await response.blob();
    const file = new File([blob], "qrcode.png", { type: "image/png" });

    return await uploadImageToCloudinary(file);
  } catch (error) {
    console.error("Error generating or uploading QR code:", error);
    return null;
  }
};
