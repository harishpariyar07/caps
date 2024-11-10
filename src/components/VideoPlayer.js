import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const embedUrl = videoUrl.replace("youtu.be/", "www.youtube.com/embed/");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[300px] bg-gray-100 p-2">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <iframe
          width="560"
          height="315"
          src={embedUrl}
          title="Sign Language Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="no-referrer"
          className="max-w-full mx-auto"
        ></iframe>
      )}

      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
