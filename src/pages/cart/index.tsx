import { Box, Button, Container, Grid, Typography, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useCart } from '../../context';

const Root = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const ProductImage = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '8px',
});

const ProductDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const ProductName = styled(Typography)({
  fontWeight: 'bold',
});

const ProductPrice = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const QuantityControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const TotalPrice = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
});

const Summary = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '8px',
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const CartPage = () => {

  const { cartItems, incrementItem, decrementItem } = useCart();

  const handleAddQuantity = (id: number) => {
    incrementItem(id);
  };

  const handleRemoveQuantity = (id: number) => {
    decrementItem(id);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Paper key={item.id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <ProductImage src={item.image} alt={item.title} />
                </Grid>
                <Grid item xs={6}>
                  <ProductDetails>
                    <ProductName variant="h6">
                      {item.title}
                    </ProductName>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                    <ProductPrice variant="body1">
                      ${item.price.toFixed(2)}
                    </ProductPrice>
                  </ProductDetails>
                </Grid>
                <Grid item xs={3}>
                  <QuantityControls>
                    <IconButton onClick={() => handleRemoveQuantity(item.id)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ margin: '0 8px' }}>
                      {item.quantity}
                    </Typography>
                    <IconButton onClick={() => handleAddQuantity(item.id)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </QuantityControls>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Summary elevation={3}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total: <TotalPrice>${total.toFixed(2)}</TotalPrice>
            </Typography>
            <CheckoutButton variant="contained" color="primary" fullWidth href="/checkout">
              Proceed to Checkout
            </CheckoutButton>
          </Summary>
        </Grid>
      </Grid>
    </Root>
  );
};

