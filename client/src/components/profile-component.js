import React, { useState, useEffect } from "react";
import authServices from "../services/auth.services";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>要登入才能拜訪profile頁面</div>}
      {currentUser && (
        <div>
          <h3>
            <strong>{currentUser.user.username}</strong>
          </h3>
          <p>
            <strong>Token:{currentUser.token}</strong>
          </p>
          <p>
            <strong>ID:{currentUser.user._id}</strong>
          </p>
          <p>
            <strong>Email:{currentUser.user.email}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
