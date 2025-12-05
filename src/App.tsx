import { useState } from "react";
import ProductTable from "./features/product-page/productTable";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  status: string;
  description?: string;
  photoUrl?: string;
}

function App() {
  // simple pagination state
  const [page, setPage] = useState(1);
  const [loading] = useState(false);

  // temporary mock data
  const products: Product[] = [
    {
      id: "1",
      sku: "CUFF-BLK-01",
      name: "Black Lace Wrist Cuff",
      category: "Accessories",
      status: "In Stock",
      description: "Handmade lace wrist cuff. Soft cotton lace.",
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      sku: "CUFF-WHT-02",
      name: "White Frill Wrist Cuff",
      category: "Accessories",
      status: "In Production",
      description: "Frilled white cuffs, perfect for sweet lolita.",
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      sku: "SKIRT-PNK-01",
      name: "Pink Ruffle Skirt",
      category: "Bottoms",
      status: "Sold Out",
      description: "Cute ruffle skirt with satin bow trim.",
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Product Inventory</h1>

      <ProductTable
        products={products}
        page={page}
        setPage={setPage}
        loading={loading}
      />
    </div>
  );
}

export default App;
