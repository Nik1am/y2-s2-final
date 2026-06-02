import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../atoms';
import type { Subject } from '../../types';

interface SubjectCardProps {
  subject: Subject;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => (
  <Link to={`/subject/${subject.id}`}>
    <Card hoverable className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {subject.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Teacher: <span className="font-medium">{subject.teacher}</span>
          </p>
          {subject.description && (
            <p className="text-sm text-gray-700 dark:text-gray-300">{subject.description}</p>
          )}
        </div>
        {subject.grade && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
              Grade: {subject.grade}
            </span>
          </div>
        )}
      </div>
    </Card>
  </Link>
);
