import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Ingredients } from './pages/Ingredients';
import { Recipes } from './pages/Recipes';
import { Receipts } from './pages/Receipts';
import { Settings } from './pages/Settings';

function App() {
  // Register service worker for PWA
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;