import React, { useState } from 'react';
import Button from '../components/Button';
import VideoPlayer from '../components/VideoPlayer';

const LearnSignLanguage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [mediaPath, setMediaPath] = useState(null);

  const categories = {
    Alphabets: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({ name: letter, url: '' })),
    Numbers: '0123456789'.split('').map(number => ({ name: number, url: '' })),
    Animals: [
      { name: 'Cat', url: 'https://youtu.be/GKo3uWVU07c' },
      { name: 'Fish', url: 'https://youtu.be/X12q2GGCFeM' },
      { name: 'Bird', url: 'https://youtu.be/WASZjTIrMgk' },
      { name: 'Cow', url: 'https://youtu.be/WOv12Dh4VVg' }
    ],
    Pronouns: [
      { name: 'They', url: 'https://youtu.be/f_nF2iDtW-o' },
      { name: 'We', url: 'https://youtu.be/jaiUL2Ml8q8' },
      { name: 'You', url: 'https://youtu.be/2ZYkkwdKlzg' }
    ],
    Colors: [
      { name: 'Black', url: 'https://youtu.be/VQpFy5hNpXA' },
      { name: 'Blue', url: 'https://youtu.be/agLjMRikd8k' },
      { name: 'Brown', url: 'https://youtu.be/c8czReFeUTQ' },
    ],
    Greetings: [
      { name: 'Bye', url: 'https://youtu.be/-2LEDEMR2cg' },
      { name: 'Hello', url: 'https://youtu.be/hcgzJ_6gWZQ' },
      { name: 'How are you', url: 'https://youtu.be/lcuM-sYvNIo' },
      { name: 'Sorry', url: 'https://youtu.be/MfBycNyBR_Q' },
      { name: 'Thank you', url: 'https://youtu.be/tsksXcqXFms' }
    ],
    Others: [
      { name: 'Car', url: 'https://youtu.be/U5Vy3LfeA44' },
      { name: 'Chair', url: 'https://youtu.be/otmfm91yT1g' },
      { name: 'Table', url: 'https://youtu.be/gz1e7eFYu4A' },
    ]
  };

  const renderContent = () => {
    if (!selectedCategory) return null;
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories[selectedCategory].map(item => (
          <Button key={item.name} onClick={() => handleItemClick(item)} className="w-full">
            {item.name}
          </Button>
        ))}
      </div>
    );
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item.url) {
      setMediaPath(item.url);
    } else {
      setMediaPath(`/assests/images/${selectedCategory.toLowerCase()}/${item.name}.png`);
    }
    setError(null);
  };

  const renderMedia = () => {
    if (!selectedItem || !mediaPath) return null;
    const isImageCategory = selectedCategory === 'Alphabets' || selectedCategory === 'Numbers';
    if (isImageCategory) {
      return (
        <div className="mt-4">
          <img 
            src={`/assets/images/${selectedCategory.toLowerCase()}/${selectedItem.name}.png`}
            alt={`Sign for ${selectedItem.name}`}
            className="max-w-full h-auto mx-auto"
          />
        </div>
      );
    } else {
      return (
        <VideoPlayer videoUrl={mediaPath} />
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
              setError(null);
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
    </div>
  );
};

export default LearnSignLanguage;
