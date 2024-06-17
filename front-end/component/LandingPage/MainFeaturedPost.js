import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';


function MainFeaturedPost(props) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
        height: '400px',
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none'}} src={post.image} alt={post.imageText}/>}
        
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;
