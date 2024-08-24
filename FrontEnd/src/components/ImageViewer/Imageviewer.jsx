
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Imageviewer.scss';
const ImageViewer = ({ src, onClose }) => {
    const [scale, setScale] = useState(1);

    const handleZoom = (event) => {
        setScale(parseFloat(event.target.value));
    };

    return (
        <div className="Image-viewer-container">
            <div className="Image-viewer-content">
                <div className="header">
                    <button onClick={onClose}>Close</button>
                    <h2>Image Viewer</h2>
                </div>
                <div className="image-container">
                    <img
                        src={src}
                        alt="User Document"
                        style={{ transform: `scale(${scale})` }}
                    />
                </div>
                <div className="controls">
                    <div className="zoom">
                        <label>Zoom</label>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.01"
                            value={scale}
                            onChange={handleZoom}
                        />
                        <span>{scale} X</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ImageViewer;