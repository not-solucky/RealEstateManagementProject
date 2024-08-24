import ImageViewer from "../../components/ImageViewer/Imageviewer";

function UserVerification() {
    const image = "http://192.168.0.107:8080/api/v1/image/property/cbc8ef52-8de5-4bed-8299-63c4d92dc443.png";
    const onClose = () => {
        console.log("Close");
    }
    return (
        <>
            <ImageViewer src={image} onClose={onClose}/>
        </>
    );
}

export default UserVerification;