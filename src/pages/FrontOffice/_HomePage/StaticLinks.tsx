import { Link } from "react-router";

interface StaticLinksProps {
  imageSrc: string;
  linkTo: string;
  altText?: string;
}

export default function StaticLinks({ imageSrc, linkTo, altText}: StaticLinksProps) {
  return (
    <>
      <Link 
        to={linkTo}>
        <img
          className="rounded-xl max-w-80 shadow-[0px_15px_7px_-8px_rgba(0,_0,_0,_0.1)]"
          src={imageSrc}
          alt={altText}
        />
      </Link>
    </>
  );
}