export interface ModalAddProductProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function ModalContainer({ setIsModalOpen, children }: ModalAddProductProps) {
  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/60 flex justify-center items-center z-20"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="max-w-[500px] w-[90%] shadow-lg p-6animate-fadeIn  text-black text-[0.8rem] 
    bg-[var(--main-low)] rounded-[var(--radius-medium)]
  "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
