import productModel from "../models/productModel";

export const getAllProduct = async () => {
  return productModel.find();
};
export const seedInitialProduct = async () => {
  try {
    const products = [
      {
        title: "Dell laptop",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTos0YvXMjH04jCStDXEYnsj4MG7YX8BDZPrQ&s",
        price: 200,
        stock: 2,
      },
      {
        title: "HP laptop",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsp0ZAEUGTbgNheqM0F5FyHrMBIUjJfKyEtw&s",
        price: 300,
        stock: 4,
      },
      {
        title: "Asus laptop",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS94pUnPIS7fr7LGCjetEQwERZVQ0ftm46xvQ&s",
        price: 450,
        stock: 3,
      },
    ];
    const allProducts = await getAllProduct();
    if (allProducts.length === 0) {
      return productModel.insertMany(products);
    }
  } catch (err) {
    console.error("canot see database", err);
  }
};
