import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext"; // adjust if needed
import "./editpropertypage.css"; // optional styling
import API_URL from "../../config"; // Import API_URL


const API_BASE = "http://127.0.0.1:5000/api/admin/properties";


const EditPropertyPage = () => {
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [original, setOriginal] = useState(null); // data as fetched
  const [formData, setFormData] = useState(null); // editable copy
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newImages, setNewImages] = useState([]);        // files selected to upload
  const [imagesToDelete, setImagesToDelete] = useState([]); // i


  // 1) fetch property once
  useEffect(() => {
    if (!isAdmin) { navigate("/"); return; }                    // guard
    fetch(`${API_URL}/api/admin/properties/${id}`)
      .then((res) => res.json())
      .then((data) => { setOriginal(data); setFormData(data); })
      .catch(() => setError("Error al cargar la propiedad"))
      .finally(() => setLoading(false));
  }, [id, isAdmin, navigate]);

  // 2) handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Changing field:", name, "value:", value);

  };

  // 3) build diff object and PATCH
const handleSave = async () => {
  if (!original || !formData) return;

  const payload = { ...formData };

  const intFields = ["price", "bathrooms", "bedrooms"];
  intFields.forEach((field) => {
    if (payload[field] !== undefined) {
      payload[field] = parseInt(payload[field], 10);
    }
  });

  if (typeof payload.amenities === "string") {
    payload.amenities = payload.amenities
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  const normalize = (val) => {
  if (Array.isArray(val)) {
    return JSON.stringify(val.map((v) => v?.toString().trim()).sort());
  }
  if (typeof val === 'number') return val;
  if (typeof val === 'string') return val.trim();
  return JSON.stringify(val ?? "");
};

const diff = {};
for (const key in payload) {
  if (key === "images") continue; // 🚫 skip images field

  const originalVal = normalize(original[key]);
  const newVal = normalize(payload[key]);

  if (originalVal !== newVal) {
    console.log(`🔍 Field changed: "${key}"`);
    console.log("   Original:", originalVal);
    console.log("   New     :", newVal);
    diff[key] = payload[key];
  }
}

  const hasFieldChanges = Object.keys(diff).length > 0;
  const hasImageChanges = newImages.length > 0 || imagesToDelete.length > 0;

  if (!hasFieldChanges && !hasImageChanges) {
    alert("No hay cambios.");
    return;
  }

console.log("diff:", diff);
console.log("newImages:", newImages);
console.log("imagesToDelete:", imagesToDelete);
console.log("hasFieldChanges:", hasFieldChanges);
console.log("hasImageChanges:", hasImageChanges);

  try {
    // 1. Update form fields ONLY if needed
    if (hasFieldChanges) {
      console.log("Sending payload to backend:", diff);
      const res = await fetch(`${API_URL}/api/admin/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diff),
      });
      if (!res.ok) throw new Error("Patch failed");
    }

    // 2. Upload new images if any
    if (newImages.length > 0) {
      const imgFormData = new FormData();
      newImages.forEach((file) => imgFormData.append("images", file));
      const uploadRes = await fetch(`${API_URL}/api/admin/upload-images/${id}`, {
        method: "POST",
        body: imgFormData,
      });
      if (!uploadRes.ok) throw new Error("Image upload failed");
    }

    // 3. Delete removed images if any
    if (imagesToDelete.length > 0) {
      const deleteRes = await fetch(`${API_URL}/api/admin/delete-images/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: imagesToDelete }),
      });
      if (!deleteRes.ok) throw new Error("Image delete failed");
    }

    alert("Propiedad actualizada.");
    navigate("/admin/manage-listings");
  } catch (err) {
    console.error("Error:", err);
    alert("Error al guardar.");
  }
};


  const handleImageUpload = async (files) => {
  if (files.length === 0) {
    alert("Selecciona imágenes para subir.");
    return;
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const res = await fetch(`${API_URL}/api/admin/upload-images/${id}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    alert("Imágenes subidas exitosamente.");

    // Refresh property data to show new images
    const updated = await fetch(`${API_URL}/api/admin/properties/${id}`);
    const data = await updated.json();
    setOriginal(data);
    setFormData(data);
    setNewImages([]);
  } catch (err) {
    console.error(err);
    alert("Error al subir imágenes.");
  }
};

  if (loading) return <p>Cargando…</p>;
  if (error)   return <p>{error}</p>;
  if (!formData) return null;

  // Simple example form — expand with your full schema
  return (
    <div className="edit-property-container">
      <h2>Editar Propiedad #{id}</h2>

      <label>Título
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>Ubicación
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>

      <label>Precio (USD)
       <input
        name="price"
        type="text"
        value={formData.price}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setFormData((prev) => ({ ...prev, price: value }));
          }
        }}
        inputMode="numeric"
        pattern="[0-9]*"
/>
       
      </label>

      <label>Habitaciones
        <input
          name="bedrooms"
          type="text"
          value={formData.bedrooms}
          onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setFormData((prev) => ({ ...prev, bedrooms: value }));
          }
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        />
      </label>
      <label>Banios
        <input
          name="bathrooms"
          type="text"
          value={formData.bathrooms}
          onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setFormData((prev) => ({ ...prev, bathrooms: value }));
          }
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        />
      </label>
        <label>Descripcion
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>Operacion
        <input
          name="operation"
          value={formData.operation}
          onChange={handleChange}
        />
      </label>
      <label>Status
        <input
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </label>
      <label>Superficie
        <input
          name="superficie"
          value={formData.superficie}
          onChange={handleChange}
        />
      </label>
      <label>Tipo
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </label>

      <label>Amenities
        <input
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
        />
      </label>
      <div className="image-preview-container">
  <h4>Imágenes</h4>
  <div className="image-grid">
    {formData.images?.map((imgPath, index) => (
      <div key={index} className="image-thumbnail">
        <img src={`${API_URL}${imgPath}`} alt={`Imagen ${index + 1}`} />
        <button
          className="delete-image-button"
  onClick={() => {
    const confirmDelete = window.confirm("¿Eliminar esta imagen?");
    if (confirmDelete) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imgPath)
      }));
      setImagesToDelete((prev) => [...prev, imgPath]);
    }
  }}
        >
          ✕
        </button>
      </div>
    ))}

      {newImages.length > 0 && (
  <div className="image-grid new-upload-preview">
    {newImages.map((file, index) => {
      const previewUrl = URL.createObjectURL(file);
      return (
        <div key={index} className="image-thumbnail">
          <img src={previewUrl} alt={`Nueva imagen ${index + 1}`} />
        </div>
      );
    })}
  </div>
)}

    {/* "+" Upload Button (same style as image-thumbnail) */}
    <div className="image-thumbnail upload-thumbnail">
      <label htmlFor="image-upload-input" className="upload-label">+</label>
      <input
  type="file"
  id="image-upload-input"
  multiple
  accept="image/*"
  onChange={(e) => {
    const files = [...e.target.files];
    setNewImages((prev) => [...prev, ...files]); // Append instead of replace
  }}
  style={{ display: "none" }}
/>
    </div>
  </div>

   
</div>

      <div className="form-actions">
        <button onClick={() => navigate(-1)}>Cancelar</button>
        <button onClick={handleSave}>Guardar cambios</button>
      </div>
    </div>
  );
};

export default EditPropertyPage;
