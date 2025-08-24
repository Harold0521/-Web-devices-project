import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DevicesList = () => {
  const [devices, setDevices] = useState([]);
  const [deviceSeleccionada, setDeviceSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOption, setSortOption] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const abrirModal = (device) => {
    setDeviceSeleccionada(device);
    fetch(`http://localhost:8080/api/comments/device/${device.id}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error("Error al obtener comentarios:", err));
  };

  const cerrarModal = () => {
    setDeviceSeleccionada(null);
    setComments([]);
    setNewComment("");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    fetch(`http://localhost:8080/api/comments/device/${deviceSeleccionada.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: newComment,
        author: "Usuario" // Puedes cambiar esto por usuario logueado
      })
    })
      .then(res => res.json())
      .then(savedComment => {
        setComments([...comments, savedComment]); // Actualiza lista
        setNewComment("");
      })
      .catch(err => console.error("Error al agregar comentario:", err));
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/devices')
      .then(response => response.json())
      .then(data => setDevices(data))
      .catch(error => console.error('Error al obtener dispositivos:', error));
  }, []);

  let filteredDevices = devices.filter(device =>
    device.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "name-asc") {
    filteredDevices = [...filteredDevices].sort((a, b) =>
      a.product_name.localeCompare(b.product_name)
    );
  } else if (sortOption === "name-desc") {
    filteredDevices = [...filteredDevices].sort((a, b) =>
      b.product_name.localeCompare(a.product_name)
    );
  } else if (sortOption === "price-asc") {
    filteredDevices = [...filteredDevices].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredDevices = [...filteredDevices].sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4 text-center text-white">Listado de Dispositivos</h2>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar dispositivo por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Ordenar por...</option>
              <option value="name-asc">Nombre (A-Z)</option>
              <option value="name-desc">Nombre (Z-A)</option>
              <option value="price-asc">Precio (menor a mayor)</option>
              <option value="price-desc">Precio (mayor a menor)</option>
            </select>
          </div>
        </div>

        <div className="row">
          {filteredDevices.length > 0 ? (
            filteredDevices.map(device => (
              <div className="col-md-4 mb-4" key={device.id}>
                <div className="card h-100" onClick={() => abrirModal(device)} style={{ cursor: 'pointer' }}>
                  <img 
                    src={`http://localhost:8080${device.image_reference}` || "https://www.districtwon.com/wp-content/uploads/sites/12/2024/03/image-placeholder-500x500-1-2.jpg"}
                    className='card-img-top'
                    alt={`Imagen de ${device.product_name}`} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{device.product_name}</h5>
                    <p className="card-text">
                      <strong>Precio:</strong> ${device.price}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No se encontraron dispositivos</p>
          )}
        </div>

        {deviceSeleccionada && (
          <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={cerrarModal}>
            <div className="modal-dialog" role="document" onClick={e => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{deviceSeleccionada.product_name}</h5>
                  <button type="button" className="btn-close" onClick={cerrarModal}></button>
                </div>
                <div className="modal-body">
                  <img 
                    src={`http://localhost:8080${deviceSeleccionada.image_reference}` || "https://www.districtwon.com/wp-content/uploads/sites/12/2024/03/image-placeholder-500x500-1-2.jpg"} 
                    alt={deviceSeleccionada.product_name} 
                    className="img-fluid mb-3"
                  />
                  <p><strong>Referencia:</strong> {deviceSeleccionada.reference}</p>
                  <p><strong>Cantidad:</strong> {deviceSeleccionada.quantity}</p>
                  <p><strong>Precio:</strong> ${deviceSeleccionada.price}</p>

                  <h6 className="mt-4">Comentarios</h6>
                  <ul className="list-group mb-3">
                    {comments.length > 0 ? (
                      comments.map(c => (
                        <li key={c.id} className="list-group-item">
                          <strong>{c.author}</strong>: {c.content}
                          <br />
                          <small className="text-muted">{new Date(c.createdAt).toLocaleString()}</small>
                        </li>
                      ))
                    ) : (
                      <p className="text-muted">No hay comentarios aún</p>
                    )}
                  </ul>

                  <div className="input-group">
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="Escribe un comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleAddComment}>
                      Enviar
                    </button>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-4">
        <div className="container">
          <p className="mb-0">Hecho Por Harold Gamba</p>
        </div>
      </footer>
    </>
  );
};

export default DevicesList;