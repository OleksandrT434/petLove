"use client";

import { useState, useRef } from "react";
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || ""); 

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
  let avatarUrl = avatar;

  if (selectedFile) {
    avatarUrl = await uploadAvatar(selectedFile);
  }

  const updatedUser = await AuthApi.editUser({
    name,
    email,
    phone,
    ...(avatarUrl ? { avatar: avatarUrl } : {}),
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

const uploadAvatar = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to upload avatar");
  }
  const data = await response.json();
  return data.secure_url;
};

      const handleAvatarChange = (
           event: React.ChangeEvent<HTMLInputElement>
          ) => {
         const file = event.target.files?.[0];
           if (!file) return;
           const previewUrl = URL.createObjectURL(file);
           setSelectedFile(file);
           setAvatarPreview(previewUrl);};

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
             {avatarPreview ? (
                <img
                src={avatarPreview}
                alt="Avatar preview"
                className={css.avatarImage}
                />
                 ) : (
                <FaUserAlt className={css.userIcon} />
                  )}
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

          <button
                 type="button"
                 className={css.uploadButton}
                 onClick={() => fileInputRef.current?.click()}>
                    Upload photo
                    <IoCloudUploadOutline />
          </button>
          

             <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
        </div>

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