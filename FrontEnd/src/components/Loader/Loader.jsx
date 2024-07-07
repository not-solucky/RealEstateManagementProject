import { SyncLoader } from 'react-spinners'; // Assuming you have HashLoader from react-spinners
import "./Loader.scss";

function Loader() {
    return (
        <>
            <div className="loader-container">
                <SyncLoader color={"#FFFFFF"} loading={true} size={15} />
            </div>
        </>
    );
}

export default Loader;