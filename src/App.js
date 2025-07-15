import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import ShortenerForm from './components/ShortenerForm';
import StatsTable from './components/StatsTable';
import RedirectHandler from './components/RedirectHandler';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/stats" element={<StatsTable />} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
