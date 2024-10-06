import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import { useStateContext } from "../../../ContextProvider";

import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import Button from "../../../components/Button";
import config from "../../../../config";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import DatePickerNew from "../../../components/DatePickerNew";

import MicrositeCheckBox from "./MicrositeCheckBox";

export default function MicrositeForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setLoadingState, setNotif, isEditing, dataEdit, surveyPack } =
    useStateContext();
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState([]);

  const [showDocumentRowLeft, setShowDocumentRowLeft] = useState(false);
  const [showDocumentRowRight, setShowDocumentRowRight] = useState(false);

  const [file, setFile] = useState();
  const [merchantName, setMerchantName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [locationImplementation, setLocationImplementation] = useState("");
  const [totalDeviceUse, setTotalDeviceUse] = useState("");
  const [cpNik, setCpNik] = useState("");
  const [cpName, setCpName] = useState("");
  const [cpAddress, setCpAddress] = useState("");
  const [cpPhone, setCpPhone] = useState("");
  const [cpEmail, setCpEmail] = useState("");
  const [cpDepartment, setCpDepartment] = useState("");
  const [cpNpwp, setCpNpwp] = useState("");
  const [cpPhoneOffice, setCpPhoneOffice] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [accountName, setAccountName] = useState("");
  const [emailDisbursementNotif, setEmailDisbursementNotif] = useState("");
  const [ktpPic, setKtpPic] = useState();
  const [ktpDirectors, setKtpDirectors] = useState();
  const [npwpDirectors, setNpwpDirectors] = useState();
  const [npwpOffice, setNpwpOffice] = useState();
  const [aktaOffice, setAktaOffice] = useState();
  const [aktaAmantmend, setAktaAmantmend] = useState();
  const [skKemenkeh, setSkKemenkeh] = useState();
  const [nib, setNib] = useState();
  const [siup, setSiup] = useState();
  const [photoOffice, setPhotoOffice] = useState();
  const [paymentChannel, setPaymentChannel] = useState([]);

  const saveAdd = async () => {
    setLoadingState(true);
    try {
      const formData = new FormData();
      formData.append("id", "25");
      formData.append("merchantName", merchantName);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("country", country);
      formData.append("province", province);
      formData.append("district", district);
      formData.append("subDistrict", subDistrict);
      formData.append("zipCode", zipCode);
      formData.append("longitude", longitude);
      formData.append("latitude", latitude);
      formData.append("locationImplementation", locationImplementation);
      formData.append("totalDeviceUse", totalDeviceUse);
      formData.append("cpNik", cpNik);
      formData.append("cpName", cpName);
      formData.append("cpAddress", cpAddress);
      formData.append("cpPhone", cpPhone);
      formData.append("cpDepartment", cpDepartment);
      formData.append("cpEmail", cpEmail);
      formData.append("cpNpwp", cpNpwp);
      formData.append("cpPhoneOffice", cpPhoneOffice);
      formData.append("bankName", bankName);
      formData.append("accountNo", accountNo);
      formData.append("accountName", accountName);
      formData.append("emailDisbursementNotif", emailDisbursementNotif);
      formData.append("ktpPic", ktpPic);
      formData.append("ktpDirectors", ktpDirectors);
      formData.append("npwpDirectors", npwpDirectors);
      formData.append("npwpOffice", npwpOffice);
      formData.append("aktaOffice", aktaOffice);
      formData.append("aktaAmantmend", aktaAmantmend);
      formData.append("skKemenkeh", skKemenkeh);
      formData.append("nib", nib);
      formData.append("siup", siup);
      formData.append("photoOffice", photoOffice);
      formData.append("paymentChannel", selectedPayment);

      const response = await fetch(
        `http://localhost:15001/ptms/confirm-letter-merchant`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Upload success");
      } else {
        const data = await response.json();
        console.log("Gagal: ", data.meta.message);
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("Error ", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(`${config.api_ptms}/sprint/detail/25`, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      if (response.ok) {
        setMerchantName(data.result.merchant.merchantName);
        setAddress(data.result.merchant.address);
        setCountry(data.result.merchant.country);
        setProvince(data.result.merchant.province);
        setPhone(data.result.merchant.phone);
        setDistrict(data.result.merchant.district);
        setSubDistrict(data.result.merchant.subDistrict);
        setZipCode(data.result.merchant.zipCode);
        setLongitude(data.result.merchant.longitude);
        setLatitude(data.result.merchant.latitude);
        setLocationImplementation(data.result.merchant.locationImplementation);
        setTotalDeviceUse(data.result.merchant.totalDeviceUse);
        setCpNik(data.result.merchant.cpNik);
        setCpName(data.result.merchantCp.cpName);
        setCpAddress(data.result.merchantCp.cpAddress);
        setCpPhone(data.result.merchantCp.cpPhone);
        setCpEmail(data.result.merchantCp.cpEmail);
        setCpDepartment(data.result.merchantCp.cpDepartment);
        setCpNpwp(data.result.merchantCp.cpNpwp);
        setCpPhoneOffice(data.result.merchantCp.cpPhoneOffice);
        setBankName(data.result.merchantBank.bankName);
        setAccountNo(data.result.merchantBank.accountNo);
        setAccountName(data.result.merchantBank.accountName);
        setEmailDisbursementNotif(
          data.result.merchantBank.emailDisbursementNotif
        );
        setSelectedPayment(data.result.merchant.paymentChannel);
      } else {
        console.log("Gagal: ", data.meta.message);
        setNotif("warning", "Unable to Retrieve Sprint Data");
      }
    } catch (error) {
      console.error(error);
      setNotif("Error ", error.message);
    }
  };

  const handlePaymentChanel = (selectedValues) => {
    setSelectedPayment(selectedValues);
  };

  const handleFile = (event) => {
    setKtpPic(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileKtpDirectors = (event) => {
    setKtpDirectors(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileNpwpDirectors = (event) => {
    setNpwpDirectors(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileNpwpOffice = (event) => {
    setNpwpOffice(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileAktaOffice = (event) => {
    setAktaOffice(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileAktaAmantmend = (event) => {
    setAktaAmantmend(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileSkKemenkeh = (event) => {
    setSkKemenkeh(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileNib = (event) => {
    setNib(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileSiup = (event) => {
    setSiup(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFilePhotoOffice = (event) => {
    setPhotoOffice(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  useEffect(() => {
    // Check the selected payments and set the visibility accordingly
    const selectedPaymentsSet = new Set(selectedPayment);

    if (selectedPaymentsSet.has("QRIS")) {
      setShowDocumentRowLeft(true);
      setShowDocumentRowRight(false);
    } else if (
      selectedPaymentsSet.has("FLAZZ") ||
      selectedPaymentsSet.has("TAPCASH") ||
      selectedPaymentsSet.has("BRIZZI") ||
      selectedPaymentsSet.has("E-MONEY")
    ) {
      setShowDocumentRowLeft(false);
      setShowDocumentRowRight(true);
    } else {
      setShowDocumentRowLeft(true);
      setShowDocumentRowRight(false);
    }
    if (selectedPaymentsSet.size === 0) {
      setShowDocumentRowLeft(false);
      setShowDocumentRowRight(false);
    }
  }, [selectedPayment]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
            <div className="flex justify-center items-center min-top-screen mb-10">
              <div className="w-full">
                <div className="bg-white shadow-lg overflow-hidden border border-slate-200 rounded-2xl">
                  <div className="px-6 py-4">
                    {/* BUTTON TOP */}
                    <div className="flex mb-6 ml-12 mt-2 justify-end">
                      <div className="flex flex-wrap items-center -m-1.5">
                        <div className="m-1.5">
                          <Button
                            type="tertiary"
                            iconName={faArrowLeft}
                            text="Back"
                          />
                        </div>
                        <div className="m-1.5">
                          <Button
                            type="primary"
                            iconName={faCheck}
                            text="Save"
                          />
                        </div>
                      </div>
                    </div>
                    <h1 className="text-2xl font-semibold text-center mb-10 mt-5">
                      {`Microsite Confirmation Letter Merchant`}
                    </h1>
                    {/* OWNER */}
                    <div className="text-sm font-bold px-10">DATA OWNER</div>
                    <div className="\rounded-xl px-10 py-3">
                      {/* ROW 1 */}
                      <div className="w-full flex justify-between">
                        <div className="w-1/2 mr-5">
                          <TextFieldGlobal
                            label="No. KTP (NIK)"
                            placeholder="Enter KTP Number (NIK)"
                            value={cpNik}
                            onChange={(e) => setCpNik(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 ml-5">
                          <TextFieldGlobal
                            label="Name"
                            placeholder="Enter your Name"
                            value={cpName}
                            onChange={(e) => setCpName(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* ROW 2 */}
                      <div className="w-full flex justify-between mt-2">
                        <div className="w-1/2 mr-5">
                          <TextFieldGlobal
                            label="NPWP (Optional)"
                            placeholder="Enter your Tax ID (NPWP) if available"
                            value={cpNpwp}
                            onChange={(e) => setCpNpwp(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 ml-5">
                          <TextFieldGlobal
                            label="Email"
                            placeholder="Enter your Email Address"
                            value={cpEmail}
                            onChange={(e) => setCpEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* ROW 3 */}
                      <div className="w-full flex justify-between mt-2">
                        <div className="w-1/2 mr-5">
                          <TextFieldGlobal
                            label="Phone Number"
                            placeholder="Enter your Phone Number or Whatsapp"
                            value={cpPhone}
                            onChange={(e) => setCpPhone(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 ml-5">
                          <TextFieldGlobal
                            label="Phone Office"
                            placeholder="Enter your Phone Office Number"
                            value={cpPhoneOffice}
                            onChange={(e) => setCpPhoneOffice(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* MERCHANT */}
                    <div className="text-sm font-bold mt-5 px-10">
                      DATA MERCHANT
                    </div>
                    <div className="rounded-xl px-10 py-3">
                      {/* ROW 1 */}
                      <div className="w-full flex justify-between">
                        <div className="w-1/2 mr-5">
                          <TextFieldGlobal
                            label="Company Name"
                            placeholder="Input Company Name"
                            value={merchantName}
                            onChange={(e) => setMerchantName(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 ml-5">
                          <TextFieldGlobal
                            label="Implementation Location"
                            placeholder="Input Location of Implementation"
                            value={locationImplementation}
                            onChange={(e) =>
                              setLocationImplementation(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      {/* ROW 2 */}
                      <div className="w-full flex justify-between mt-2">
                        <div className="w-1/2 mr-5">
                          <TextFieldGlobal
                            label="Sub District"
                            placeholder="Input Sub District"
                            value={subDistrict}
                            onChange={(e) => setSubDistrict(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 ml-5">
                          <TextFieldGlobal
                            label="Ward"
                            placeholder="Input Ward"
                          />
                        </div>
                      </div>
                      {/* ROW 3 */}
                      <div className="w-full flex justify-between mt-2">
                        <div className="w-1/2 mr-5">
                          <TextFieldGlobal
                            label="Longitude"
                            placeholder="Example: 38.8951"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 ml-5">
                          <TextFieldGlobal
                            label="Latitude"
                            placeholder="Example: -77.0364"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* ROW 4 & 5 */}
                      <div className="w-full flex justify-between mt-2">
                        <div className="w-1/2 mr-5">
                          <div>
                            <TextFieldGlobal
                              label="Zip Code"
                              placeholder="Input Zip Code"
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <TextFieldGlobal
                              label="Total Device Use"
                              placeholder="Input Total Device Use"
                              value={totalDeviceUse}
                              onChange={(e) =>
                                setTotalDeviceUse(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="w-1/2 ml-5 mt-1.5">
                          <TextFieldGlobal
                            label="Address"
                            placeholder="Input Merchant Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={3}
                            multiline={3}
                          />
                        </div>
                      </div>
                      {/* ROW 6 */}
                      <div className="flex justify-between">
                        <div className="w-full mt-5">
                          <div
                            className="text-xs font-semibold"
                            style={{ color: "#737379" }}>
                            Select Payment Methods
                          </div>
                          <div className="ml-0.5">
                            <MicrositeCheckBox
                              onChange={(selectedPayment) =>
                                setSelectedPayment(selectedPayment)
                              }
                              selectedPayment={selectedPayment}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* BANK */}
                    <div className="text-sm font-bold mt-5 px-10">
                      DATA BANK
                    </div>
                    <div className="rounded-xl px-10 py-3">
                      {/* ROW 1 */}
                      <div className="w-full flex justify-between">
                        <div className="w-1/2 mr-5">
                          <TextFieldGlobal
                            label="Bank Disbursement Name"
                            placeholder="Enter Bank Disbursement Name"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 ml-5">
                          <TextFieldGlobal
                            label="Account Number"
                            placeholder="Input the Account Number"
                            value={accountNo}
                            onChange={(e) => setAccountNo(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* ROW 2 */}
                      <div className="w-full flex justify-between mt-2">
                        <div className="w-1/2 mr-5">
                          <TextFieldGlobal
                            label="Account Owner Name"
                            placeholder="Enter Name of Account Owner"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 ml-5">
                          <TextFieldGlobal
                            label="Email Notification Disbursement"
                            placeholder="Enter your Email Address for Disbursement Notification"
                            value={emailDisbursementNotif}
                            onChange={(e) =>
                              setEmailDisbursementNotif(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* DOCUMENT */}
                    <div className="text-sm font-bold mt-5 px-10">DOCUMENT</div>
                    <div className="rounded-xl px-10 py-10">
                      <div className="w-full flex justify-between">
                        {/* ROW LEFT */}
                        {showDocumentRowLeft && (
                          <div className="w-1/2 mr-5">
                            <div className="font-bold mb-1">Document QRIS</div>
                            <div className="border rounded-xl px-10 py-5">
                              <div>
                                {/* Attach File 1 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    KTP PIC
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFile}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {/* Attach File 2 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    KTP Director's
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileKtpDirectors}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {/* Attach File 3 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    NPWP Director's
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileNpwpDirectors}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {/* Attach File 4 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    NPWP Company
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileNpwpOffice}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {/* Attach File 5 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    Deed of Company
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileAktaOffice}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {/* Attach File 6 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    Latest Amandment Deed (Optional)
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileAktaAmantmend}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {/* Attach File 7 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    SK Kemenkeh
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileSkKemenkeh}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {/* Attach File 8 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    NIB
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileNib}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                {/* Attach File 9 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    SIUP
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileSiup}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 mb-5">
                                {/* Attach File 10 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    Location Photo Showing the Name Sign
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFilePhotoOffice}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* ROW RIGHT */}
                        {showDocumentRowRight && (
                          <div className="w-1/2 ml-5">
                            <div className="font-bold mb-1">
                              Document Prepaid
                            </div>
                            <div className="border rounded-xl px-10 py-5">
                              <div>
                                {/* Attach File 1 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    KTP PIC
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFile}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 mb-5">
                                {/* Attach File 2 */}
                                <div className="w-full mt-3">
                                  <div className="text-sm font-semibold mb-1">
                                    NPWP PIC / NPWP Company
                                  </div>
                                  <div className="text-xs">
                                    <form>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={handleFile}
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* BUTTON BOTTOM */}
                      <div className="flex mb-6 ml-12 mt-2 justify-end">
                        <div className="flex flex-wrap items-center -m-1.5">
                          <div className="m-1.5">
                            <Button
                              type="tertiary"
                              iconName={faArrowLeft}
                              text="Back"
                            />
                          </div>
                          <div className="m-1.5">
                            <Button
                              type="primary"
                              iconName={faCheck}
                              text="Save"
                              onClick={saveAdd}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
