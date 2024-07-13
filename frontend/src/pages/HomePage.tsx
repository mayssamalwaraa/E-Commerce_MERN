import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { BASE_URL } from "../constants/baseURL";
import { Product } from "../types/Product";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(true);
      }
    };

    fetchProductsData();
  }, []);
  if (error) {
    return <Box>something went wrong</Box>;
  }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item md={4}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default HomePage;
