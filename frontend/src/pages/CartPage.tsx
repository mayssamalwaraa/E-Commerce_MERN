import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/authContect";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const { token } = useAuth();
  const { cartItems, totalAmount } = useCart();
  const [error, setError] = useState("");

  return (
    <Container sx={{ mt: 2 }}>
      <>
        <Typography variant="h4">My Cart</Typography>
        {cartItems.map((item) => (
          <Box>{item.title}</Box>
        ))}
      </>
    </Container>
  );
};
export default CartPage;
