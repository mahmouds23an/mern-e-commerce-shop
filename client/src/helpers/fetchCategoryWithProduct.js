const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(
    "http://localhost:6001/products/oneCategory-allProducts",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: category,
      }),
    }
  );
  const dataResponse = await response.json();
  return dataResponse;
};

export default fetchCategoryWiseProduct;
