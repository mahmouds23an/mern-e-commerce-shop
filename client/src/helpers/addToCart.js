import Swal from "sweetalert2";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch("http://localhost:6001/carts/add-toCart", {
    method: "post",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const responseData = await response.json();

  if (responseData.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product added to cart successfully",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  if (responseData.error) {
    Swal.fire({
      title:
        "Product already in cart or you need to log in before add any product",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });
  }

  return responseData;
};

export default addToCart;
