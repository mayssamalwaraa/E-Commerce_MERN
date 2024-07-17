import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/system";

import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };
  const handleRemoveItem = (productId: string) => {
    removeItemFromCart(productId);
  };
  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <>
        {cartItems.length ? (
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
                <Typography variant="h4">My Cart</Typography>
                <Button variant="contained" onClick={clearCart}>
                  Clear Cart
                </Button>
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
                      <Button
                        variant="contained"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        RemoveItem
                      </Button>
                    </Box>
                  </Box>
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Button
                      onClick={() =>
                        handleQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <Button
                      onClick={() =>
                        handleQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Box>
              ))}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Typography variant="h3">
                Totla Amount : {totalAmount.toFixed(2)} $
              </Typography>
              <Button variant="contained" onClick={handleCheckOut}>
                {" "}
                go to Check out
              </Button>
            </Box>
          </>
        ) : (
          <Typography>THe cart is empty ,please add items first</Typography>
        )}
      </>
    </Container>
  );
};
export default CartPage;
