import { Container, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

export const OrderConfirmation = () => {

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={1} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
        <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
          Thank You for Your Order!
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Your order number is #123456. We have emailed your order confirmation, and will
          send you an update when your order has shipped.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} component={Link} to="/">
          Continue Shopping
        </Button>
      </Paper>
    </Container>
  );
};
