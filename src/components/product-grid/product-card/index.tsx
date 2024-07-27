import { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Modal, Box } from '@mui/material';
import { Product } from '../types';
import { useCart } from '../../../context';
import { CartItem } from '../../../context/types';
import { Dispatch } from 'react';

export const ProductCard = ({ product, setCartAlert } : { product: Product, setCartAlert: Dispatch<string>}) => {
  const [open, setOpen] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { addItemToCart } = useCart();

  const addToCartAndAlert = (product: Product) => {
    console.log(product);
    addItemToCart({...product, quantity: 1} as CartItem);
    setCartAlert(`${product.title} added to cart`);
  }

  return (
    <Card 
      sx={{
        maxWidth: 345,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        cursor: 'default',
        '&:hover': {
          transform: 'scale(1.03)',
          '& .content': {
            filter: 'blur(8px)',
          },
          '& .cardActions': {
            opacity: 1,
            visibility: 'visible',
          }
        }
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 250, objectFit: 'cover' }}
        image={product.image}
        alt={product.title}
        className="content"
      />
      <CardContent className="content">
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography variant="h6">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions className="cardActions" sx={{
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.3s, visibility 0.3s',
        gap: 2,
      }}>
        <Button variant="contained" color="primary" onClick={() => addToCartAndAlert(product)}>
          Add to Cart
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          More Details
        </Button>
      </CardActions>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          maxWidth: '90%',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          // border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
          borderRadius: '20px',
        }}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {product.title}
          </Typography>
          <CardMedia
            component="img"
            sx={{ height: 'auto', maxHeight: 300, width: '100%', objectFit: 'contain', mb: 2 }}
            image={product.image}
            alt={product.title}
          />
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => {
            addToCartAndAlert(product);
            handleClose();
          }} fullWidth>
            Add to Cart
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};
