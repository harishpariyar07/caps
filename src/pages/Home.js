import React from 'react';
import { Link } from 'react-router-dom';
import { Book, TestTube, Info, Users } from 'lucide-react';

const Home = () => {
  const sections = [
    { name: 'Learn Sign Language', icon: Book, color: 'bg-blue-500', link: '/learn' },
    { name: 'Take Test', icon: TestTube, color: 'bg-green-500', link: '/test' },
    { name: 'About', icon: Info, color: 'bg-yellow-500', link: '/about' },
    { name: 'Team', icon: Users, color: 'bg-purple-500', link: '/team' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Sign Language Learning Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <Link key={section.name} to={section.link} className="no-underline">
            <div className={`${section.color} hover:opacity-90 transition-opacity rounded-lg shadow-md p-6`}>
              <div className="flex items-center justify-center text-white">
                <section.icon className="mr-2 h-8 w-8" />
                <span className="text-xl font-semibold">{section.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;