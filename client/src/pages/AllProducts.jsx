import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";

export default function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(
      "http://localhost:6001/products/get-products",
      { method: "get", credentials: "include" }
    );
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        {/* header */}
        <h2 className="font-bold text-lg">All products</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="border-2 hover:bg-black hover:text-white font-semibold py-1 px-3 rounded-full"
        >
          Upload product
        </button>
      </div>
      {/* all products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-200px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchAllProduct={fetchAllProduct}
            />
          );
        })}
      </div>
      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
}
