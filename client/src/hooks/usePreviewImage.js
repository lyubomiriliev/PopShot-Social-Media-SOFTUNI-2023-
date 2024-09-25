import { useState } from "react";

const usePreviewImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChange = (e, isCover = false) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        alert("Error: File size must be less than 2MB");
        if (isCover) {
          setSelectedCoverFile(null);
        } else {
          setSelectedFile(null);
        }
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      alert("Error: Please select an image file.");
      if (isCover) {
        setSelectedCoverFile(null);
      } else {
        setSelectedFile(null);
      }
    }
  };

  return {
    selectedFile,
    selectedCoverFile,
    handleImageChange,
    setSelectedFile,
    setSelectedCoverFile,
  };
};

export default usePreviewImage;
