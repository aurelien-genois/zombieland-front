import { useAppDispatch } from "@/hooks/redux";
import { useActivity } from "@/hooks/activities";
import { updateActivity } from "@/store/reducers/activitiesReducer";
import { useParams } from "react-router";
import Button from "@/components/UI/BackOffice/Button";
import { useState } from "react";
import { useCategories } from "@/hooks/categories";

export default function ActivitiesManagementSingle() {
  const dispatch = useAppDispatch();
  // const { loading, error } = useAppSelector((state) => state.activitiesStore);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { categories } = useCategories();

  const params = useParams();
  const slug = String(params.slug) || "";
  const { currentActivity, loading, error } = useActivity(slug);

  const [isEditingMode, setEditingMode] = useState(false);

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

    if (!currentActivity) {
      setFormError("Activité non chargée.");
      return;
    }

    await dispatch(
      updateActivity({
        formData,
        action: submitEvent.submitter?.name,
        id: currentActivity.id,
      })
    );
    setSuccessMessage("L'activité a bien été mise à jour.");
    setEditingMode(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading activity...</p>
        </div>
      </div>
    );
  }
  if (error || !currentActivity) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Error loading activity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl min-w-full mx-auto p-6">
      <Button color="gray" type="router-link" to="/admin/management/activities">
        ← Retour liste
      </Button>

      <div>
        <h2 className="inline font-bold text-xl">Publié ? :</h2>
        &nbsp;{currentActivity.status == "published" ? "OUI" : "NON"}
        <br />
        <h2 className="inline font-bold text-xl">Crée le ? :</h2>
        &nbsp;{currentActivity.created_at}
        <br />
        <h2 className="inline font-bold text-xl">Mise à jour le ? :</h2>
        &nbsp;{currentActivity.updated_at}
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {isEditingMode ? (
        <form
          onSubmit={handleSubmit}
          className="mx-auto px-5 md:max-w-200 sm:max-w-150"
        >
          <Button color="gray" onClick={() => setEditingMode(false)}>
            Annuler
          </Button>

          {formError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError}
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
            defaultValue={currentActivity.name}
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
            defaultValue={currentActivity.slogan}
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
            defaultValue={currentActivity.description}
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
            defaultValue={currentActivity.minimum_age}
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
            defaultValue={currentActivity.duration}
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
            defaultChecked={currentActivity.disabled_access}
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
            defaultChecked={currentActivity.high_intensity}
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
            defaultValue={currentActivity.image_url}
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
            defaultValue={currentActivity.category_id}
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              type="submit"
              color="green"
              name="publish"
              disabled={loading}
            >
              {loading
                ? "Enregistrement..."
                : currentActivity.status == "published"
                ? "Enregistrer"
                : "Publier"}
            </Button>

            <Button type="submit" color="gray" name="draft" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer en brouillon"}
            </Button>
          </div>
        </form>
      ) : (
        <>
          <Button onClick={() => setEditingMode(true)}>Modifier ?</Button>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentActivity.name}
            </h1>
          </div>

          <h2 className="font-bold text-xl">Slogan</h2>
          <p>{currentActivity.slogan}</p>

          <h2 className="font-bold text-xl">Description</h2>
          <p>{currentActivity.description}</p>

          <div>
            <h2 className="inline font-bold text-xl">Categorie :</h2>
            &nbsp;{currentActivity.category.name}
            <br />
            <h2 className="inline font-bold text-xl">
              Groupe d'âge <span className="text-xs">(frousse)</span> :
            </h2>
            &nbsp;{currentActivity.minimum_age}
            <br />
            <h2 className="inline font-bold text-xl">Durée :</h2>
            &nbsp;{currentActivity.duration}
            <br />
            <h2 className="inline font-bold text-xl">Accès PMR :</h2>
            &nbsp;{currentActivity.disabled_access ? "OUI" : "NON"}
            <br />
            <h2 className="inline font-bold text-xl">Haute intensité :</h2>
            &nbsp;{currentActivity.high_intensity ? "OUI" : "NON"}
          </div>

          <h2 className="font-bold text-xl">Image</h2>
          <div className="text-sm font-medium text-gray-900">
            {currentActivity.image_url ? (
              <img
                src={currentActivity.image_url}
                height="40"
                className="h-44 max-w-60"
              />
            ) : (
              "Aucune image"
            )}
          </div>
        </>
      )}
    </div>
  );
}
