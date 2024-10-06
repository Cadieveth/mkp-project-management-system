import React, {useState} from "react";

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ModalBasic from '../../components/ModalBasic';
import ModalCookies from '../../components/ModalCookies';
import ModalBlank from '../../components/ModalBlank';
import ModalAction from '../../components/ModalAction';
import ModalSearch from '../../components/ModalSearch';

import AnnouncementIcon from '../../images/announcement-icon.svg';
import ModalImage from '../../images/modal-image.jpg';

function WarehouseModalEdit({modalOpen,setModalOpen}) {
    return (
     
        <ModalBasic id="feedback-modal" modalOpen={modalOpen} setModalOpen={setModalOpen} title="Edit Warehouse">
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="text-sm">
            <div className="font-medium text-slate-800 mb-3">Ini judul kali kg kepake</div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-rose-500">*</span></label>
              <input id="name" className="form-input w-full px-2 py-1" type="text" required />
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(false); }}>Cancel</button>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Send</button>
          </div>
        </div>
      </ModalBasic>
    );
}

export default WarehouseModalEdit;