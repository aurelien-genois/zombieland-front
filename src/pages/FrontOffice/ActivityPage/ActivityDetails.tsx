interface IActivityDetailsProps {
  name: string;
  categoryName: string;
  slogan: string;
  description: string;
  minimum_age: number;
  high_intensity: boolean;
  disabled_access: boolean;
}

export default function ActivityDetails({
  name,
  categoryName,
  slogan,
  description,
  minimum_age,
  high_intensity,
  disabled_access,
}: IActivityDetailsProps) {
  return (
    <>
      <div>
        <div className="text-white text-center mt-5">
          <h1 className="text-6xl font-bold">{name}</h1>
          <h2 className="text-2xl font-bold italic text-gray-400 mt-2 mb-5">
            {categoryName}
          </h2>
          <h3 className="text-xl font-bold italic mb-3">{slogan}</h3>
          <p className="max-w-200 mx-auto text-lg mt-7">{description}</p>
        </div>
        <div className="flex justify-center my-8">
          <div className="flex mx-auto w-40 justify-center gap-1.5">
            {/* // TODO evaluation form 1 to 5 */}
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/src/assets/icon/star-full.svg)_no-repeat_center/contain]"
            />
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/src/assets/icon/star-full.svg)_no-repeat_center/contain]"
            />
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/src/assets/icon/star-full.svg)_no-repeat_center/contain]"
            />
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/src/assets/icon/star-full.svg)_no-repeat_center/contain]"
            />
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/src/assets/icon/star-full.svg)_no-repeat_center/contain]"
            />
          </div>
          <div className="flex mx-auto  w-40 justify-center">
            {[...Array(minimum_age)].map((_, index) => (
              <img
                key={index}
                className="max-w-10"
                src="/src/assets/icon/crane_zombie.svg"
                alt="Crane de niveau"
              />
            ))}
          </div>
          <div className="flex mx-auto w-40 justify-center">
            {high_intensity && (
              <img
                className="max-w-10"
                src="/src/assets/icon/heart.svg"
                alt="Déconseillée aux personnes souffrant de troubles cardiaques"
              />
            )}
            {disabled_access && (
              <img
                className="max-w-10"
                src="/src/assets/icon/disabled.svg"
                alt="Accessible aux personnes à mobilité réduite"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
