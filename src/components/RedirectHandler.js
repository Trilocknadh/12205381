import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShortenedUrlByCode, updateClicksForShortcode } from '../utils/storage';
import Logger from '../logging/Logger';
import { getLocation } from '../utils/geolocation';
import { Box, Typography, CircularProgress } from '@mui/material';

function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlObj = getShortenedUrlByCode(shortcode);
    if (!urlObj) {
      Logger.log('Redirection failed: shortcode not found', { shortcode });
      navigate('/', { replace: true, state: { error: 'Shortcode not found or expired.' } });
      return;
    }
    const now = new Date();
    if (new Date(urlObj.expiresAt) < now) {
      Logger.log('Redirection failed: shortcode expired', { shortcode });
      navigate('/', { replace: true, state: { error: 'Shortcode expired.' } });
      return;
    }
    // Log click
    getLocation().then(location => {
      updateClicksForShortcode(shortcode, {
        timestamp: now.toISOString(),
        source: document.referrer || 'direct',
        location: location || 'unknown',
      });
      Logger.log('Short URL clicked', { shortcode, location });
      window.location.href = urlObj.originalUrl;
    });
  }, [shortcode, navigate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
      <CircularProgress />
      <Typography variant="h6" mt={2}>Redirecting...</Typography>
    </Box>
  );
}

export default RedirectHandler;
