import evenement from "@/assets/img/Evenement1.webp";

export default function DirectLink() {
  return (
    <>
      <a href="">
        <img
          className="rounded-xl my-5"
          src={evenement}
          alt="Image de l'évenement"
        />
      </a>
    </>
  );
}
