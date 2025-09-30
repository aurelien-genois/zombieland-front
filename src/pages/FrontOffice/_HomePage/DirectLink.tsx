import evenement from "@/assets/img/Evenement1.webp";
import { Link } from "react-router";

export default function DirectLink() {
  return (
    <>
      <Link to="/checkout">
        <img
          className="rounded-xl my-5"
          src={evenement}
          alt="Image de l'événement"
        />
      </Link>
    </>
  );
}