import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loaded() {
  return (
    <Loader
      style={{ textAlign: "center", marginTop: "100px" }}
      type="Bars"
      color="#6464fa"
      height={100}
      width={100}
    />
  );
}
