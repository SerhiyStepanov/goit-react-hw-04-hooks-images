import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loaded() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <Loader type="Bars" color="#6464fa" height={100} width={100} />
    </div>
  );
}
