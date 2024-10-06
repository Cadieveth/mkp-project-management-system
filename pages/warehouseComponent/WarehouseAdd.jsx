import React, { useState } from "react";
import config from "../../../config";
import { Link } from 'react-router-dom';
import LogoMkp from "../../images/logo-mkp.png";

function Add() {
    const [formData, setFormData] = useState({
        warehouseCode: "",
        warehouseName: "",
        ouId: null,
        country: "",
        province: "",
        city: "",
        address: "",
        zipCode: "",
        warehouseType: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const AddWarehouse = async (e) => {
        try {
            // Konversi ouId ke int
            const formDataToSend = {
                ...formData,
                ouId: parseInt(formData.ouId),
            };
            const accessToken = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${config.api_master}/warehouse/add`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(formDataToSend),
            });
            if (response.ok) {
                console.log('Data berhasil ditambahkan.');
            } else {
                console.log('Gagal menambahkan data Warehouse');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    return (
        <>
            <header className="bg-white border-b border-slate-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 -mb-px">
                        <div className="flex items-center">
                            <img src={LogoMkp} alt="Logo MKP" width={"32"} height={"32"} />
                            <div className="ml-3">
                    <h1 className="text-small text-slate-20 font-bold text-black">
                    MKP for Business
                    </h1>
                    <h1 className="text-[9px] text-black">
                    The Most Reliable Traffic Intelligence Company
                    </h1>
                </div>
                        </div>
                        <Link className="block rounded-full bg-slate-100 text-slate-500 hover:text-slate-600" to="/partials/dataview/warehouse">
                            <span className="sr-only">Back</span>
                            <svg width="32" height="32" viewBox="0 0 32 32">
                                <path className="fill-current" d="M15.95 14.536l4.242-4.243a1 1 0 111.415 1.414l-4.243 4.243 4.243 4.242a1 1 0 11-1.415 1.415l-4.242-4.243-4.243 4.243a1 1 0 01-1.414-1.415l4.243-4.242-4.243-4.243a1 1 0 011.414-1.414l4.243 4.243z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-8xl mx-auto">
                    <div className="px-10 pb-6 rounded-b shadow-lg">

                        {/* Card header */}
                        <div className="text-center mb-6">
                            <div className="mb-10"></div>
                            <h1 className="text-xl leading-snug text-slate-800 font-semibold mb-2">Form Warehouse Data</h1>
                        </div>

                        <div>
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <div  className="flex-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="warehouse-code">Warehouse Code<span className="text-rose-500">*</span></label>
                                        <input id="warehouse-code" className="form-input w-full" type="text" name="warehouseCode" value={formData.warehouseCode} onChange={handleChange} placeholder="Insert Warehouse Code" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="warehouse-name">Warehouse Name<span className="text-rose-500">*</span></label>
                                        <input id="warehouse-name" className="form-input w-full" type="text" name="warehouseName" value={formData.warehouseName} onChange={handleChange} placeholder="Insert Warehouse Name" />
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <div  className="flex-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="warehouse-type">Warehouse Type<span className="text-rose-500">*</span></label>
                                        <select id="warehouse-type" className="form-select w-full" name="warehouseType" value={formData.warehouseType || ''} onChange={handleChange}>
                                            <option value="" disabled>Choose Option</option>
                                            <option value="PRODUCTION">PRODUCTION</option>
                                            <option value="PROJECT">PROJECT</option>
                                            <option value="SALES">SALES</option>
                                        </select>
                                    </div>
                                    <div  className="flex-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="ou-id">Location Business Unit<span className="text-rose-500">*</span></label>
                                        <select id="ou-id" className="form-select w-full" name="ouId" value={formData.ouId || ''} onChange={handleChange}>
                                            <option value="" disabled>Choose Option</option>
                                            <option value={10}>MKP E-TICKETING</option>
                                            <option value={11}>MKP MOBILE</option>
                                            <option value={206}>UDB DEMO</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <div  className="flex-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="country">Country<span className="text-rose-500">*</span></label>
                                        <input id="country" className="form-input w-full" type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Insert Country" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="province">Province<span className="text-rose-500">*</span></label>
                                        <input id="province" className="form-input w-full" type="text" name="province" value={formData.province} onChange={handleChange} placeholder="Insert Province" />
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <div  className="flex-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="city">City<span className="text-rose-500">*</span></label>
                                        <input id="city" className="form-input w-full" type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Insert City" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="zip-code">Zip Code<span className="text-rose-500">*</span></label>
                                        <input id="zip-code" className="form-input w-full" type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Insert Zip Code" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="address">Address<span className="text-rose-500">*</span></label>
                                    <input id="address" className="form-input w-full" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Insert Address" />
                                </div>
                            </div>
                            {/* htmlForm footer */}
                            <div className="mt-6">
                                <div className="mb-4">
                                    <button className="btn w-20 bg-indigo-500 hover:bg-indigo-600 text-white" onClick={AddWarehouse}>SAVE</button>
                                </div>
                                <div className="text-xs text-slate-500 italic text-center">Large commercial building or facility used for the storage of goods, products, and materials.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
      );
}

export default Add;