"use client";

import { useEffect, useState,useRef } from "react";
import Header from "@/components/Header/Header";
import { PetsApi } from "@/lib/api/clientApi";
import { FaPaw } from "react-icons/fa";
import css from "./page.module.css";

export default function AddPet() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [birthday, setBirthday] = useState("");

  const [species, setSpecies] = useState<string[]>([]);
  const [sex, setSex] = useState<string[]>([]);

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedSex, setSelectedSex] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [speciesData, sexData] = await Promise.all([
          PetsApi.getSpecies(),
          PetsApi.getSex(),
        ]);

        setSpecies(speciesData);
        setSex(sexData);
      } catch (error) {
        console.error("Error loading pet options:", error);
      }
    }

    loadOptions();
  }, []);
    const handleImageChange = (
          event: React.ChangeEvent<HTMLInputElement> ) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const previewUrl = URL.createObjectURL(file);
               setSelectedFile(file);
              setImagePreview(previewUrl);
           };

      const uploadPetImage = async (file: File) => {
           const formData = new FormData();
           formData.append("file", file);
           formData.append(
              "upload_preset",
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
            const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
             method: "POST",
             body: formData, });
           if (!response.ok) { throw new Error("Failed to upload pet image"); }
           const data = await response.json();
           return data.secure_url;};
           
  return (
  <section>
    <Header variant="default" />

    <img
      src="/add-pet.png"
      alt="Add pet"
      className={css.imageContainer}
    />

    <div className={css.titleContainer}>
      <h1 className={css.title}>
        Add my pet /
        <span className={css.partTitle}>
          Personal details
        </span>
      </h1>
      <div className={css.sexContainer}>
        <button
            type="button"
             className={`${css.sexButton} ${
             selectedSex === "female" ? css.sexButtonActive : ""
              }`}
             onClick={() => setSelectedSex("female")}>
             ♀
        </button>

         <button
           type="button"
            className={`${css.sexButton} ${
            selectedSex === "male" ? css.sexButtonActive : ""
            }`}
             onClick={() => setSelectedSex("male")}>
            ♂
        </button>

        <button
          type="button"
         className={`${css.sexButton} ${
         selectedSex === "multiple" ? css.sexButtonActive : ""
          }`}
          onClick={() => setSelectedSex("multiple")}>
        ♀♂
       </button>
    </div>
      <div className={css.photoContainer}>
        <div className={css.photoPreview}>
           {imagePreview ? (
              <img
              src={imagePreview}
              alt="Pet preview"
              className={css.previewImage}  />
             ) : (
            <FaPaw className={css.pawIcon} />)}
         </div>
      </div>
      <div className={css.photoInputContainer}>
        <input
          type="url"
          className={css.infoInput}
          placeholder="Enter URL"
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
          onChange={(event) =>
            setSelectedSpecies(event.target.value)
          }
        >
          <option value="">Type of pet</option>

          {species.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actionButtons}>
        <button
          type="button"
          className={css.backButton}
        >
          Back
        </button>

        <button
          type="button"
          className={css.submitButton}
        >
          Submit
        </button>
      </div>
    </div>
  </section>
);}