import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchOneCategory } from "@/store/reducers/categoriesReducer";

interface IActivityDetailsProps {
  name: string;
  categoryId: number;
  slogan: string;
  description: string;
  minimum_age: number;
  high_intensity: boolean;
  disabled_access: boolean;
}

export default function ActivityDetails({
  name,
  categoryId,
  slogan,
  description,
  minimum_age,
  high_intensity,
  disabled_access,
}: IActivityDetailsProps) {
  const dispatch = useAppDispatch();

  // ! actually failed to fetch because endpoint /categories/:id need auth & role admin
  useEffect(() => {
    dispatch(fetchOneCategory(categoryId));
  }, [dispatch, categoryId]);
  const { currentCategory, loading, error } = useAppSelector(
    (state) => state.categoriesStore
  );

  return (
    <>
      <div>
        <div className="text-white text-center mt-5">
          <h1 className="text-6xl font-bold">{name}</h1>
          <h2 className="text-2xl font-bold italic text-gray-400 mt-2 mb-5">
            {loading ? (
              <div className="text-white">Loading...</div>
            ) : error || !currentCategory ? (
              <div className="text-white">Error: {error}</div>
            ) : (
              currentCategory.name
            )}
          </h2>
          <h3 className="text-xl font-bold italic mb-3">{slogan}</h3>
          <p className="max-w-200 mx-auto text-lg mt-7">{description}</p>
        </div>
        <div className="flex justify-center my-8">
          <div className="flex mx-auto w-40 justify-center gap-1.5">
            {/* // TODO evaluation form 1 to 5 */}
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"
            />
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"
            />
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"
            />
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"
            />
            <span
              aria-hidden
              className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"
            />
          </div>
          <div className="flex mx-auto  w-40 justify-center">
            {[...Array(minimum_age)].map((_, index) => (
              <img
                key={index}
                className="max-w-10"
                src="/icon/crane_zombie.svg"
                alt="Crane de niveau"
              />
            ))}
          </div>
          <div className="flex mx-auto w-40 justify-center">
            {high_intensity && (
              <img
                className="max-w-10"
                src="/icon/heart.svg"
                alt="Déconseillée aux personnes souffrant de troubles cardiaques"
              />
            )}
            {disabled_access && (
              <img
                className="max-w-10"
                src="/icon/disabled.svg"
                alt="Accessible aux personnes à mobilité réduite"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
