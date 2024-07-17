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
  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   const fetchCart = async () => {
  //     const response = await fetch(`${BASE_URL}/cart`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       setError("Faild to fetch user cart ,Please Try Again");
  //     }
  //     const dataCart = await response.json();
  //     setCart(dataCart);
  //   };
  //   fetchCart();
  // }, [token]);

  return (
    <Container sx={{ mt: 2 }}>
      <>
        <Typography variant="h4">My Cart</Typography>
        {cartItems.map((item) => {
          <Box>{item.title}</Box>;
        })}
      </>
    </Container>
  );
};
export default CartPage;
