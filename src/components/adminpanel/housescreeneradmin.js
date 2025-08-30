import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./housescreeneradmin.css";
import PropertyCard from "../propertycard";
import API_URL from "../../config"; // Import API_URL


const HouseScreenerAdmin = () => {
  // ------------------------ state ------------------------
  const [allProperties, setAllProperties] = useState([]);   // ← fetched data
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [priceSortOrder, setPriceSortOrder] = useState(""); // "", "asc", or "desc"

  

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minBedrooms: "",
    maxBedrooms: "",
    minPrice: "",
    maxPrice: "",
    minBathrooms: "",
    maxBathrooms: "",
    minSuperficie: "",
    maxSuperficie: "",
    operation: "",
  });

  // refs + dropdown state (unchanged)
  const [isSuperficieOpen, setIsSuperficieOpen] = useState(false);
  const [tempSuperficie, setTempSuperficie] = useState({ min: "", max: "" });
  const superficieRef = useRef(null);

  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [tempPrice, setTempPrice] = useState({ min: "", max: "" });
  const priceRef = useRef(null);

  const [isBathroomsOpen, setIsBathroomsOpen] = useState(false);
  const [tempBathrooms, setTempBathrooms] = useState({ min: "", max: "" });
  const bathroomsRef = useRef(null);

  const [isBedroomsOpen, setIsBedroomsOpen] = useState(false);
  const [tempBedrooms, setTempBedrooms] = useState({ min: "", max: "" });
  const bedroomsRef = useRef(null);

  // ------------------------ fetch once ------------------------
  useEffect(() => {
    fetch(`${API_URL}/api/admin/properties`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar las propiedades");
        return res.json();
      })
      .then((data) => {
        setAllProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ------------------------ filtering ------------------------
  useEffect(() => {
    if (allProperties.length === 0) return;

    const results = allProperties.filter((property) => {
      const matchesLocation =
        filters.location === "" ||
        property.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesType =
        filters.type === "" || property.type === filters.type;

      const matchesOperation =
        filters.operation === "" || property.operation === filters.operation;

      const matchesMinBedrooms =
        filters.minBedrooms === "" ||
        property.bedrooms >= parseInt(filters.minBedrooms);

      const matchesMaxBedrooms =
        filters.maxBedrooms === "" ||
        property.bedrooms <= parseInt(filters.maxBedrooms);

      const matchesMinBathrooms =
        filters.minBathrooms === "" ||
        property.bathrooms >= parseInt(filters.minBathrooms);

      const matchesMaxBathrooms =
        filters.maxBathrooms === "" ||
        property.bathrooms <= parseInt(filters.maxBathrooms);

      const matchesMinPrice =
        filters.minPrice === "" ||
        property.price >= parseInt(filters.minPrice);

      const matchesMaxPrice =
        filters.maxPrice === "" ||
        property.price <= parseInt(filters.maxPrice);

      const matchesMinSuperficie =
        filters.minSuperficie === "" ||
        property.superficie >= parseInt(filters.minSuperficie);

      const matchesMaxSuperficie =
        filters.maxSuperficie === "" ||
        property.superficie <= parseInt(filters.maxSuperficie);

      return (
        matchesLocation &&
        matchesType &&
        matchesOperation &&
        matchesMinBedrooms &&
        matchesMaxBedrooms &&
        matchesMinBathrooms &&
        matchesMaxBathrooms &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinSuperficie &&
        matchesMaxSuperficie
      );
    });

    const sortedResults = [...results];
  if (priceSortOrder === "asc") {
    sortedResults.sort((a, b) => a.price - b.price);
  } else if (priceSortOrder === "desc") {
    sortedResults.sort((a, b) => b.price - a.price);
  }

    setFilteredProperties(sortedResults);
  }, [filters, allProperties, priceSortOrder]);

  // ------------------------ helpers ------------------------
  const resetFilters = () => {
    setFilters({
      location: "",
      type: "",
      minBedrooms: "",
      maxBedrooms: "",
      minPrice: "",
      maxPrice: "",
      minBathrooms: "",
      maxBathrooms: "",
      minSuperficie: "",
      maxSuperficie: "",
      operation: "",
    });
    setTempBedrooms({ min: "", max: "" });
    setTempBathrooms({ min: "", max: "" });
    setTempPrice({ min: "", max: "" });
    setTempSuperficie({ min: "", max: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (propertyId) => {
  const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar esta propiedad?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${API_URL}/api/admin/deleteproperty?id=${propertyId}`, {
      method: "POST"
    });

    if (!res.ok) throw new Error("Falló la eliminación");

    alert("Propiedad eliminada exitosamente.");

    // Remove the deleted property from state
    setAllProperties((prev) => prev.filter((p) => p.id !== propertyId));
    setFilteredProperties((prev) => prev.filter((p) => p.id !== propertyId));
  } catch (err) {
    console.error(err);
    alert("Error al eliminar la propiedad.");
  }
};

  // close dropdowns when clicking outside (unchanged from your version)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (superficieRef.current && !superficieRef.current.contains(event.target))
        setIsSuperficieOpen(false);
      if (priceRef.current && !priceRef.current.contains(event.target))
        setIsPriceOpen(false);
      if (bathroomsRef.current && !bathroomsRef.current.contains(event.target))
        setIsBathroomsOpen(false);
      if (bedroomsRef.current && !bedroomsRef.current.contains(event.target))
        setIsBedroomsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------------ render ------------------------
  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="screener-container">
      <h2>Maneja tus propiedades</h2>
            <div className="filter-card">
        <div className="filters">        
          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            value={filters.location}
            onChange={handleChange}
          />
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">Tipo</option>
            <option value="Casa">Casa</option>
            <option value="Departamento">Departamento</option>
          </select>

           <select name="operation" value={filters.operation} onChange={handleChange}>
            <option value="">Operacion</option>
            <option value="Compra">Compra</option>
            <option value="Alquiler">Alquiler</option>
          </select>
          <div className="bedrooms-dropdown" ref={bedroomsRef}>
    <div
      className="dropdown-label"
      onClick={() => setIsBedroomsOpen((prev) => !prev)}
    >
      {filters.minBedrooms && filters.maxBedrooms
        ? `${filters.minBedrooms}-${filters.maxBedrooms}`
        : 'Dormitorios'}
      <span> ▼</span>
    </div>

    {isBedroomsOpen && (
      <div className="dropdown-content">
        <input
          type="number"
          placeholder="Dormitorios mínimo"
          value={tempBedrooms.min}
          onChange={(e) =>
            setTempBedrooms((prev) => ({ ...prev, min: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Dormitorios máximo"
          value={tempBedrooms.max}
          onChange={(e) =>
            setTempBedrooms((prev) => ({ ...prev, max: e.target.value }))
          }
        />
        <button
          onClick={() => {
            setFilters((prev) => ({
              ...prev,
              minBedrooms: tempBedrooms.min,
              maxBedrooms: tempBedrooms.max
            }));
            setIsBedroomsOpen(false);
          }}
        >
          OK
        </button>
      </div>
    )}
  </div>
        
          <div className="bathrooms-dropdown" ref={bathroomsRef}>
    <div
      className="dropdown-label"
      onClick={() => setIsBathroomsOpen((prev) => !prev)}
    >
      {filters.minBathrooms && filters.maxBathrooms
        ? `${filters.minBathrooms}-${filters.maxBathrooms}`
        : 'Baños'}
      <span> ▼</span>
    </div>

    {isBathroomsOpen && (
      <div className="dropdown-content">
        <input
          type="number"
          placeholder="Baños mínimo"
          value={tempBathrooms.min}
          onChange={(e) =>
            setTempBathrooms((prev) => ({ ...prev, min: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Baños máximo"
          value={tempBathrooms.max}
          onChange={(e) =>
            setTempBathrooms((prev) => ({ ...prev, max: e.target.value }))
          }
        />
        <button
          onClick={() => {
            setFilters((prev) => ({
              ...prev,
              minBathrooms: tempBathrooms.min,
              maxBathrooms: tempBathrooms.max
            }));
            setIsBathroomsOpen(false);
          }}
        >
          OK
        </button>
      </div>
    )}
  </div>

          
            <div className="price-dropdown" ref={priceRef}>
    <div
      className="dropdown-label"
      onClick={() => setIsPriceOpen((prev) => !prev)}
    >
      {filters.minPrice && filters.maxPrice
        ? `${filters.minPrice}-${filters.maxPrice}`
        : 'Precio'}
      <span> ▼</span>
    </div>

    {isPriceOpen && (
      <div className="dropdown-content">
        <input
          type="number"
          placeholder="Precio mínimo"
          value={tempPrice.min}
          onChange={(e) =>
            setTempPrice((prev) => ({ ...prev, min: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={tempPrice.max}
          onChange={(e) =>
            setTempPrice((prev) => ({ ...prev, max: e.target.value }))
          }
        />
        <button
          onClick={() => {
            setFilters((prev) => ({
              ...prev,
              minPrice: tempPrice.min,
              maxPrice: tempPrice.max
            }));
            setIsPriceOpen(false);
          }}
        >
          OK
        </button>
      </div>
    )}
  </div>


  <div className="superficie-dropdown" ref={superficieRef}>
    <div
      className="dropdown-label"
      onClick={() => setIsSuperficieOpen((prev) => !prev)}
    >
      {filters.minSuperficie && filters.maxSuperficie
        ? `${filters.minSuperficie}-${filters.maxSuperficie}`
        : 'Superficie'}
      <span> ▼</span>
    </div>

    {isSuperficieOpen && (
      <div className="dropdown-content">
        <input
          type="number"
          placeholder="Mínima"
          value={tempSuperficie.min}
          onChange={(e) =>
            setTempSuperficie((prev) => ({ ...prev, min: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Máxima"
          value={tempSuperficie.max}
          onChange={(e) =>
            setTempSuperficie((prev) => ({ ...prev, max: e.target.value }))
          }
        />
        <button onClick={() => {
          setFilters((prev) => ({
            ...prev,
            minSuperficie: tempSuperficie.min,
            maxSuperficie: tempSuperficie.max
          }));
          setIsSuperficieOpen(false);
        }}>OK</button>
      </div>

      
    )}
  </div>



      </div>
      </div>

      {/* ---------- filters UI (unchanged) ---------- */}
      {/* … keep your existing filter JSX here … */}

    <div className="action-buttons">
    <button onClick={resetFilters} className="reset-button">
      Resetear filtros
    </button>

    <button
      className="add-property-button"
      onClick={() => navigate("/admin/new-property")}
    >
      + Agregar propiedad
    </button>

     <select
      value={priceSortOrder}
      onChange={(e) => setPriceSortOrder(e.target.value)}
      className="sort-select"
    >
      <option value="">Ordenar por precio</option>
      <option value="asc">Precio Ascendente</option>
      <option value="desc">Precio Descendente</option>
    </select>
  </div>  

    

{filteredProperties.length > 0 ? (
  <div className="property-list">
    {filteredProperties.map((property) => (
      <PropertyCard
        key={property.id}
        property={property}
        isAdmin={true}
        onDelete={() => handleDelete(property.id)}
        onEdit={() => alert(`Editar ${property.id}`)}
      />
    ))}
  </div>
) : (
  <p className="no-results">
    No se encontraron propiedades con esos filtros.
  </p>
)}
    </div>
  );
};

export default HouseScreenerAdmin;
