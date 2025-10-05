import activity from "@/assets/img/activities/activity1.webp";
import crane_zombie from "@/assets/icon/crane_zombie.svg";

import { Link } from "react-router";

interface IHomeCardProps {
  name: string;
  slug: string;
  slogan: string;
  minimum_age: number;
  high_intensity: boolean;
  disabled_access: boolean;
  image_url?: string;
}

export default function HomeCard({
  name,
  slug,
  slogan,
  minimum_age,
  high_intensity,
  disabled_access,
  image_url,
}: IHomeCardProps) {
  return (
    <div className="relative w-sm">
      <img
        className="rounded-xl relative h-full max-h-full w-full object-cover"
        src={image_url ?? activity}
        alt={`Image de l'attraction ${name}`}
      />
      <div className="bg-black-500/70 absolute bottom-10 left-0 right-0 text-white text-center">
        <h2 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h2>
        <p className="z-10 gap-y-1 overflow-hidden min-h-12 text-base font-bold leading-6 text-gray-300">
          {slogan}
        </p>
        <div className="h-11">
          {[...Array(minimum_age)].map((_, index) => (
            <img
              key={index}
              src={crane_zombie}
              className="m-auto max-w-9 inline"
              alt="Niveau de frousse/groupe d'âge"
            />
          ))}
        </div>

        <div
          className={`w-38 mb-3 font-bebas font-bold text-xl bg-white-bg-main hover:bg-dark-blue-buttons hover:text-white-bg-main rounded-2xl py-1 text-dark-blue-buttons m-auto`}
        >
          <Link to={`/activity/${slug}`}>Découvrir...</Link>
        </div>
      </div>
    </div>
  );
}
