import React from 'react';
import ImageConverter from './components/ImageConverter';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <ErrorBoundary>
        <ImageConverter />
      </ErrorBoundary>
    </div>
  );
}

export default App;