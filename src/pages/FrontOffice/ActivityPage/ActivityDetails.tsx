import iconCrane from "@/assets/icon/crane_zombie_bleu.svg";
import iconHeart from "@/assets/icon/heart_blue.svg";
import iconDisabled from "@/assets/icon/disabled-blue.svg";

interface IActivityDetailsProps {
  name: string;
  categoryName: string;
  slogan: string;
  description: string;
  minimum_age: number;
  high_intensity: boolean;
  disabled_access: boolean;
  averageGrade: number;
  nbGrades: number;
}

export default function ActivityDetails({
  name,
  categoryName,
  slogan,
  description,
  minimum_age,
  high_intensity,
  disabled_access,
  averageGrade,
  nbGrades,
}: IActivityDetailsProps) {
  return (
    <>
      <div>
        <div className="text-grey-menu text-center mt-5">
          <h1 className="text-6xl font-bold">{name}</h1>
          <h2 className="text-2xl font-bold italic text-gray-400 mt-2 mb-5">
            {categoryName}
          </h2>
          <h3 className="text-xl font-bold italic mb-3">{slogan}</h3>
          <p className="max-w-200 mx-auto text-lg mt-7">{description}</p>
        </div>
        <div className="flex justify-center my-8">
          <div className="flex items-center mx-auto">
            <div className="relative w-[120px]">
              <div
                className="h-6 bg-dark-blue-buttons [mask:url(/src/assets/icon/star-full.svg)_repeat-x_left/contain]"
                style={{
                  width: `calc(${averageGrade}*100%/5)`,
                }}
              ></div>
              <div className="h-6 bg-gray-200 w-full absolute left-0 top-0 -z-10 [mask:url(/src/assets/icon/star-full.svg)_repeat-x_left/contain]"></div>
            </div>
            <p>&nbsp;({nbGrades ? nbGrades + " votes" : nbGrades + " vote"})</p>
          </div>
          <div className="flex mx-auto  w-40 justify-center">
            {[...Array(minimum_age)].map((_, index) => (
              <img
                key={index}
                className="max-w-9"
                src={iconCrane}
                alt="Crane de niveau"
              />
            ))}
          </div>
          <div className="flex mx-auto w-40 justify-center">
            {high_intensity && (
              <img
                className="max-w-10"
                src={iconHeart}
                alt="Déconseillée aux personnes souffrant de troubles cardiaques"
              />
            )}
            {disabled_access && (
              <img
                className="max-w-10"
                src={iconDisabled}
                alt="Accessible aux personnes à mobilité réduite"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
