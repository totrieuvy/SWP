import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react"; // import useRef
import React from "react";
import { Button, Flex } from "antd";

const CustomWebcam = ({ setImageData }) => {
  const webcamRef = useRef(null); // create a webcam reference
  const [imgSrc, setImgSrc] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setImageData(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };
  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={600}
          width={600}
          ref={webcamRef}
          mirrored={true}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
        />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <Button onClick={retake}>Retake photo</Button>
        ) : (
          <Button onClick={capture}>Capture photo</Button>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
