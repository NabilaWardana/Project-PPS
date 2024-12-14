import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, Spinner, Alert, Modal } from "react-bootstrap";
import axios from "axios";

const Product = () => {
  const [activePage, setActivePage] = useState("productOverview");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");

  const API_BASE_URL = "http://localhost:3000/api"; 

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch categories.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Submit form for adding or updating products
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
    });
    if (form.image) {
        formData.append("image", form.image);
    }

    try {
        if (activePage === "addProduct") {
            await axios.post(`${API_BASE_URL}/products`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product added successfully!");
        } else if (activePage === "editProduct" && form.product_id) {
            await axios.patch(`${API_BASE_URL}/products/${form.product_id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product updated successfully!");
        }
        fetchProducts(); 
        setForm({}); 
        setActivePage("productOverview");
    } catch (err) {
        setError(err.response?.data?.message || "Failed to process request.");
    } finally {
        setLoading(false);
    }
};


  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search product by name
  const handleSearchProductChange = (e) => {
    setSearchProduct(e.target.value);
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle opening modal with selected product
  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Handle Edit product
  const handleEditProduct = (product) => {
    setForm(product); // Pre-fill form with product details
    setActivePage("editProduct"); // Stay on the same page (edit the product)
  };

  // Handle product selection for edit
  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(
      (product) => product.product_id === parseInt(selectedProductId)
    );
    setForm(selectedProduct); 
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light" style={{ minHeight: "100vh" }}>
          <h5 className="p-3">HeyJuice Admin</h5>
          <ul className="list-unstyled p-3">
            <li className="mb-3">
              <a
                href="#"
                onClick={() => setActivePage("productOverview")}
                className={`text-decoration-none ${activePage === "productOverview" ? "fw-bold" : "text-dark"}`}
              >
                Overview Produk
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                onClick={() => setActivePage("editProduct")}
                className={`text-decoration-none ${activePage === "editProduct" ? "fw-bold" : "text-dark"}`}
              >
                Edit Produk
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                onClick={() => setActivePage("addProduct")}
                className={`text-decoration-none ${activePage === "addProduct" ? "fw-bold" : "text-dark"}`}
              >
                Tambah Produk
              </a>
            </li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Product Overview */}
          {activePage === "productOverview" && (
            <>
              <h1 className="my-4">Overview Produk</h1>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Row>
                  {products.map((product) => (
                    <Col md={4} key={product.product_id} className="mb-4">
                      <Card>
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3000/element/${product.gambar}`}
                          alt={product.nama_produk}
                        />
                        <Card.Body>
                          <Card.Title>{product.nama_produk}</Card.Title>
                          <Card.Text>
                            Harga: ${product.harga}
                            <br />
                            Stok: {product.stock}
                            <br />
                            Kategori:{" "}
                            {categories.find((c) => c.category_id === product.category_id)?.category ||
                              "Unknown"}
                          </Card.Text>
                          <Button variant="info" onClick={() => handleShowDetails(product)}>
                            Detail
                          </Button>
                          <Button variant="primary" className="me-2" onClick={() => handleEditProduct(product)}>
                            Edit
                          </Button>
                          <Button variant="danger" onClick={() => handleDelete(product.product_id)}>
                            Hapus
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}

          {/* Edit Product Form */}
          {activePage === "editProduct" && (
            <>
              <h1 className="my-4">Edit Produk</h1>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Row>
                  <Col md={6}>
                    <Form>
                      {/* Dropdown Search for Product Name */}
                      <Form.Group className="mb-3">
  <Form.Label>Nama Produk</Form.Label>
  <Form.Select
    name="product_id"
    value={form.product_id || ""}
    onChange={(e) => {
      handleProductSelect(e); // Update form saat memilih produk
      handleInputChange(e); // Jaga agar perubahan input tetap terkelola
    }}
  >
    <option value="">Pilih Nama Produk</option>
    {products
      .filter((product) =>
        product.nama_produk.toLowerCase().includes(searchProduct.toLowerCase())
      )
      .map((product) => (
        <option key={product.product_id} value={product.product_id}>
          {product.nama_produk}
        </option>
      ))}
  </Form.Select>
                      </Form.Group>


                      {/* Rest of the form fields */}
                      <Form.Group className="mb-3">
                        <Form.Label>Harga</Form.Label>
                        <Form.Control
                          type="number"
                          name="harga"
                          placeholder="Enter price"
                          value={form.harga || ""}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Stok</Form.Label>
                        <Form.Control
                          type="number"
                          name="stock"
                          placeholder="Enter stock"
                          value={form.stock || ""}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Kategori</Form.Label>
                        <Form.Select
  name="category_id"
  value={form.category_id || ""}
  onChange={handleInputChange}
>
  <option value="">Pilih Kategori</option>
  {categories.map((cat) => (
    <option key={cat.category_id} value={cat.category_id}>
      {cat.category}
    </option>
  ))}
                        </Form.Select>

                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="deskripsi"
                          placeholder="Enter product description"
                          value={form.deskripsi || ""}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                      {loading ? "Processing..." : "Submit"}
                    </Button>
                  </Col>
                </Row>
              )}
            </>
          )}

          {/* Add Product Form */}
          {activePage === "addProduct" && (
            <>
              <h1 className="my-4">Tambah Produk Baru</h1>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Produk</Form.Label>
                      <Form.Control
                        type="text"
                        name="nama_produk"
                        placeholder="Enter product name"
                        value={form.nama_produk || ""}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Harga</Form.Label>
                      <Form.Control
                        type="number"
                        name="harga"
                        placeholder="Enter price"
                        value={form.harga || ""}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Stok</Form.Label>
                      <Form.Control
                        type="number"
                        name="stock"
                        placeholder="Enter stock"
                        value={form.stock || ""}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Kategori</Form.Label>
                      <Form.Select
                        name="category_id"
                        value={form.category_id || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map((cat) => (
                          <option key={cat.category_id} value={cat.category_id}>
                            {cat.category}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Deskripsi</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="deskripsi"
                        placeholder="Enter product description"
                        value={form.deskripsi || ""}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Form>
                  <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Processing..." : "Submit"}
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>

      {/* Modal for Product Details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{selectedProduct?.nama_produk}</h5>
          {selectedProduct?.gambar && (
            <img
              src={`http://localhost:3000/element/${selectedProduct.gambar}`}
              alt={selectedProduct.nama_produk}
              className="img-fluid"
            />
          )}
          <p>Harga: {selectedProduct?.harga}</p>
          <p>Stok: {selectedProduct?.stock}</p>
          <p>Kategori: {categories.find((cat) => cat.category_id === selectedProduct?.category_id)?.category}</p>
          <p>{selectedProduct?.deskripsi}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Product;
