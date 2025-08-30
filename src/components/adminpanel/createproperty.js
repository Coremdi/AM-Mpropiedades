import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext";
import "./createproperty.css"; // reuse styling
import API_URL from "../../config"; // Import API_URL


const CreateProperty = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);


  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    operation: "",
    status: "",
    superficie: "",
    type: "",
    amenities: ""
  });

const handleImageChange = (e) => {
  const selectedFiles = Array.from(e.target.files);
  const totalImages = images.length + selectedFiles.length;

  if (totalImages > 10) {
    alert("No puedes subir más de 10 imágenes en total.");
    return;
  }

  setImages(prev => [...prev, ...selectedFiles]);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {

    if (images.length > 10) {
    alert("No puedes subir más de 10 imágenes.");
    return;
  }
    const form = new FormData();

  // Append all form fields
  Object.entries(formData).forEach(([key, value]) => {
    form.append(key, value);
  });

  // Convert amenities to CSV string if it's an array
  if (formData.amenities) {
    form.set("amenities", formData.amenities);
  }

  // Append each image file
  images.forEach((file, index) => {
    form.append("images", file);
  });

  try {
    const res = await fetch(`${API_URL}api/admin/createproperty`, {
      method: "POST",
      body: form, // no need to set Content-Type — browser does it
    });

    if (!res.ok) throw new Error("Failed to create property");
    alert("Propiedad creada exitosamente.");
    navigate("/admin/manage-listings");
  } catch (err) {
    console.error(err);
    alert("Error al crear la propiedad.");
  }
};

  return (
    <div className="edit-property-container">
      <h2>Crear Nueva Propiedad</h2>

      <label>Título
        <input name="title" value={formData.title} onChange={handleChange} />
      </label>

      <label>Ubicación
        <input name="location" value={formData.location} onChange={handleChange} />
      </label>

      <label>Precio (USD)
        <input name="price" type="text" value={formData.price} onChange={handleChange} />
      </label>

      <label>Habitaciones
        <input name="bedrooms" type="text" value={formData.bedrooms} onChange={handleChange} />
      </label>

      <label>Baños
        <input name="bathrooms" type="text" value={formData.bathrooms} onChange={handleChange} />
      </label>

      <label>Descripción
        <input name="description" value={formData.description} onChange={handleChange} />
      </label>

      <label>Operación
        <input name="operation" value={formData.operation} onChange={handleChange} />
      </label>

      <label>Status
        <input name="status" value={formData.status} onChange={handleChange} />
      </label>

      <label>Superficie
        <input name="superficie" value={formData.superficie} onChange={handleChange} />
      </label>

      <label>Tipo
        <input name="type" value={formData.type} onChange={handleChange} />
      </label>

      <label>Amenities
        <input name="amenities" value={formData.amenities} onChange={handleChange} />
      </label>

      <label>Imágenes
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </label>
      <p>{images.length} / 10 imágenes seleccionadas</p>

      <div className="form-actions">
        <button onClick={() => navigate(-1)}>Cancelar</button>
        <button onClick={handleCreate}>Crear propiedad</button>
      </div>
    </div>
  );
};

export default CreateProperty;