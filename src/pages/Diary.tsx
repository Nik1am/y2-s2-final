import React, { useState } from 'react';
import { Header, Navigation } from '../components/organisms';
import { Card, Button, Input, Modal, Textarea } from '../components/atoms';
import { LoadingSpinner, ErrorMessage, Rating } from '../components/molecules';
import { useDiary } from '../hooks/useDiary';
import { formatDate } from '../utils/helpers';

export const Diary: React.FC = () => {
  const { entries, loading, error, addEntry } = useDiary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    subjectId: '',
    grade: 5,
    comment: '',
  });

  const handleAddEntry = async () => {
    if (!newEntry.subjectId) {
      alert('Please select a subject');
      return;
    }

    try {
      await addEntry({
        subjectId: newEntry.subjectId,
        grade: newEntry.grade,
        comment: newEntry.comment,
        date: new Date().toISOString().split('T')[0],
      });
      setIsModalOpen(false);
      setNewEntry({ subjectId: '', grade: 5, comment: '' });
    } catch (err) {
      alert('Failed to add entry');
    }
  };

  const groupedBySubject = entries.reduce(
    (acc, entry) => {
      if (!acc[entry.subjectId]) {
        acc[entry.subjectId] = [];
      }
      acc[entry.subjectId].push(entry);
      return acc;
    },
    {} as Record<string, typeof entries>
  );

  return (
    <>
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">School Diary</h2>
            <p className="text-gray-600 dark:text-gray-400">Your grades and lessons</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>+ Add Entry</Button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : entries.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No diary entries yet</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedBySubject).map(([subjectId, subjectEntries]) => (
              <Card key={subjectId}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Subject {subjectId}
                </h3>
                <div className="space-y-3">
                  {subjectEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-bold">
                              {entry.grade}
                            </span>
                            <Rating value={entry.grade} readOnly size="sm" />
                          </div>
                        </div>
                        {entry.comment && (
                          <p className="text-gray-700 dark:text-gray-300 mt-2">{entry.comment}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                        {formatDate(entry.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add Entry Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Diary Entry"
          footer={
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEntry}>Add Entry</Button>
            </div>
          }
        >
          <div className="space-y-4">
            <Input
              label="Subject ID"
              type="text"
              value={newEntry.subjectId}
              onChange={(e) => setNewEntry({ ...newEntry, subjectId: e.target.value })}
              placeholder="Enter subject ID"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setNewEntry({ ...newEntry, grade })}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      newEntry.grade === grade
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              label="Comment"
              value={newEntry.comment}
              onChange={(e) => setNewEntry({ ...newEntry, comment: e.target.value })}
              placeholder="Add a comment (optional)"
              rows={3}
            />
          </div>
        </Modal>
      </main>
    </>
  );
};
