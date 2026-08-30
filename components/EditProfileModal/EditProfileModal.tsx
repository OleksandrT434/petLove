"use client";

import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";

import Modal from "@/components/Modal/Modal";
import { AuthApi } from "@/lib/api/clientApi";
import type { CurrentUserFull } from "@/types/auth";
import axios from "axios";

import css from "./EditProfileModal.module.css";

type EditProfileModalProps = {
  user: CurrentUserFull;
  onClose: () => void;
  onSaved: (updatedUser: CurrentUserFull) => void;
};

export default function EditProfileModal({
  user,
  onClose,
  onSaved,
}: EditProfileModalProps) {

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const updatedUser = await AuthApi.editUser({
        name,
        email,
        phone,
        ...(avatar ? { avatar } : {}),
      });
      onSaved(updatedUser);
      onClose();

    } catch (error) {
  console.error("EDIT PROFILE ERROR:", error);

  if (axios.isAxiosError(error)) {
    console.error("BACKEND RESPONSE:", error.response?.data);

    setError(
      error.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  } else {
    setError("Something went wrong. Please try again.");
  }
}}

  return (
    <Modal onClose={onClose}>

      <form
        className={css.form}
        onSubmit={handleSubmit}
      >
        <h2 className={css.title}>
          Edit information
        </h2>
        <div className={css.avatarWrapper}>
          { selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected avatar"
                className={css.avatarImage} />
                 ) : user.avatar ? (
              <img
                src={user.avatar}
                alt="User avatar"
                className={css.avatarImage}/>
                       ) : (
                <FaUserAlt className={css.userIcon} />)}

        </div>
        <div className={css.avatarInputContainer}>

          <input
            className={css.input}
            type="url"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(event) =>
              setAvatar(event.target.value)
            }
          />

          <label className={css.uploadButton}>
                Upload photo
                 <IoCloudUploadOutline />
              <input
                type="file"
                accept="image/*"
                className={css.fileInput}
                onChange={(event) => {
                const file = event.target.files?.[0]; if (file) {
                    setSelectedFile(file);}
                }}/>
           </label>

        </div>

        {/* Основні поля */}
        <div className={css.inputCont}>

          <input
            className={css.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />

          <input
            className={css.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <input
            className={css.input}
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
          />

        </div>

        {error && (
          <p className={css.error}>
            {error}
          </p>
        )}

        <button
          className={css.saveButton}
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Go to profile"}
        </button>

      </form>

    </Modal>
  );
}