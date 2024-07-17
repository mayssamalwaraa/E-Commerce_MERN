import { Container, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../context/Auth/authContect";

const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();
  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
        gap: 2,
      }}
    >
      <Typography>My Orders</Typography>
      <Box>
        {myOrders.map(({ address, orderItems, total }) => (
          <Box
            sx={{ border: 1, borderColor: "gray", borderRadius: 2, padding: 1 }}
          >
            <Typography>address :{address}</Typography>
            <Typography>orderItems :{orderItems.length}</Typography>
            <Typography>total :{total}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
export default MyOrdersPage;
