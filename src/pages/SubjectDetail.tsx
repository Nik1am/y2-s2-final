import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Navigation } from '../components/organisms';
import { Card, Button } from '../components/atoms';
import { LoadingSpinner, ErrorMessage, Rating } from '../components/molecules';
import { apiService } from '../services/api';
import { formatDate } from '../utils/helpers';
import type { Subject, Lesson, Review } from '../types';

export const SubjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) throw new Error('Subject ID is required');

        const [subjectData, lessonsData, reviewsData] = await Promise.all([
          apiService.getSubjectById(id),
          apiService.getLessons(id),
          apiService.getReviews(id),
        ]);

        setSubject(subjectData);
        setLessons(lessonsData);
        setReviews(reviewsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch subject details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!subject) return <ErrorMessage message="Subject not found" />;

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0';

  return (
    <>
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button onClick={() => navigate('/')} variant="secondary" className="mb-6">
          ← Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subject Info */}
            <Card>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {subject.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Teacher: <span className="font-semibold">{subject.teacher}</span>
              </p>
              {subject.description && (
                <p className="text-gray-700 dark:text-gray-300">{subject.description}</p>
              )}
            </Card>

            {/* Lessons */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Recent Lessons
              </h2>
              <div className="space-y-3">
                {lessons.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No lessons yet</p>
                ) : (
                  lessons.map((lesson) => (
                    <div key={lesson.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{lesson.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(lesson.date)}
                      </p>
                      {lesson.homework && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                          📝 {lesson.homework}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Reviews */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Reviews & Ratings
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <Rating value={Math.round(parseFloat(avgRating))} readOnly />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {avgRating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">({reviews.length})</span>
                </div>
              </div>
              <div className="space-y-3">
                {reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {review.author}
                      </span>
                      <Rating value={review.rating} readOnly size="sm" />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {formatDate(review.date)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subject</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{subject.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{subject.teacher}</p>
                </div>
                {subject.grade && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Grade</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {subject.grade}
                    </p>
                  </div>
                )}
                <Button className="w-full">View Full Grades</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};
