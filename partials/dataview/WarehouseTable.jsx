import React, { useState, useEffect } from "react";
import WarehouseModalEdit from "../../pages/warehouseComponent/WarehouseModalEdit";
import config from "../../../config";
import ModalBasic from "../../components/ModalBasic";

function WarehouseTable() {

    const [selectAll, setSelectAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);


    const getWarehouseList = async (e) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await fetch(`${config.api_master}/warehouse/list?keyword=&active=Y&limit=100&offset=0&ouId=-99`, {
                method: "GET",
                headers: headers,
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Data Warehouse:', data);
                setList(data.result);
            } else {
                console.log('Gagal mengambil data Warehouse');
            }
        } catch (error) {
            console.error('Terjadi kesalahan remove:', error);
        }
    };

    const removeWarehouse = async (id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await fetch(`${config.api_master}/warehouse/remove/${id}`, {
                method: "GET",
                headers: headers,
            });
            if (response.ok) {
                console.log('Data berhasil dihapus');
            } else {
                console.error('Gagal menghapus data');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Memanggil removeWarehouse dengan id yang diberikan
            await removeWarehouse(id);
            // Setelah berhasil menghapus, Anda dapat memperbarui daftar atau melakukan tindakan lain yang diperlukan
            // Misalnya, menghapus item dari state list
            setList((prevList) => prevList.filter((item) => item.id !== id));
            console.log('Data berhasil dihapus');
        } catch (error) {
            console.error('Terjadi kesalahan handle:', error.message);
        }
    };

    const handleEdit = () => {
        console.log('Tombol Edit Diklik');
        setEditModalOpen(true);
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setIsCheck(list.map(li => li.id));
        if (selectAll) {
            setIsCheck([]);
        }
    };

    useEffect(() => {
        getWarehouseList();
    }, []);

    return (
        
        <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
       
            {/* {editModalOpen && (
                <WarehouseModalEdit
                    modalOpen={editModalOpen}
                    setModalOpen={setEditModalOpen}
                />
            )} */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                            <tr>
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                    <div className="flex items-center">
                                        <label className="inline-flex">
                                            <span className="sr-only">Select all</span>
                                            <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                        </label>
                                    </div>
                                </th>
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Warehouse Code</div>
                                </th>
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Name</div>
                                </th>
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Type</div>
                                </th>
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Location Business Unit</div>
                                </th>
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Country</div>
                                </th>
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Zip Code</div>
                                </th>
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Action</div>
                                </th>
                            </tr>
                        </thead>
                       
                        <tbody className="text-sm divide-y divide-slate-200">
                            {list.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                        <div className="flex items-center">
                                        {/* Checkbox */}
                                        <input className="form-checkbox" type="checkbox" />
                                        </div>
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        {item.warehouseCode}
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        {item.warehouseName}
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        {item.warehouseType}
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        {item.ouName}
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        {item.country}
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        {item.zipCode}
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        <div className="space-x-1">
                                            <button className="text-slate-400 hover:text-slate-500 rounded-full" onClick={(e)=> {e.stopPropagation(); setEditModalOpen(true); }}>
                                                <span className="sr-only">Edit</span>
                                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                    <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                                                </svg>
                                            </button>
                                           
                                            <button className="text-slate-400 hover:text-slate-500 rounded-full">
                                                <span className="sr-only">Download</span>
                                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                    <path d="M16 20c.3 0 .5-.1.7-.3l5.7-5.7-1.4-1.4-4 4V8h-2v8.6l-4-4L9.6 14l5.7 5.7c.2.2.4.3.7.3zM9 22h14v2H9z" />
                                                </svg>
                                            </button>
                                            <button className="text-rose-500 hover:text-rose-600 rounded-full" onClick={() => handleDelete(item.id)}>
                                                <span className="sr-only">Delete</span>
                                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                    <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                                    <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                
                            ))}
                        </tbody>
                        <WarehouseModalEdit
                        modalOpen={editModalOpen}
                        setModalOpen={setEditModalOpen}
                        ></WarehouseModalEdit>
                        
                    </table>
                    
                </div>
                
            </div>
        </div>
    );
}

export default WarehouseTable;