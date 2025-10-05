import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { createActivity } from "@/store/reducers/activitiesReducer";
import { useState } from "react";
import { useCategories } from "@/hooks/categories";
import { Link } from "react-router";

export default function ActivitiesCreation() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.activitiesStore);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { categories } = useCategories();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitEvent = e.nativeEvent as SubmitEvent & {
      submitter: HTMLElement & { name?: "draft" | "publish" | undefined };
    };
    const formData = new FormData(e.currentTarget);

    // const {
    //   name = "",
    //   slogan = "",
    //   description = "",
    //   age_group = "",
    //   duration = "",
    //   disabled_access = "",
    //   high_intensity = "",
    //   image_url = "",
    //   category_id = "",
    //   saved = false,
    // } = Object.fromEntries(formData) as {
    //   name?: string;
    //   slogan?: string;
    //   description?: string;
    //   age_group?: number;
    //   duration?: string;
    //   disabled_access?: boolean;
    //   high_intensity?: boolean;
    //   image_url?: string;
    //   category_id?: number;
    //   saved?: boolean;
    // };

    setFormError(null);

    // TODO validation

    dispatch(createActivity({ formData, action: submitEvent.submitter?.name }));
    setSuccessMessage("L'activité a bien été créée.");
  };

  return (
    <div className="max-w-7xl min-w-full mx-auto p-6">
      <Link
        to="/admin/management/activities"
        className="text-green-text font-bold"
      >
        Revenir à la liste
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Formulaire de création d'une activité
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto px-5 md:max-w-200 sm:max-w-150"
      >
        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {formError || error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <label
          htmlFor="name"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Nom <span className="text-red-500 font-normal">*</span>
        </label>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
          required
          disabled={loading}
        />

        <label
          htmlFor="slogan"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Slogan
        </label>
        <input
          type="text"
          name="slogan"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
          disabled={loading}
        />

        <label
          htmlFor="description"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Description <span className="text-red-500 font-normal">*</span>
        </label>
        <textarea
          name="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
          required
          disabled={loading}
        ></textarea>

        <label
          htmlFor="age_group"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Groupe d'âge <span className="text-xs">(frousse)</span>
          <span className="text-red-500 font-normal">*</span>
        </label>
        <input
          type="number"
          min="0"
          max="3"
          name="age_group"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
          required
          defaultValue="0"
          disabled={loading}
        />

        <label
          htmlFor="duration"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Durée
        </label>
        <input
          type="text"
          name="duration"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
          disabled={loading}
        />

        <label
          htmlFor="disabled_access"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Accès PMR
        </label>
        <input
          type="checkbox"
          name="disabled_access"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block checked:bg-black p-2.5"
          disabled={loading}
        />

        <label
          htmlFor="high_intensity"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Haute intensité
        </label>
        <input
          type="checkbox"
          name="high_intensity"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block checked:bg-black p-2.5"
          disabled={loading}
        />

        {/* // TODO upload file image */}
        <label
          htmlFor="image_url"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Image
        </label>
        <input
          type="text"
          name="image_url"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
          disabled={loading}
        />

        <label
          htmlFor="category_id"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Catégorie
        </label>
        <select
          name="category_id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
          required
          disabled={loading}
        >
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="submit"
          name="publish"
          disabled={loading}
          className="my-4 cursor-pointer w-50 bg-green-bg-btn hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-1 px-3 text-white font-bold border-3 text-2xl sm:text-lg border-grey-border-btn text-center block mx-auto"
          value={loading ? "Enregistrement..." : "Publier"}
        />

        <input
          type="submit"
          name="draft"
          disabled={loading}
          className="my-4 cursor-pointer w-50 bg-gray-700 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-1 px-3 text-white font-bold border-3 text-2xl sm:text-lg border-grey-border-btn text-center block mx-auto"
          value={loading ? "Enregistrement..." : "Enregistrer en brouillon"}
        />
      </form>
    </div>
  );
}
