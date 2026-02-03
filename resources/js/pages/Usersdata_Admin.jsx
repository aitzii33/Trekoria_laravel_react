
import { useState } from 'react'
import axios from 'axios'

import '../../css/CargaMasiva.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const CargaMasiva = () => 
{
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [file, setFile] = useState(null);

    const cargarDemoJSON = async () => 
    {
        setCargando(true);
        setMensaje('');

        try 
        {
            const response = await fetch('/data/usuarios-demo.json');
            const userData = await response.json();
            setUsuarios(userData);
            setMensaje('Demo data loaded locally');
            
            const apiResponse = await axios.post('/api/usuarios-masivo', { usuarios: userData });
            setMensaje(apiResponse.data.message);
        
        } 
        catch (error) 
        {
            setMensaje('sError: ' + (error.response?.data?.message || error.message));
        }
        setCargando(false);
    };

    const subirArchivo = (event) => 
    {
        const selectedFile = event.target.files[0];

        if (selectedFile) 
        {
            setFile(selectedFile);
            setCargando(true);
            setMensaje('');

            const reader = new FileReader();
            reader.onload = async (e) => 
            {
                try 
                {
                    const usuariosArchivo = JSON.parse(e.target.result);
                    setUsuarios(usuariosArchivo);
                    
                    const apiResponse = await axios.post('/api/usuarios-masivo', { usuarios: usuariosArchivo });
                    setMensaje(apiResponse.data.message);
                
                } 
                catch (error) 
                {
                    setMensaje('Error en formato JSON: ' + error.message);
                }
                setCargando(false);
            };
            reader.readAsText(selectedFile);
        }
    };

    const limpiarMensaje = () => setMensaje('');

    return (
        <div className="carga-masiva-container">
            <div className="card-principal shadow-lg">
                <div className="card-header-demo bg-gradient-primary">
                    <div className="demo-icon">
                        <i className="fas fa-users-cog"></i>
                    </div>
                    <h3>Bulk User Upload</h3>
                    <p>Import users from JSON</p>
                </div>

                <div className="card-body-demo p-4">
                    <div className="botones-principales row g-3 mb-4">
                        <div className="col-md-6">
                            <button className="btn-demo btn-demo-success w-100" onClick={cargarDemoJSON} disabled={cargando}>
                                {cargando ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Processing...
                                </>
                                ) : (
                                <>
                                    <i className="fas fa-download me-2"></i>
                                    Load Demo JSON
                                </>
                                )}
                            </button>
                        </div>

                        <div className="col-md-6">
                            <label className="btn-demo btn-demo-upload w-100">
                                <i className="fas fa-file-upload me-2"></i>
                                {file ? file.name : 'Subir Archivo JSON'}
                                <input type="file" className="d-none" accept=".json" onChange={subirArchivo}/>
                            </label>
                        </div>
                    </div>

                    {mensaje && (
                        <div className={`mensaje-estado fade-in 'alert-success' : 'alert-danger'}`}>
                            <i className={`icono-estado 'fas fa-check-circle' : 'fas fa-exclamation-triangle'}`}></i>
                            {mensaje}
                                <button className="btn-close-estado" onClick={limpiarMensaje}>
                                    <i className="fas fa-times"></i>
                                </button>
                        </div>
                    )}

                    {usuarios.length > 0 && (
                        <>
                            <hr className="divider" />
                            <div className="preview-section">
                                <h5 className="preview-title">
                                    <i className="fas fa-eye me-2"></i>
                                    Preview of loaded users ({usuarios.length})
                                </h5>
                                <div className="table-responsive">
                                    <table className="tabla-preview">
                                        <thead>
                                            <tr>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Type</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                        {usuarios.slice(0, 5).map((usuario, idx) => 
                                        (
                                            <tr key={idx}>
                                                <td>
                                                    <strong>{usuario.name}</strong>
                                                    <br/><small>{usuario.last_name}</small>
                                                </td>

                                                <td>{usuario.user_name || '-'}</td>

                                                <td>
                                                    <i className="fas fa-envelope me-1"></i>
                                                    {usuario.email}
                                                </td>

                                                <td>
                                                    <span className={`badge-user badge-${usuario.type_user_id === 2 ? 'admin' : 'user'}`}>
                                                        {usuario.type_user_id === 2 ? 'Admin' : 'Usuario'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {usuarios.length > 5 && (
                                            <tr className="fila-mas">
                                                <td colSpan="4" className="text-center">
                                                    <i className="fas fa-ellipsis-h"></i> y {usuarios.length - 5} más...
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="card-footer-demo">
                    <div className="info-footer">
                        <i className="fas fa-info-circle me-1"></i>
                        Archivo demo: <code>public/data/usuarios-demo.json</code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CargaMasiva;
