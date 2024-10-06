import React from "react";

function ModalGlobal({
  modalOpen,
  setModalOpen,
  type, // 'success', 'danger', atau 'info'
  headerText,
  contentText,
  color, // warna untuk 'info' modal
}) {
  const modalClassName = {
    success: "bg-emerald-100 text-emerald-500",
    danger: "bg-rose-100 text-rose-500",
    info: color || "bg-yellow-100 text-yellow-500",
  }[type];

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`modal-overlay fixed inset-0 bg-black opacity-30 ${
              modalOpen ? "block" : "hidden"
            }`}
            onClick={() => setModalOpen(false)}></div>
          <div
            className={`modal-content ${modalClassName} overflow-hidden rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline">
            <div className="modal-header px-6 py-4">
              <h2 className="text-xl font-bold">{headerText}</h2>
              <div className="modal-body">{contentText}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalGlobal;
