import { Link } from "react-router";

interface StaticLinksProps {
  imageSrc: string;
  linkTo: string;
  altText?: string;
  text: string;
  position: string;
}

export default function StaticLinks({ imageSrc, linkTo, altText, text, position}: StaticLinksProps) {
  return (
    <>
    <div className="flex justify-center relative text-center">
      <Link 
        to={linkTo}>
        <img
          className="rounded-xl max-w-80 md:max-w-60 lg:max-w-80 sm:max-w-60 shadow-[0px_15px_7px_-8px_rgba(0,_0,_0,_0.1)]"
          src={imageSrc}
          alt={altText}
        />
      </Link>
      <p className={`absolute font-bebas text-5xl md:text-6xl ${position} text-white-bg text-center`}>{text}</p>
    </div>
    </>
  );
}