import { useState } from "react";
import ModalContainer from "./ContainerModal";
import { useAppDispatch } from "@/hooks/redux";
import {
  deleteCategory,
  fetchCategories,
} from "@/store/reducers/categoriesReducer";
import type { ICategory } from "@/@types";
import Button from "@/components/UI/BackOffice/Button";

interface DeleteCategoryModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryToDelete: React.Dispatch<React.SetStateAction<ICategory | null>>;
  category: ICategory;
  // pour rafraîchir la liste après succès :
  queries: {
    currentPage: number;
  };
}

export default function DeleteCategoryModal({
  setIsModalOpen,
  setCategoryToDelete,
  category,
  queries,
}: DeleteCategoryModalProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const categoryName = category.name;
      await dispatch(deleteCategory(category.id));
      setMsg(`Catégorie ${categoryName} supprimée avec succès.`);
      // refresh liste
      await dispatch(
        fetchCategories({ page: queries.currentPage, perPage: 20 })
      );
      // ferme après un petit délai (optionnel)
      setTimeout(() => {
        setIsModalOpen(false);
        setCategoryToDelete(null);
      }, 300);
    } catch {
      setMsg("Une erreur est survenue. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalContainer setIsModalOpen={setIsModalOpen}>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center border border-red-600">
        <h2 className="text-lg font-semibold mb-2">
          Supprimer cette catégorie ?
        </h2>
        <p className="text-xl">{category.name}</p>
        <p className="text-sm text-gray-600">
          Cette action est irréversible (ID: {category.id}).
        </p>

        <form onSubmit={onSubmit}>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              color="gray"
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" color="red" disabled={loading}>
              {loading ? "Suppression..." : "Supprimer"}
            </Button>
          </div>

          {msg && <div className="mt-4 text-red-600">{msg}</div>}
        </form>
      </div>
    </ModalContainer>
  );
}
