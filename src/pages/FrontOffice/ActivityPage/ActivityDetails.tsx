import iconCrane from "@/assets/icon/crane_zombie_bleu.svg";
import iconHeart from "@/assets/icon/heart_blue.svg";
import iconDisabled from "@/assets/icon/disabled-blue.svg";
import type { IUserRateActivity } from "@/@types";
import Button from "@/components/UI/BackOffice/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { evaluateActivity } from "@/store/reducers/activitiesReducer";
import { useState } from "react";

interface IActivityDetailsProps {
  name: string;
  categoryName: string;
  slogan: string;
  description: string;
  minimum_age: number;
  high_intensity: boolean;
  disabled_access: boolean;
  userRateActivities: IUserRateActivity[] | null;
}

export default function ActivityDetails({
  name,
  categoryName,
  slogan,
  description,
  minimum_age,
  high_intensity,
  disabled_access,
  userRateActivities,
}: IActivityDetailsProps) {
  const dispatch = useAppDispatch();
  const { userInfo, isAuth } = useAppSelector((store) => store.userStore);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { currentActivity, loading, error } = useAppSelector(
    (state) => state.activitiesStore
  );

  if (currentActivity === undefined) {
    return <div className="text-grey-menu">Error: {error}</div>;
  }

  let averageGrade = 0;
  let hasUserAlreadyEvaluate = false;
  if (userRateActivities !== null && userRateActivities.length) {
    // calculate average or all
    averageGrade =
      userRateActivities.reduce((total, rate) => total + rate.grade, 0) /
      userRateActivities.length;

    if (userInfo !== null) {
      hasUserAlreadyEvaluate =
        userRateActivities.filter(
          (rate) =>
            rate.user_id == userInfo.id &&
            rate.activity_id == currentActivity.id
        ).length > 0;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!currentActivity) {
      setFormError("Activité non chargée.");
      return;
    }

    await dispatch(
      evaluateActivity({
        formData,
        id: currentActivity.id,
      })
    );
    setSuccessMessage("L'activité a bien été évaluée.");
  };

  return (
    <div className="py-8">
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
          <p>
            &nbsp;(
            {userRateActivities !== null
              ? userRateActivities.length + " votes"
              : "0 vote"}
            )
          </p>
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

      {successMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-green-400 text-green-700 rounded text-center">
          {successMessage}
        </div>
      )}

      {!isAuth ? (
        <p className="text-center">
          Connectez-vous pour pouvoir évaluer cette activité !
        </p>
      ) : hasUserAlreadyEvaluate ? (
        <p className="text-center">Vous avez déjà évalué cette activité</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col items-center mx-auto px-5 md:max-w-200 sm:max-w-150"
        >
          {formError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError}
            </div>
          )}

          <label
            htmlFor="comment"
            className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
          >
            Commentaire
          </label>
          <textarea
            name="comment"
            className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
            disabled={loading}
          ></textarea>

          {/* Array.from({ length: 100 }) */}
          <label
            htmlFor="grade"
            className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
          >
            Note <span className="text-red-500 font-normal">*</span>
          </label>
          <select
            name="grade"
            className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
            required
            disabled={loading}
          >
            {Array.from({ length: 5 }).map((_, id) => (
              <option key={id + 1} value={id + 1}>
                {id + 1}
              </option>
            ))}
          </select>
          <Button type="submit" color="gray" name="draft" disabled={loading}>
            Envoyer
          </Button>
        </form>
      )}
    </div>
  );
}
