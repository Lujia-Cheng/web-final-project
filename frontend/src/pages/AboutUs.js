import React from 'react';
import {Container, Paper, Typography} from '@mui/material';

function AboutUs() {
  return (
    <Container maxWidth="lg" sx={{padding: 2}}>
      <Paper sx={{padding: 2}}>
        <Typography variant="h5">About Us</Typography>
        <Typography variant="body1" sx={{mb: 4}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Massa eget egestas purus viverra. Aliquet enim tortor at auctor urna nunc. Pulvinar
          mattis nunc sed blandit libero volutpat sed cras ornare. Suspendisse potenti nullam ac tortor vitae purus.
          Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Dolor sit amet
          consectetur adipiscing elit. Sit amet mauris commodo quis. Morbi tristique senectus et netus et malesuada.
          Sem et tortor consequat id porta nibh venenatis. Morbi tincidunt augue interdum velit euismod in. Donec
          ultrices tincidunt arcu non. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Auctor neque vitae
          tempus quam pellentesque nec nam aliquam. Vulputate enim nulla aliquet porttitor lacus luctus accumsan
          tortor.
        </Typography>
        <Typography variant="h5" gutterBottom>Our Mission</Typography>
        <Typography variant="body1" sx={{mb: 4}}>
          Adipiscing elit duis tristique sollicitudin nibh. Sit amet aliquam id diam maecenas ultricies mi eget
          mauris. Sed tempus urna et pharetra pharetra massa massa ultricies. In nulla posuere sollicitudin aliquam
          ultrices sagittis orci. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Nibh tellus
          molestie nunc non blandit massa enim nec. Nunc aliquet bibendum enim facilisis gravida neque convallis.
          Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Nunc sed velit dignissim
          sodales. Velit euismod in pellentesque massa placerat duis ultricies. Tempus iaculis urna id volutpat
          lacus. Sed turpis tincidunt id aliquet risus feugiat. Cras sed felis eget velit aliquet sagittis. Lectus
          urna duis convallis convallis.
        </Typography>

      </Paper>
    </Container>
  );
}

export default AboutUs;