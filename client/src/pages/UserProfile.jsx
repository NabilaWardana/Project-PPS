import React, { useState } from "react";
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Detail Profil</h2>
          <p>Selamat Datang, Pengguna!</p>
          <nav>
            <ul>
              <li className="active">Profil</li>
              <li>Edit Profil</li>
              <li>Riwayat Pemesanan</li>
              <li>Bantuan</li>
              <li>Pengaturan</li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile-section">
          <h1>Detail Profil</h1>
          <div className="profile-card">
            <form id="edit-profile-form">
              <div className="profile-picture">
                <img src="https://via.placeholder.com/100" alt="User Picture" />
              </div>
              <div className="profile-info">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  id="fullName"
                  value=""
                  disabled={!isEditing}
                />

                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  value=""
                  disabled={!isEditing}
                />

                <label>No Handphone</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value=""
                  disabled={!isEditing}
                />

                <label>Alamat</label>
                <input
                  type="text"
                  id="address"
                  value=""
                  disabled={!isEditing}
                />

                {/* Button to toggle edit mode */}
                <button
                  type="button"
                  id="edit-btn"
                  onClick={handleEditClick}
                >
                  {isEditing ? "Batal" : "Edit Profil"}
                </button>
                {/* Save button to submit changes */}
                {isEditing && (
                  <button type="submit" id="save-btn">
                    Save Changes
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>

    </div>
  );
};

export default UserProfile;
