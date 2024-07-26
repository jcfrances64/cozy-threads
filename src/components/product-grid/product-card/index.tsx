// import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useCart } from '../../../context';
import { Product } from '../types';
import { CartItem } from '../../../context/types';

export const ProductCard = ({ product }: { product: Product }) => {

  const { cartItems, addItemToCart } = useCart();

  return (
    <Card sx={{height: 500}}>
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={() => {
          addItemToCart({...product, quantity: 1} as CartItem)
          console.log(cartItems)
        }}>
          Add to Cart
        </Button>
    </CardActions>
  </Card>
  );
};

