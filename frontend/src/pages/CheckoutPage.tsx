import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useRef } from "react";
import { Box } from "@mui/system";

import { useCart } from "../context/Cart/CartContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);

  return (
    <Container fixed sx={{ mt: 2 }}>
      <>
        <Box display={"flex"} flexDirection="column" gap={4}>
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-between"}
            sx={{
              mb: 4,
            }}
          >
            <Typography variant="h4">Checkout</Typography>
          </Box>

          {cartItems.map((item) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                borderBottom: 2,
                borderColor: "#f5f5f5",
              }}
            >
              <Box
                display={"flex"}
                flexDirection="row"
                alignItems={"center"}
                gap={2}
              >
                <img src={item.image} width={50} />
                <Box>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography>
                    {item.quantity}X{item.unitPrice}$
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
          <TextField inputRef={addressRef} label="Address" name="address" />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h3">
            Totla Amount : {totalAmount.toFixed(2)} $
          </Typography>
        </Box>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Pay now
        </Button>
      </>
    </Container>
  );
};
export default CheckoutPage;
