"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Laptop");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const company = "AMZ";
    const top = 10;
    const minPrice = 1;
    const maxPrice = 500000;
    try {
      const response = await axios.get(
        `http://localhost:3000/categories/${category}/products`,
        {
          params: {
            company,
            top,
            minPrice,
            maxPrice,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-5">
      <h1 className="text-2xl font-bold">Top Products</h1>
      <Input
        placeholder="Search by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Button onClick={fetchProducts} disabled={loading} className="mt-4">
        {loading ? "Loading..." : "Search"}
      </Button>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <p>Price: ${product.price}</p>
                <p>Company: {product.company}</p>
                <p>Rating: {product.rating}</p>
              </CardDescription>
            </CardContent>
            <CardFooter />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
