import React, { useState } from 'react';
import { Box, Typography, Button, Grid, TextField, Paper, Snackbar, Alert } from '@mui/material';
import { generateShortcode, isValidUrl, isValidShortcode } from '../utils/validation';
import { saveShortenedUrl, getAllShortenedUrls } from '../utils/storage';
import Logger from '../logging/Logger';

const MAX_URLS = 5;

const defaultUrlEntry = { url: '', validity: '', shortcode: '', error: '' };

function ShortenerForm() {
  const [entries, setEntries] = useState([{ ...defaultUrlEntry }]);
  const [results, setResults] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const handleChange = (idx, field, value) => {
    const newEntries = entries.map((entry, i) =>
      i === idx ? { ...entry, [field]: value, error: '' } : entry
    );
    setEntries(newEntries);
  };

  const validateEntry = (entry) => {
    if (!entry.url) return 'URL is required';
    if (!isValidUrl(entry.url)) return 'Invalid URL format';
    if (entry.validity && (!/^\d+$/.test(entry.validity) || parseInt(entry.validity) <= 0)) return 'Validity must be a positive integer';
    if (entry.shortcode) {
      if (!isValidShortcode(entry.shortcode)) return 'Shortcode must be alphanumeric (4-12 chars)';
      const allShorts = getAllShortenedUrls();
      if (allShorts.some(u => u.shortcode === entry.shortcode)) return 'Shortcode already in use';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const newEntries = entries.map((entry) => {
      const error = validateEntry(entry);
      if (error) hasError = true;
      return { ...entry, error };
    });
    setEntries(newEntries);
    if (hasError) return;

    const now = new Date();
    const newResults = [];
    entries.forEach(entry => {
      if (!entry.url) return;
      let shortcode = entry.shortcode || generateShortcode();
      // Ensure uniqueness
      let allShorts = getAllShortenedUrls();
      while (allShorts.some(u => u.shortcode === shortcode)) {
        shortcode = generateShortcode();
      }
      const validity = entry.validity ? parseInt(entry.validity) : 30;
      const createdAt = now.toISOString();
      const expiresAt = new Date(now.getTime() + validity * 60000).toISOString();
      const urlObj = {
        originalUrl: entry.url,
        shortcode,
        createdAt,
        expiresAt,
        clicks: [],
      };
      saveShortenedUrl(urlObj);
      newResults.push(urlObj);
      Logger.log('Shortened URL created', { shortcode, originalUrl: entry.url });
    });
    setResults(newResults);
    setSnackbar({ open: true, message: 'Shortened URLs created successfully!', severity: 'success' });
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {entries.map((entry, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} md={6}>
                <TextField
                  label={`Original URL #${idx + 1}`}
                  value={entry.url}
                  onChange={e => handleChange(idx, 'url', e.target.value)}
                  fullWidth
                  error={!!entry.error}
                  helperText={entry.error}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Validity (min)"
                  value={entry.validity}
                  onChange={e => handleChange(idx, 'validity', e.target.value)}
                  fullWidth
                  type="number"
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Custom Shortcode"
                  value={entry.shortcode}
                  onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                {entries.length > 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setEntries(entries.filter((_, i) => i !== idx))}
                    sx={{ minWidth: 0, px: 1 }}
                  >
                    Remove
                  </Button>
                )}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Box mt={2} textAlign="left">
          {entries.length < MAX_URLS && (
            <Button
              variant="outlined"
              onClick={() => setEntries([...entries, { ...defaultUrlEntry }])}
              sx={{ mb: 2 }}
            >
              Add another URL
            </Button>
          )}
        </Box>
        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" type="submit">Shorten URLs</Button>
        </Box>
      </form>
      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Shortened Links</Typography>
          <ul>
            {results.map(r => (
              <li key={r.shortcode}>
                <a href={`/${r.shortcode}`}>{window.location.origin}/{r.shortcode}</a> (expires: {new Date(r.expiresAt).toLocaleString()})
              </li>
            ))}
          </ul>
        </Box>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
}

export default ShortenerForm;
