export const convertFileToImg = (fileOrBlob) => {
  return new Promise((resolve, reject) => {
    if (!(fileOrBlob instanceof File) && !(fileOrBlob instanceof Blob)) {
      reject(new Error("Invalid input: Expected File or Blob object"));
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(fileOrBlob);
  });
};
