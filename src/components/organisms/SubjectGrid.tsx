import React from 'react';
import { SubjectCard } from '../molecules';
import type { Subject } from '../../types';

interface SubjectGridProps {
  subjects: Subject[];
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {subjects.map((subject) => (
      <SubjectCard key={subject.id} subject={subject} />
    ))}
  </div>
);
