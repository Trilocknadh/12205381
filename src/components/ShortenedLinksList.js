import React from 'react';
import { Box, Typography } from '@mui/material';

function ShortenedLinksList({ links }) {
  if (!links || links.length === 0) return null;
  return (
    <Box mt={4}>
      <Typography variant="h6">Shortened Links</Typography>
      <ul>
        {links.map(r => (
          <li key={r.shortcode}>
            <a href={`/${r.shortcode}`}>{window.location.origin}/{r.shortcode}</a> (expires: {new Date(r.expiresAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default ShortenedLinksList;
