import React, { useState, useEffect } from 'react';
import Button from '../components/Button';

const LearnSignLanguage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [mediaPath, setMediaPath] = useState(null);

  const categories = {
    Alphabets: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    Numbers: '0123456789'.split(''),
    Animals: ['Cat', 'Fish', 'Bird', 'Cow'],
    Seasons: ['Summer', 'Fall', 'Winter', 'Spring', 'Monsoon'],
    Pronouns: ['They', 'We', 'You'],
    Society: [
      'Attack', 'Bill', 'Death', 'Election', 'Energy', 'Gun', 'Marriage',
      'Medicine', 'Money', 'Newspaper', 'Peace', 'Race', 'Religion',
      'Team', 'Technology', 'War'
    ],
    Places: ['Court', 'Office', 'Park', 'School', 'University']
  };

  useEffect(() => {
    setError(null);
    setDebugInfo(null);
    setMediaPath(null);

    if (selectedCategory && selectedItem) {
      const isImageCategory = selectedCategory === 'Alphabets' || selectedCategory === 'Numbers';
      if (isImageCategory) {
        try {
          const path = require(`../assets/images/${selectedCategory.toLowerCase()}/${selectedItem}.png`);
          setMediaPath(path);
        } catch (error) {
          setError(`Image for ${selectedItem} not found`);
          setDebugInfo(`Attempted path: ../assets/images/${selectedCategory.toLowerCase()}/${selectedItem}.png`);
        }
      } else {
        // For videos, we'll try multiple formats
        const videoFormats = ['MOV', 'MP4'];
        let videoPath = null;
        for (const format of videoFormats) {
          try {
            videoPath = require(`../assets/videos/${selectedCategory}/${selectedItem}.${format}`);
            break;
          } catch (error) {
            console.log(`Failed to load ${format} video for ${selectedItem}`);
          }
        }
        if (videoPath) {
          setMediaPath(videoPath);
        } else {
          setError(`Video for ${selectedItem} not found`);
          setDebugInfo(`Attempted formats: ${videoFormats.join(', ')} in ../assets/videos/${selectedCategory}/${selectedItem}.[format]`);
        }
      }
    }
  }, [selectedCategory, selectedItem]);

  const renderContent = () => {
    if (!selectedCategory) return null;
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories[selectedCategory].map(item => (
          <Button key={item} onClick={() => setSelectedItem(item)} className="w-full">
            {item}
          </Button>
        ))}
      </div>
    );
  };

  const renderMedia = () => {
    if (!selectedItem || !mediaPath) return null;

    const isImageCategory = selectedCategory === 'Alphabets' || selectedCategory === 'Numbers';
    if (isImageCategory) {
      return (
        <div className="mt-4">
          <img 
            src={mediaPath}
            alt={`Sign for ${selectedItem}`}
            className="max-w-full h-auto mx-auto"
          />
        </div>
      );
    } else {
      return (
        <div className="mt-4">
          <video 
            controls 
            className="w-full max-w-2xl mx-auto" 
            onError={(e) => {
              console.error('Video error:', e);
              setError(`Error playing video for ${selectedItem}`);
              setDebugInfo(`Video path: ${mediaPath}. Error: ${e.target.error?.message || 'Unknown error'}`);
            }}
          >
            <source src={mediaPath} type="video/quicktime" />
            <source src={mediaPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Learn Sign Language</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {Object.keys(categories).map(category => (
          <Button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedItem(null);
            }}
            className={selectedCategory === category ? 'bg-blue-600' : 'bg-blue-500'}
          >
            {category}
          </Button>
        ))}
      </div>
      {renderContent()}
      {renderMedia()}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {debugInfo && <p className="text-gray-500 mt-2 text-sm">{debugInfo}</p>}
    </div>
  );
};

export default LearnSignLanguage;