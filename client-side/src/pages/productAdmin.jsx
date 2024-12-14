import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import axios from "axios";

const ProductAdmin = () => {
  const [activePage, setActivePage] = useState("overviewProduk");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Untuk modal detail
  const [showModal, setShowModal] = useState(false);

  const API_BASE_URL = "http://localhost:3000/api";

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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch categories.");
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      if (activePage === "tambahProduk") {
        await axios.post(`${API_BASE_URL}/products`, form);
        alert("Product added successfully!");
      } else if (activePage === "editProduk" && form.product_id) {
        await axios.patch(`${API_BASE_URL}/products/${form.product_id}`, form);
        alert("Product updated successfully!");
      }
      fetchProducts();
      setForm({});
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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
                onClick={() => setActivePage("overviewProduk")}
                className={`text-decoration-none ${
                  activePage === "overviewProduk" ? "fw-bold" : "text-dark"
                }`}
              >
                Overview Produk
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                onClick={() => setActivePage("editProduk")}
                className={`text-decoration-none ${
                  activePage === "editProduk" ? "fw-bold" : "text-dark"
                }`}
              >
                Edit Produk
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                onClick={() => setActivePage("tambahProduk")}
                className={`text-decoration-none ${
                  activePage === "tambahProduk" ? "fw-bold" : "text-dark"
                }`}
              >
                Tambah Produk
              </a>
            </li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}

          {activePage === "overviewProduk" && (
            <>
              <h1 className="my-4">Overview Produk</h1>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Row>
                  {products.map((product) => (
                    <Col md={4} key={product.product_id} className="mb-4">
                      <Card className="border-0 shadow-sm">
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3000/uploads/${product.gambar}`}
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
                            {categories.find(
                              (c) => c.category_id === product.category_id
                            )?.category || "Unknown"}
                          </Card.Text>
                          <Button
                            variant="info"
                            className="me-2"
                            onClick={() => handleShowDetails(product)}
                          >
                            Detail
                          </Button>
                          <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => {
                              setForm(product);
                              setActivePage("editProduk");
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(product.product_id)}
                          >
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

          {activePage === "editProduk" && (
            <>
              {/* Existing editProduk content */}
            </>
          )}

          {activePage === "tambahProduk" && (
            <>
              {/* Existing tambahProduk content */}
            </>
          )}
        </Col>
      </Row>

      {/* Modal for Detail */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <p><strong>Nama:</strong> {selectedProduct.nama_produk}</p>
              <p><strong>Deskripsi:</strong> {selectedProduct.deskripsi}</p>
              <p><strong>Harga:</strong> ${selectedProduct.harga}</p>
              <p><strong>Stok:</strong> {selectedProduct.stock}</p>
              <p><strong>Kategori:</strong> {categories.find(c => c.category_id === selectedProduct.category_id)?.category || "Unknown"}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductAdmin;
