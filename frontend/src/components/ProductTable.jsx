import axios from "axios";

function ProductTable({
  products,
  fetchProducts,
}) {

  // DELETE PRODUCT

  const deleteProduct = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/products/${id}`
    );

    fetchProducts();
  };


  // UPDATE PRODUCT

  const updateProduct = async (item) => {

  const productName = prompt(
    "Enter Product Name",
    item.productName
  );

  const brand = prompt(
    "Enter Brand",
    item.brand
  );

  const quantity = prompt(
    "Enter Quantity",
    item.quantity
  );

  const buyingPrice = prompt(
    "Enter Buying Price",
    item.buyingPrice
  );

  const sellingPrice = prompt(
    "Enter Selling Price",
    item.sellingPrice
  );

  const expiryDate = prompt(
    "Enter Expiry Date (YYYY-MM-DD)",
    item.expiryDate?.split("T")[0]
  );


  await axios.put(

    `http://localhost:5000/api/products/${item._id}`,

    {

      productName,

      brand,

      quantity,

      buyingPrice,

      sellingPrice,

      expiryDate,

    }

  );

  fetchProducts();
};



  return (

    <div className="card">

      <h2>INVENTORY</h2>

      <table>

        <thead>

          <tr>

            <th>Product</th>

            <th>Brand</th>

            <th>Quantity</th>

            <th>Expiry</th>

            <th>Update</th>

            <th>Delete</th>

          </tr>

        </thead>


        <tbody>

          {products.map((item) => (

            <tr key={item._id}>

              <td>
                {item.productName}
              </td>

              <td>
                {item.brand}
              </td>

              <td>
                {item.quantity}
              </td>

              <td>

                {new Date(
                  item.expiryDate
                ).toLocaleDateString()}

              </td>


              {/* UPDATE BUTTON */}

              <td>

                <button
                  onClick={() =>
                    updateProduct(item)
                  }
                >

                  Update

                </button>

              </td>


              {/* DELETE BUTTON */}

              <td>

                <button
                  onClick={() =>
                    deleteProduct(item._id)
                  }
                >

                  Delete

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;