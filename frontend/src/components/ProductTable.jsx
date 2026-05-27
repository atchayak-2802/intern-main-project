import axios from "axios";

function ProductTable({
  products,
  fetchProducts,
}) {

  const deleteProduct = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/products/${id}`
    );

    fetchProducts();
  };


  return (
    <div>

      <h2>Inventory</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Expiry</th>
            <th>Delete</th>
          </tr>
        </thead>


        <tbody>

          {products.map((item) => (

            <tr key={item._id}>

              <td>{item.productName}</td>

              <td>{item.brand}</td>

              <td>{item.quantity}</td>

              <td>
                {new Date(
                  item.expiryDate
                ).toLocaleDateString()}
              </td>

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
