export const convertUrlToFile = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const blob = await response.blob();
    const fileName = getFileNameFromUrl(url);
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error("Error converting URL to File:", error);
    throw error;
  }
};

const getFileNameFromUrl = (url) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1];
};
