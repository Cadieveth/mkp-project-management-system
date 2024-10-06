import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import Button from "../../../components/Button";
import config from "../../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faDoorOpen,
  faCheckToSlot,
  faCheck,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import PackageDropdown from "../../master/PackageCategory/PackageDropdown";
import BusinessDropdown from "../../master/BusinessCategory/BusinessDropdown";
import AccountDropdown from "../../master/Account/AccountDropdown";
import ProbabilityDropdown from "../../master/Probability/ProbabilityDropdown";
import SalesStageDropdown from "../../master/SalesStage/SalesStageDropdown";
import PicCommDropdown from "../../master/Partner/PicCommDropdown";
import PicProjDropdown from "../../master/Partner/PicProjDropdown";

function SprintEdit({}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { dataSprint } = useStateContext();

  // console.log("dataSprint: ", dataSprint);

  const [sprintCode, setSprintCode] = useState(dataSprint.sprintCode);
  const [sprintDate, setSprintDate] = useState(dataSprint.sprintDate);
  const [businessId, setBusinessId] = useState(dataSprint.businessCtgrId);
  const [accountId, setAccountId] = useState(dataSprint.accountId);
  const [projectId, setProjectId] = useState(dataSprint.projectCtgrId);
  const [probabilityId, setProbabilityId] = useState(dataSprint.probabilityId);
  const [picCommId, setPicCommId] = useState(dataSprint.picCommercialId);
  const [picProjectId, setPicrojectId] = useState(dataSprint.picProjectId);
  const [salesStageId, setSalesStageId] = useState(dataSprint.salesStageId);
  const [trafficVisitor, setTrafficVisitor] = useState(
    dataSprint.trafficVisitor
  );
  const [offerReleasedDate, setOfferReleasedDate] = useState(
    dataSprint.offerReleasedDate
  );
  const [offeringLetter, setOfferingLetter] = useState(
    dataSprint.linkOfferingLetter
  );
  const [estPRM, setEstPRM] = useState(dataSprint.estPotentialRevenueMonth);
  const [contractPeriod, setContractPeriod] = useState(
    dataSprint.contractPeriod
  );
  const [contractValue, setContractValue] = useState(
    dataSprint.totalContractValue
  );
  const [estClosing, setEstClosing] = useState(dataSprint.estClosingDate);
  const [actClosing, setActClosing] = useState(dataSprint.actualClosingDate);
  const [merchantName, setMerchantName] = useState(dataSprint.merchantName);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [cpName, setCpName] = useState("");
  const [cpAddress, setCpAddress] = useState("");
  const [cpPhone, setCpPhone] = useState("");
  const [cpEmail, setCpEmail] = useState("");
  const [cpDepartment, setCpDepartment] = useState("");
  const [tags, setTags] = useState(dataSprint.tags);
  const [remark, setRemark] = useState(dataSprint.remark);

  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickCancel = () => {
    navigate("/sprint");
  };

  const SaveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const requestBody = JSON.stringify({
        id: dataSprint.id,
        sprintCode: sprintCode,
        sprintDate: sprintDate,
        businessCtgrId: businessId,
        accountId: accountId,
        projectCtgrId: projectId,
        probabilityId: probabilityId,
        picCommercialId: picCommId,
        picProjectId: picProjectId,
        salesStageId: salesStageId,
        trafficVisitor: trafficVisitor,
        offerReleasedDate: offerReleasedDate,
        linkOfferingLetter: offeringLetter,
        estPotentialRevenueMonth: estPRM,
        contractPeriod: contractPeriod,
        totalContractValue: contractValue,
        estClosingDate: estClosing,
        actualClosingDate: actClosing,
        merchantName: merchantName,
        address: address,
        phone: phone,
        country: country,
        province: province,
        city: city,
        zipCode: zipCode,
        longitude: longitude,
        latitude: latitude,
        cpName: cpName,
        cpAddress: cpAddress,
        cpPhone: cpPhone,
        cpEmail: cpEmail,
        cpDepartment: cpDepartment,
        tags: tags,
        remark: remark,
      });

      const response = await fetch(`${config.api_ptms}/sprint/edit`, {
        method: "POST",
        headers: headers,
        body: requestBody,
      });
      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.meta.message);
        closePage();
      } else {
        setInfoMessage(responseData.meta.message);
      }
    } catch (error) {
      setErrorMessage(error);
      console.error("Error:", error);
    }
  };

  const closePage = () => {
    navigate("/sprint");
  };

  const formatDateForInput = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${year}-${month}-${day}`;
  };

  const removeDashesFromDate = (date) => {
    return date.replace(/-/g, ""); // Menghapus semua tanda strip
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-2xl text-slate-800 font-bold">
                Edit Sprint
              </h1>
            </div>
            <div className="flex justify-center items-center min-top-screen mb-10">
              <div className="w-4/5 mt-3">
                <div className="bg-white shadow-lg rounded overflow-hidden">
                  <div className="px-6 py-4">
                    {/* BUTTON */}
                    <div className="flex mb-6 ml-12 mt-2 justify-end">
                      <div className="ml-2">
                        <div className="mt-0">
                          <div className="flex flex-wrap items-center -m-1.5">
                            <div className="m-1.5">
                              <Button
                                type="tertiary"
                                iconName={faRightFromBracket}
                                text="Cancel"
                                onClick={handleClickCancel}
                              />
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="primary"
                                iconName={faCheckToSlot}
                                text="Save"
                                onClick={SaveEdit}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-2xl font-semibold text-center mb-10 mt-5">
                      SPRINT DATA FORM
                    </h1>
                    {/* Isi konten card di sini */}
                    {/* ROW 1 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="sprintCode">
                            Sprint No.
                          </label>
                          <input
                            id="sprintCode"
                            name="sprintCode"
                            className="form-input w-full"
                            type="text"
                            value={sprintCode}
                            onChange={(e) => setSprintCode(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="sprintDate">
                            Sprint Date
                          </label>
                          <input
                            id="sprintDate"
                            name="sprintDate"
                            className="form-input w-full"
                            type="date"
                            defaultValue={formatDateForInput(
                              dataSprint.sprintDate
                            )}
                            onChange={(e) =>
                              setSprintDate(
                                removeDashesFromDate(e.target.value)
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 2 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <PackageDropdown
                            value={dataSprint.projectCtgrId}
                            onSelect={(value) => setProjectId(parseInt(value))}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <BusinessDropdown
                            value={dataSprint.businessCtgrId}
                            onSelect={(value) => setBusinessId(parseInt(value))}
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 3 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <PicCommDropdown
                            value={dataSprint.picCommercialId}
                            onSelect={(value) => setPicCommId(parseInt(value))}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <PicProjDropdown
                            value={dataSprint.picProjectId}
                            onSelect={(value) =>
                              setPicrojectId(parseInt(value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 4 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <AccountDropdown
                            value={dataSprint.accountId}
                            onSelect={(value) => setAccountId(parseInt(value))}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="merchantName">
                            Merchant Name
                          </label>
                          <input
                            id="merchantName"
                            name="merchantName"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.merchantName}
                            onChange={(e) => setMerchantName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 5 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="country">
                            Country
                          </label>
                          <input
                            id="country"
                            name="country"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="province">
                            Province
                          </label>
                          <input
                            id="province"
                            name="province"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.province}
                            onChange={(e) => setProvince(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 6 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="city">
                            City
                          </label>
                          <input
                            id="city"
                            name="city"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="phone">
                            Phone
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 7 */}
                    <div className="flex mb-5 ml-12">
                      <div className="ml-2">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="zipCode">
                            Zip Code
                          </label>
                          <input
                            id="zipCode"
                            name="zipCode"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 8 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="longitude">
                            Longitude
                          </label>
                          <input
                            id="longitude"
                            name="longitude"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.longitude}
                            onChange={(e) =>
                              setLongitude(parseInt(e.target.value))
                            }
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="latitude">
                            Latitude
                          </label>
                          <input
                            id="latitude"
                            name="latitude"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.latitude}
                            onChange={(e) =>
                              setLatitude(parseInt(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 9 */}
                    <div className="mb-5 ml-14 mr-14">
                      <div className="ml-0">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="address">
                            Address
                          </label>
                          <div className="relative">
                            <input
                              id="address"
                              name="address"
                              className="form-input w-full"
                              type="text"
                              defaultValue={dataSprint.address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* CONTACT CARD */}
                    <div className="flex justify-center items-center min-top-screen mb-7">
                      <div className="w-full mt-3 ml-12 mr-12">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="default">
                          Contact Person
                        </label>
                        <div className="bg-white shadow-lg rounded overflow-hidden">
                          <div className="px-6 py-4">
                            {/* ROW 10.A */}
                            <div className="flex mb-5 justify-center">
                              <div className="mr-4">
                                <div className="w-80">
                                  <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="cpName">
                                    Name
                                  </label>
                                  <input
                                    id="cpName"
                                    name="cpName"
                                    className="form-input w-full"
                                    type="text"
                                    defaultValue={dataSprint.cpName}
                                    onChange={(e) => setCpName(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="w-80">
                                  <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="cpPhone">
                                    Phone
                                  </label>
                                  <input
                                    id="cpPhone"
                                    name="cpPhone"
                                    className="form-input w-full"
                                    type="text"
                                    defaultValue={dataSprint.cpPhone}
                                    onChange={(e) => setCpPhone(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* ROW 10.B */}
                            <div className="flex mb-5 justify-center">
                              <div className="mr-4">
                                <div className="w-80">
                                  <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="cpEmail">
                                    E-Mail
                                  </label>
                                  <input
                                    id="cpEmail"
                                    name="cpEmail"
                                    className="form-input w-full"
                                    type="text"
                                    defaultValue={dataSprint.cpEmail}
                                    onChange={(e) => setCpEmail(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="w-80">
                                  <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="cpDepartment">
                                    Department
                                  </label>
                                  <input
                                    id="cpDepartment"
                                    name="cpDepartment"
                                    className="form-input w-full"
                                    type="text"
                                    defaultValue={dataSprint.cpDepartment}
                                    onChange={(e) =>
                                      setCpDepartment(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            {/* ROW 10.C */}
                            <div className="mb-5 ml-12 mr-12">
                              <div className="ml-0">
                                <div className="w-full">
                                  <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="cpAddress">
                                    Address
                                  </label>
                                  <input
                                    id="cpAddress"
                                    name="cpAddress"
                                    className="form-input w-full"
                                    type="text"
                                    defaultValue={dataSprint.cpAddress}
                                    onChange={(e) =>
                                      setCpAddress(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ROW 11 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <ProbabilityDropdown
                            value={dataSprint.probabilityId}
                            onSelect={(value) =>
                              setProbabilityId(parseInt(value))
                            }
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <SalesStageDropdown
                            value={dataSprint.salesStageId}
                            onSelect={(value) =>
                              setSalesStageId(parseInt(value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 12 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="trafficVisitor">
                            Traffic Visitor
                          </label>
                          <input
                            id="trafficVisitor"
                            name="trafficVisitor"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.trafficVisitor}
                            onChange={(e) =>
                              setTrafficVisitor(parseFloat(e.target.value))
                            }
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="offerReleasedDate">
                            Offering Released
                          </label>
                          <input
                            id="offerReleasedDate"
                            name="offerReleasedDate"
                            className="form-input w-full"
                            type="date"
                            defaultValue={formatDateForInput(
                              dataSprint.offerReleasedDate
                            )}
                            onChange={(e) =>
                              setOfferReleasedDate(
                                removeDashesFromDate(e.target.value)
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 13 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="defauestClosingDatelt">
                            Est. Closing
                          </label>
                          <input
                            id="estClosingDate"
                            name="estClosingDate"
                            className="form-input w-full"
                            type="date"
                            defaultValue={formatDateForInput(
                              dataSprint.estClosingDate
                            )}
                            onChange={(e) =>
                              setEstClosing(
                                removeDashesFromDate(e.target.value)
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="actualClosingDate">
                            Actual Closing
                          </label>
                          <input
                            id="actualClosingDate"
                            name="actualClosingDate"
                            className="form-input w-full"
                            type="date"
                            defaultValue={formatDateForInput(
                              dataSprint.actualClosingDate
                            )}
                            onChange={(e) =>
                              setActClosing(
                                removeDashesFromDate(e.target.value)
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 14 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="estPotentialRevenueMonth">
                            Est. Potential Revenue of Month
                          </label>
                          <input
                            id="estPotentialRevenueMonth"
                            name="estPotentialRevenueMonth"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.estPotentialRevenueMonth}
                            onChange={(e) =>
                              setEstPRM(parseFloat(e.target.value))
                            }
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="contractPeriod">
                            Contract Period
                          </label>
                          <input
                            id="contractPeriod"
                            name="contractPeriod"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.contractPeriod}
                            onChange={(e) =>
                              setContractPeriod(parseFloat(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 15 */}
                    <div className="mb-5 ml-14 mr-14">
                      <div className="ml-0">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="totalContractValue">
                            Total Revenue
                          </label>
                          <input
                            id="totalContractValue"
                            name="totalContractValue"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.totalContractValue}
                            onChange={(e) =>
                              setContractValue(parseFloat(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 16 */}
                    <div className="flex mb-5 justify-center">
                      <div className="mr-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="tags">
                            Tags
                          </label>
                          <input
                            id="tags"
                            name="tags"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.tags}
                            onChange={(e) => setTags(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-96">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="linkOfferingLetter">
                            Offering Letter
                          </label>
                          <input
                            id="linkOfferingLetter"
                            name="linkOfferingLetter"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.linkOfferingLetter}
                            onChange={(e) => setOfferingLetter(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 17 */}
                    <div className="mb-10 ml-12 mr-14">
                      <div className="ml-2">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="remark">
                            Remark
                          </label>
                          <input
                            id="remark"
                            name="remark"
                            className="form-input w-full"
                            type="text"
                            defaultValue={dataSprint.remark}
                            onChange={(e) => setRemark(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* BUTTON */}
                    <div className="flex mb-6 ml-12 justify-begin">
                      <div className="ml-2">
                        <div className="mt-0">
                          <div className="flex flex-wrap items-center -m-1.5">
                            <div className="m-1.5">
                              <Button
                                type="tertiary"
                                iconName={faRightFromBracket}
                                text="Cancel"
                                onClick={handleClickCancel}
                              />
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="primary"
                                iconName={faCheckToSlot}
                                text="Save"
                                onClick={SaveEdit}
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default SprintEdit;
