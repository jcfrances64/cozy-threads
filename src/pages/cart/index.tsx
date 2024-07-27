import { Box, Button, Container, Grid, Typography, Paper, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useCart } from '../../context';
import { loadStripe } from '@stripe/stripe-js';
import { CartItem } from '../../context/types';

const stripePromise = loadStripe("pk_test_51PflrdF6vxTa5nhc5Df3BaQ31KldTy82Vf4CGo2ExQGidAVftrUyeBVfk04LFmn3vBSOJtUAaGzRA9lBj4h9XW3c00EifKOKmO");

const stripeCheckout = async (cartItems: CartItem[]) => {
  const stripe = await stripePromise;
  const response = await fetch("https://7agkly2hs1.execute-api.us-east-1.amazonaws.com/dev/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({items: cartItems}),
  });

  const session = await response.json();
  console.log(session)

  const result = await stripe?.redirectToCheckout({
    sessionId: session.sessionId,
  })

  if(result?.error) {
    console.log(result.error);
  }
}

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
    <Container sx={{ marginTop: 16 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Paper key={item.id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                    <IconButton onClick={() => handleRemoveQuantity(item.id)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ margin: '0 8px' }}>
                      {item.quantity}
                    </Typography>
                    <IconButton onClick={() => handleAddQuantity(item.id)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total: <strong style={{ fontSize: '1.5rem' }}>${total.toFixed(2)}</strong>
            </Typography>
            <Button variant="contained" color="primary" fullWidth onClick={() => stripeCheckout(cartItems)}>
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
