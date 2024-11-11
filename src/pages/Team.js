import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/Card';

const Team = () => {
  const teamMembers = [
    { name: 'Kritagya Parajuli' },
    { name: 'Mohit Dwivedi'},
    { name: 'Srrishti'},
    { name: 'Sanya Chopra'},
    { name: 'Supervisor Dr. Deepti Mittal'}
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;