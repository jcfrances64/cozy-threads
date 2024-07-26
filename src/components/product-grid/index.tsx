import { Grid } from '@mui/material';
import { ProductCard } from './product-card';
import { resp } from './products';

export const ProductGrid = () => (
    <Grid container spacing={2} justifyContent="center" alignItems="center" paddingLeft={25} paddingRight={25}>
      {resp.products.map((product) => (
        <Grid item xs={8} sm={4} md={3} lg={3} key={product.id}>
          <ProductCard 
            product={product}
          />
        </Grid>
      ))}
    </Grid>
)