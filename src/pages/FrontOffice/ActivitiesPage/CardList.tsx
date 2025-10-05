import activity from "@/assets/img/activities/activity1.webp";

import { Link } from "react-router";

interface ICardListProps {
  name: string;
  slug: string;
  slogan: string;
  minimum_age: number;
  high_intensity: boolean;
  disabled_access: boolean;
  image_url?: string;
}

export default function CardList({
  name,
  slug,
  slogan,
  minimum_age,
  high_intensity,
  disabled_access,
  image_url,
}: ICardListProps) {
  return (
    <>
      <div className="relative justify-center items-center">
        <img
          className="rounded-xl relative h-80 w-full object-cover"
          src={image_url?.length ? image_url : activity}
          alt={`Image de l'attraction ${name}`}
        />
        <div className="bg-black-500/70 absolute bottom-10 left-0 right-0 text-white text-center">
          <h2 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h2>
          <p className="z-10 gap-y-1 overflow-hidden text-sm font-bold leading-6 text-gray-300 mb-2">
            {slogan}
          </p>
          <div className="flex justify-between">
            <div className="flex items-center ml-2">
              {[...Array(minimum_age)].map((_, index) => (
                <span
                  key={index}
                  aria-hidden
                  className="block size-8 bg-white [mask:url(/src/assets/icon/crane_zombie.svg)_no-repeat_center/contain]"
                />
              ))}
            </div>
            <div className="flex mr-3">
              {disabled_access && (
                <span
                  aria-hidden
                  className="mr-1 block size-8 bg-white [mask:url(/src/assets/icon/disabled.svg)_no-repeat_center/contain]"
                />
              )}
              {high_intensity && (
                <span
                  aria-hidden
                  className="block size-8 bg-white [mask:url(/src/assets/icon/heart.svg)_no-repeat_center/contain]"
                />
              )}
            </div>
          </div>
          <div
            className={`w-38 mb-3 font-bebas font-extrabold text-xl bg-white-bg text-dark-blue-buttons hover:bg-dark-blue-buttons rounded-xl py-1 hover:text-white-bg m-auto`}
          >
            <Link to={`/activity/${slug}`}>VOIR LE DETAIL</Link>
          </div>
        </div>
      </div>
    </>
  );
}
