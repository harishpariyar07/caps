import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

const Team = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'Project Lead' },
    { name: 'Jane Smith', role: 'UI/UX Designer' },
    { name: 'Mike Johnson', role: 'Full Stack Developer' },
    { name: 'Sarah Brown', role: 'Machine Learning Engineer' },
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
            <CardContent>
              <p>{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;