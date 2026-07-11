"use client";

import { useEffect, useState } from "react";
import Search from "../../modules/Search";
import LatestProducts from "./LatestProducts";

type Props = {
  products: any[];
  currentPage:number;
  totalPages:number
};

function ProductsSection({ products ,currentPage ,totalPages}: Props) {
  const [filteredProducts, setFilteredProducts] = useState(products);
useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  return (
    <>
    <Search setProducts={setFilteredProducts}/>
  
   <LatestProducts
    products={filteredProducts}
    currentPage={currentPage}
  totalPages={totalPages}

    />
    </>
  );
}

export default ProductsSection;