import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { blue, green } from '@mui/material/colors';

const App = () => {
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProductData(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        {productData.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: blue[50] }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography color="textSecondary">
                  Category: {product.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(product)}
                  sx={{ backgroundColor: green[500], color: 'white' }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div>
        <Typography variant="h4" component="div" mt={4}>
          Cart
        </Typography>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default App;
