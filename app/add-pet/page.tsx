"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import { AuthApi, PetsApi } from "@/lib/api/clientApi";
import { FaPaw } from "react-icons/fa";
import { useAuth } from "@/components/AuthContext/AuthContext";
import css from "./page.module.css";

export default function AddPet() {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [birthday, setBirthday] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [species, setSpecies] = useState<string[]>([]);

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const speciesData = await PetsApi.getSpecies();
        setSpecies(speciesData);
      } catch (error) {
        console.error("Error loading pet options:", error);
      }
    }

    loadOptions();
  }, []);

  if (!user) {
    return null;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setImagePreview(previewUrl);
    setImgURL("");
  };

  const uploadPetImage = async (file: File) => {
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
      throw new Error("Failed to upload pet image");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    setError("");

    if (!title.trim() || !name.trim() || !selectedSpecies || !birthday || !selectedSex) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const finalImgURL = selectedFile
        ? await uploadPetImage(selectedFile)
        : imgURL.trim();

      if (!finalImgURL) {
        setError("Please upload a photo or enter a photo URL.");
        return;
      }

      await AuthApi.addPet({
        name: name.trim(),
        title: title.trim(),
        imgURL: finalImgURL,
        species: selectedSpecies,
        birthday,
        sex: selectedSex,
      });

      router.push("/profile");
    } catch (error) {
      console.error("Error creating pet:", error);
      setError("Something went wrong while adding the pet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <Header variant="default" />

      <img src="/add-pet.png" alt="Add pet" className={css.imageContainer} />

      <div className={css.titleContainer}>
        <h1 className={css.title}>
          Add my pet /
          <span className={css.partTitle}>Personal details</span>
        </h1>

        <div className={css.sexContainer}>
          <button
            type="button"
            className={`${css.sexButton} ${
              selectedSex === "female" ? css.sexButtonActive : ""
            }`}
            onClick={() => setSelectedSex("female")}
          >
            ♀
          </button>

          <button
            type="button"
            className={`${css.sexButton} ${
              selectedSex === "male" ? css.sexButtonActive : ""
            }`}
            onClick={() => setSelectedSex("male")}
          >
            ♂
          </button>

          <button
            type="button"
            className={`${css.sexButton} ${
              selectedSex === "multiple" ? css.sexButtonActive : ""
            }`}
            onClick={() => setSelectedSex("multiple")}
          >
            ♀♂
          </button>
        </div>

        <div className={css.photoContainer}>
          <div className={css.photoPreview}>
            {imagePreview ? (
              <img src={imagePreview} alt="Pet preview" className={css.previewImage} />
            ) : (
              <FaPaw className={css.pawIcon} />
            )}
          </div>
        </div>

        <div className={css.photoInputContainer}>
          <input
            type="url"
            className={css.infoInput}
            placeholder="Enter URL"
            value={imgURL}
            onChange={(event) => {
              setImgURL(event.target.value);
              if (event.target.value.trim()) {
                setSelectedFile(null);
                setImagePreview("");
              }
            }}
          />

          <button
            type="button"
            className={css.uploadButton}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload photo
            <span>⌃</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>

        <input
          type="text"
          className={css.infoInput}
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          className={css.infoInput}
          placeholder="Pet’s Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <div className={css.bottomInputs}>
          <input
            type="date"
            className={css.birthdayInput}
            value={birthday}
            onChange={(event) => setBirthday(event.target.value)}
          />

          <select
            className={css.speciesInput}
            value={selectedSpecies}
            onChange={(event) => setSelectedSpecies(event.target.value)}
          >
            <option value="">Type of pet</option>

            {species.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {error && <p className={css.errorMessage}>{error}</p>}

        <div className={css.actionButtons}>
          <button type="button" className={css.backButton} onClick={() => router.back()}>
            Back
          </button>

          <button
            type="button"
            className={css.submitButton}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </section>
  );
}