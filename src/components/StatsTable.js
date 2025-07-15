import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from '@mui/material';
import { getAllShortenedUrls } from '../utils/storage';
import Logger from '../logging/Logger';

function StatsTable() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    setUrls(getAllShortenedUrls());
    Logger.log('Viewed statistics page');
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener Statistics</Typography>
      {urls.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Expires At</TableCell>
                <TableCell>Clicks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((u) => (
                <React.Fragment key={u.shortcode}>
                  <TableRow>
                    <TableCell>
                      <a href={`/${u.shortcode}`}>{window.location.origin}/{u.shortcode}</a>
                    </TableCell>
                    <TableCell>{u.originalUrl}</TableCell>
                    <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{new Date(u.expiresAt).toLocaleString()}</TableCell>
                    <TableCell>{u.clicks.length}</TableCell>
                  </TableRow>
                  {u.clicks.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Box ml={4}>
                          <Typography variant="subtitle2">Click Details:</Typography>
                          <ul>
                            {u.clicks.map((click, idx) => (
                              <li key={idx}>
                                {new Date(click.timestamp).toLocaleString()} | Source: {click.source} | Location: {click.location}
                              </li>
                            ))}
                          </ul>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box mt={2} textAlign="center">
        <Button variant="outlined" href="/">Back to Shortener</Button>
      </Box>
    </Paper>
  );
}

export default StatsTable;
