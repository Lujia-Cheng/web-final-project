import React, {useEffect, useState} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import Button from "@mui/material/Button";

const Home = () => {

  const [products, setProducts] = useState([]);
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const fetchRandomProducts = async (count) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/products`);
      if (response.ok) {
        let data = await response.json();
        data = shuffleArray(data); // Shuffle the array
        setProducts(data.slice(0, count)); // Optionally limit the number of products
      } else {
        console.error('Failed to fetch products from server');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
      fetchRandomProducts(30).then(r => console.log(r));
    }, []
  )

  return (
    <div>
      <Grid container spacing={2} padding={10}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product._id}>
            <Card sx={{maxWidth: 345}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.image /*fixme cannot pass url, need to fetch first on server*/}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body1" >
                    ${product.single_selling_price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.inventory_amount} left in stock
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;