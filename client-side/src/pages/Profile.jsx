import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Alert, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [activePage, setActivePage] = useState("profile");
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    no_hp: "",
    alamat: "",
  });
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // For confirmation modal
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions
  const navigate = useNavigate();
  const [editFields, setEditFields] = useState({
    nama_lengkap: false,
    email: false,
    no_hp: false,
    alamat: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/2")
      .then((response) => {
        const userData = response.data.data;
        setData(userData);
        setFormData({
          nama_lengkap: userData.nama_lengkap,
          email: userData.email,
          no_hp: userData.no_hp,
          alamat: userData.alamat,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true); // Show confirmation modal before submitting
  };

  const confirmSubmit = () => {
    setIsSubmitting(true);
    axios
      .patch("http://localhost:3000/api/users/2", formData)
      .then((response) => {
        setData(response.data.data);
        setMessage("Profil berhasil diperbarui!");
        setTimeout(() => {
          setMessage("");
          setActivePage("profile");
        }, 2000);
      })
      .catch(() => setMessage("Terjadi kesalahan saat menyimpan perubahan."))
      .finally(() => {
        setIsSubmitting(false);
        setShowConfirmModal(false); // Close modal after submission
      });
  };

  const handleCancel = () => {
    setShowConfirmModal(false); // Close modal without making changes
  };

  const handleDeleteAccount = () => {
    axios
      .delete("http://localhost:3000/api/users/2")
      .then(() => {
        setShowDeleteModal(false);
        navigate("/login");
      })
      .catch((error) => console.error("Error deleting account:", error));
  };

  const hasChanges = () => {
    if (!data) return false;
    return (
      formData.nama_lengkap !== data.nama_lengkap ||
      formData.email !== data.email ||
      formData.no_hp !== data.no_hp ||
      formData.alamat !== data.alamat
    );
  };

  return (
    <Container
      fluid
      style={{
        padding: "2rem",
        maxWidth: "1200px", // Menyesuaikan lebar container agar tidak terlalu lebar
        margin: "0 auto", // Menjaga agar container tetap di tengah
        borderRadius: "15px",
        overflow: "hidden",
        backgroundColor: "#f9f9f9", // Warna latar belakang yang bersih
        marginTop: "50px", // Menambahkan jarak antara container dan navbar
      }}
    >
      <Row className="justify-content-center g-4"> {/* g-4 untuk memberikan gap antar kolom */}
  {/* Sidebar */}
  <Col md={3} className="bg-dark text-light" style={{ minHeight: "100vh", padding: "2rem", borderRadius: "15px" }}>
    <h5 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Kelola Akun</h5>
    <ul className="list-unstyled">
      <li className="mb-4">
        <a
          href="#"
          onClick={() => setActivePage("profile")}
          className={`text-decoration-none ${activePage === "profile" ? "fw-bold text-warning" : "text-light"}`}
          style={{ fontSize: "1.2rem" }}
        >
          Profil
        </a>
      </li>
      <li className="mb-4">
        <a
          href="#"
          onClick={() => setActivePage("edit")}
          className={`text-decoration-none ${activePage === "edit" ? "fw-bold text-warning" : "text-light"}`}
          style={{ fontSize: "1.2rem" }}
        >
          Edit Profil
        </a>
      </li>
      <li className="mb-4">
        <a href="#" onClick={() => setShowDeleteModal(true)} className="text-decoration-none text-light" style={{ fontSize: "1.2rem" }}>
          Hapus Akun
        </a>
      </li>
      <li>
        <a href="#" className="text-decoration-none text-light" style={{ fontSize: "1.2rem" }}>
          Keluar/Logout
        </a>
      </li>
    </ul>
  </Col>

  {/* Profile Section */}
  <Col md={8} className="p-4 ms-3" style={{ backgroundColor: "#ffffff", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
    {message && (
      <Alert variant={message.includes("berhasil") ? "success" : "danger"} style={{ borderRadius: "8px" }}>
        {message}
      </Alert>
    )}

    {activePage === "profile" && (
      <div>
        <h3 className="mb-4" style={{ fontSize: "2rem", fontWeight: "bold" }}>Detail Profil</h3>
        <div className="profile-box p-4 bg-white shadow-sm rounded" style={{ borderRadius: "15px" }}>
          <Form>
            {["nama_lengkap", "email", "no_hp", "alamat"].map((field, index) => (
              <Form.Group className="mb-3" key={index}>
                <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600" }}>{field.replace("_", " ").toUpperCase()}</Form.Label>
                <Form.Control type="text" value={data ? data[field] : ""} disabled style={{ fontSize: "1rem", padding: "0.8rem" }} />
              </Form.Group>
            ))}
          </Form>
          <Button variant="primary" onClick={() => setActivePage("edit")} className="mt-3 btn-sm">
            Edit Profil
          </Button>
        </div>
      </div>
    )}

    {activePage === "edit" && (
      <div>
        <h3 className="mb-4" style={{ fontSize: "2rem", fontWeight: "bold" }}>Edit Profil</h3>
        <div className="profile-box p-4 bg-white shadow-sm rounded" style={{ borderRadius: "15px" }}>
          <Form onSubmit={handleSubmit}>
            {["nama_lengkap", "email", "no_hp", "alamat"].map((field, index) => (
              <Form.Group className="mb-3" key={index}>
                <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600" }}>{field.replace("_", " ").toUpperCase()}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    disabled={!editFields[field]}
                    style={{ fontSize: "1rem", padding: "0.8rem" }}
                  />
                  <InputGroup.Text
                    onClick={() => setEditFields((prev) => ({ ...prev, [field]: true }))}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      borderColor: "#ddd",
                      marginLeft: "8px",
                    }}
                  >
                    <FaEdit className="text-dark" />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            ))}
            <Button variant="primary" type="submit" disabled={!hasChanges()} className="btn-sm">
              Simpan Perubahan
            </Button>
            <Button variant="secondary" className="ms-2 btn-sm" onClick={() => setActivePage("profile")}>
              Batalkan
            </Button>
          </Form>
        </div>
      </div>
    )}
  </Col>
</Row>


      {/* Modal for Account Deletion */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#f8f9fa" }}>
          <Modal.Title>Konfirmasi Penghapusan Akun</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan.</Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Hapus Akun
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Confirming Save Changes */}
      <Modal show={showConfirmModal} onHide={handleCancel} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#f8f9fa" }}>
          <Modal.Title>Konfirmasi Simpan Perubahan</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menyimpan perubahan pada profil Anda?</Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
          <Button variant="secondary" onClick={handleCancel}>
            Batal
          </Button>
          <Button variant="primary" onClick={confirmSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
