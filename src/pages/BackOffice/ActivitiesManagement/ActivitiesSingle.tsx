import { usePublishedActivity } from "@/hooks/activities";
import { Link, useParams } from "react-router";

export default function ActivitiesManagementSingle() {
  const params = useParams();
  const slug = String(params.slug) || "";

  const { currentActivity, loading, error } = usePublishedActivity(slug);

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
    <div className="max-w-7xl mx-auto p-6">
      <Link
        to="/admin/management/activities"
        className="text-green-text font-bold"
      >
        Revenir à la liste
      </Link>

      <p>
        <h2 className="inline font-bold text-xl">Publié ? :</h2>
        &nbsp;{currentActivity.status == "published" ? "OUI" : "NON"}
        <br />
        <h2 className="inline font-bold text-xl">Crée le ? :</h2>
        &nbsp;{currentActivity.created_at}
        <br />
        <h2 className="inline font-bold text-xl">Mise à jour le ? :</h2>
        &nbsp;{currentActivity.updated_at}
      </p>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {currentActivity.name}
        </h1>
      </div>

      <h2 className="font-bold text-xl">Slogan</h2>
      <p>{currentActivity.slogan}</p>

      <h2 className="font-bold text-xl">Description</h2>
      <p>{currentActivity.description}</p>

      <p>
        <h2 className="inline font-bold text-xl">Categorie :</h2>
        &nbsp;{currentActivity.category.name}
        <br />
        <h2 className="inline font-bold text-xl">
          Groupe d'âge (niveau de frousse) :
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
      </p>

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
    </div>
  );
}
