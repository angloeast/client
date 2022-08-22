import React, { useState, useEffect } from "react";
const FileLoader = ({ file }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    if (!file) {
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = () => {
      setLoading(false);
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }, [file]);

  if (!file) {
    return null;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <img
      src={image}
      alt={file.name}
      className="object-contain max-w-full md:max-w-md"
    />
  );
};

export default FileLoader;
