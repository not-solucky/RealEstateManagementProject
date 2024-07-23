import React, { useState, useRef } from 'react';
import { Cropper, StretchableBoundary, ratio } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import './style.css';
import { makeAspectCrop } from './../../../node_modules/react-image-crop/src/utils';
const ImageUploader = () => {
    const [image, setImage] = useState(
        '',
    );

    const [croppedImage, setCroppedImage] = useState(
        '',
    );
    const cropperRef = useRef(null);

    const onChange = (cropper) => {
        console.log(cropper.getCoordinates(), cropper.getCanvas());
    };

    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (cropperRef.current) {
            const croppedImage = cropperRef.current.getCanvas().toDataURL();

            console.log(cropperRef.current.getCanvas().toDataURL())
            // Create a temporary anchor element
            setCroppedImage(croppedImage);

        }
    };

    return (
        <div className='image-section'>
            <div className="container">


                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && (
                    <div className="image-container">


                        <Cropper
                            ref={cropperRef}
                            src={image}
                            onChange={onChange}
                            className="cropper"
                            style={{ height: 400, width: 400 }}
                            cropperOptions={{
                                aspectRatio: 1, // Set aspect ratio to 1:1 (optional)

                            }}
                            aspectRatio={72 / 53}

                        />
                    </div>
                )}
                <button onClick={handleSave}>Save Cropped Image</button>
                <div className="cropped-image">
                    {croppedImage && (
                        <>
                        <img src={croppedImage} alt="Cropped" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
