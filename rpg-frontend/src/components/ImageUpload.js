import React, { useState } from 'react';
import api from '../services/api';

function ImageUpload({ onUploadSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setMessage('');
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            setMessage('Por favor, selecione um arquivo primeiro.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        setMessage('Enviando...');

        api.post('/upload', formData)
            .then(response => {
                setMessage(response.data.message);
                if (onUploadSuccess) {
                    onUploadSuccess(response.data.file);
                }
            })
            .catch(error => {
                setMessage('Ocorreu um erro ao fazer o upload.');
            });
    };

    return (
        <div className="image-upload-container">
            <h3>Selecione uma Imagem</h3>
            <input type="file" onChange={handleFileChange} />
            <button type="button" onClick={handleFileUpload}>
                Enviar Imagem
            </button>
            {message && <p className="upload-message">{message}</p>}
        </div>
    );
}

export default ImageUpload;