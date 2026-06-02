import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingSpinner } from './components/molecules';
import { Dashboard, SubjectDetail, Diary, Profile, NotFound } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subject/:id" element={<SubjectDetail />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
