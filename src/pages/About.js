import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">About Our Platform</h1>
      <Card>
        <CardHeader>
          <CardTitle>Sign Language Learning Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our sign language learning platform is designed to aid teachers in teaching deaf students. 
            It provides an interactive way to learn and practice sign language, benefiting both teachers and students.
          </p>
          <h3 className="font-bold mt-4 mb-2">How to use:</h3>
          <ul className="list-disc list-inside">
            <li>Browse through alphabets, numbers, animals, and seasons in the "Learn" section</li>
            <li>Practice your skills using the "Take Test" feature</li>
            <li>Upload or record videos to analyze your sign language</li>
            <li>Explore more about sign language and its importance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;