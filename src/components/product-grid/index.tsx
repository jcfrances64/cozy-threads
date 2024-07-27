import { Grid, Box } from '@mui/material';
import { ProductCard } from './product-card';
import { resp } from './products';
import { AddToCartAlert } from './alert';
import { useState } from 'react';

export const ProductGrid = () => {
  
  const [cartAlert, setCartAlert] = useState('');

  return (
    <Box width='80vw' sx={{margin: 'auto'}}>
      <Grid container spacing={3} justifyContent='center' alignItems='stretch' sx={{ pt: 10, px: 3 }}>
        {resp.products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} setCartAlert={setCartAlert}/>
          </Grid>
        ))}
      </Grid>
      <AddToCartAlert message={cartAlert} duration={3000} />
    </Box>
  );
}
