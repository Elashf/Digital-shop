"use client";

import { useState } from "react";
import Search from "../../modules/Search";
import LatestProducts from "./LatestProducts";

type Props = {
  products: any[];
};

function ProductsSection({ products }: Props) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <>
    <Search setProducts={setFilteredProducts}/>
  
   <LatestProducts products={filteredProducts}/>
    </>
  );
}

export default ProductsSection;