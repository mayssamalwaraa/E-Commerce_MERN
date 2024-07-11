import productModel from "../models/productModel";

export const getAllProduct = async () => {
  return productModel.find();
};
export const seedInitialProduct = async () => {
  const products = [
    {
      title: "laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS94pUnPIS7fr7LGCjetEQwERZVQ0ftm46xvQ&s",
      price: 200,
      stock: 4,
    },
  ];
  const allProducts = await getAllProduct();
  if (allProducts.length === 0) {
    return productModel.insertMany(products);
  }
};
