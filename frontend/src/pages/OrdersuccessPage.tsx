import { Button, Container, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OrdersuccessPage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
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
      <CheckCircleOutline sx={{ color: "green", fontSize: "80px" }} />
      <Typography>success order</Typography>
      <Button variant="contained" onClick={handleHome}>
        {" "}
        go home{" "}
      </Button>
    </Container>
  );
};
export default OrdersuccessPage;
