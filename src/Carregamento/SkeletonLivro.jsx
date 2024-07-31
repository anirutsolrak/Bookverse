import React from 'react';
import { Card, CardContent, Skeleton, Grid } from '@mui/material';

function SkeletonLivro() {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardContent>
          <Skeleton variant="rectangular" height={250} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SkeletonLivro;
