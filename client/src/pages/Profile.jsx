import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const ProfilePage = () => {
  const [activePage, setActivePage] = useState("profile"); 
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    no_hp: "",
    alamat: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/1")
      .then((response) => {
        setData(response.data.data);
        setFormData({
          nama_lengkap: response.data.data.nama_lengkap,
          email: response.data.data.email,
          no_hp: response.data.data.no_hp,
          alamat: response.data.data.alamat,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/api/users/1", formData)
      .then((response) => {
        // Handle successful update (e.g., show success message or update state)
        console.log("Profile updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light" style={{ minHeight: "100vh" }}>
          <h5 className="p-3">Detail Profil</h5>
          <ul className="list-unstyled p-3">
            <li className="mb-3">
              <a
                href="#"
                onClick={() => setActivePage("profile")}
                className={`text-decoration-none ${activePage === "profile" ? "fw-bold" : "text-dark"}`}
              >
                Profil
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                onClick={() => setActivePage("edit")}
                className={`text-decoration-none ${activePage === "edit" ? "fw-bold" : "text-dark"}`}
              >
                Edit Profil
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-decoration-none text-dark">Riwayat Pemesanan</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-decoration-none text-dark">Bantuan</a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-dark">Pengaturan</a>
            </li>
          </ul>
        </Col>

        {/* Profile Section */}
        <Col md={9} className="p-4">
          {activePage === "profile" && (
            <div>
              <h3>Detail Profil</h3>
              <div className="profile-box p-4 bg-white shadow-sm rounded">
                <div className="text-center mb-4">
                  <div
                    className="mx-auto"
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#ddd",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>

                {/* Render User Data */}
                <Form>
                  <Form.Group className="mb-3" controlId="formFullName">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={data ? data.nama_lengkap : ''} 
                      placeholder="John Doe" 
                      disabled 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={data ? data.email : ''} 
                      placeholder="john.doe@example.com" 
                      disabled 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>No Handphone</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={data ? data.no_hp : ''} 
                      placeholder="+628123456789" 
                      disabled 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      value={data ? data.alamat : ''} 
                      placeholder="Jl. Contoh Alamat, Jakarta" 
                      rows={3} 
                      disabled 
                    />
                  </Form.Group>
                </Form>

                <Button
                  variant="primary"
                  onClick={() => setActivePage("edit")}
                  className="mt-3"
                >
                  Edit Profil
                </Button>
              </div>
            </div>
          )}

          {activePage === "edit" && (
            <div>
              <h3>Edit Profil</h3>
              <div className="profile-box p-4 bg-white shadow-sm rounded">
                <div className="text-center mb-4">
                  <div
                    className="mx-auto"
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#ddd",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formFullName">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <InputGroup>
                      <Form.Control 
                        type="text" 
                        placeholder="John Doe" 
                        name="nama_lengkap" 
                        value={formData.nama_lengkap} 
                        onChange={handleChange} 
                      />
                      <InputGroup.Text>
                        <FaEdit className="text-primary" />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <Form.Control 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                      />
                      <InputGroup.Text>
                        <FaEdit className="text-primary" />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>No Handphone</Form.Label>
                    <InputGroup>
                      <Form.Control 
                        type="text" 
                        placeholder="+628123456789" 
                        name="no_hp" 
                        value={formData.no_hp} 
                        onChange={handleChange} 
                      />
                      <InputGroup.Text>
                        <FaEdit className="text-primary" />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Alamat</Form.Label>
                    <InputGroup>
                      <Form.Control 
                        as="textarea" 
                        placeholder="Jl. Contoh Alamat, Jakarta" 
                        rows={3} 
                        name="alamat" 
                        value={formData.alamat} 
                        onChange={handleChange} 
                      />
                      <InputGroup.Text>
                        <FaEdit className="text-primary" />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Simpan Perubahan
                  </Button>
                </Form>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
