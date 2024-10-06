import React, { useState, useEffect } from "react";
import {
  faCheck,
  faFloppyDisk,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import ModalCustom from "../../../components/ModalCustom";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import SwitchGlobal from "../../../components/SwitchGlobal";
import HardwareDropdown from "../../master/HardwarePackage/HardwareDropdown";
import { useStateContext } from "../../../ContextProvider";

export default function SurveyHardwareModal({
  modalOpen,
  setModalOpen,
  isEditing,
  sprintToHardwarePack,
  dataResult,
  getDataList,
  dataResultSurvey,
  isEditingSurveyForm,

  dataHardware,
}) {
  const { setNotif } = useStateContext();
  const [id, setId] = useState(-99);
  const [surveyId, setSurveyId] = useState(-99);
  const baseHardware = {
    hardwareName: { label: "", value: "" },
  };
  const [hardwareName, setHardwareName] = useState(baseHardware);
  const [qty, setQty] = useState(0);
  const [flgAdditional, setFlgAdditional] = useState("");
  const [remark, setRemark] = useState("");

  const saveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        id: dataResult.id,
        surveyId: dataResultSurvey.id,
        hardwareName: hardwareName.hardwareName.value,
        qty: qty,
        flgAdditional: flgAdditional,
        remark: remark,
      };
      const response = await fetch(`${config.api_ptms}/survey/hardware/edit`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        closeModal();
        getDataList();
        setNotif("success", responseData.meta.message);
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const saveAdd = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        surveyId: dataResultSurvey.id,
        hardwareName: hardwareName.hardwareName.value,
        qty,
        flgAdditional,
        remark,
      };
      const response = await fetch(`${config.api_ptms}/survey/hardware/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();
      if (response.ok) {
        closeModal();
        getDataList();
        setNotif("success", responseJSON.meta.message);
      } else {
        setNotif("warning", responseJSON.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const saveData = async () => {
    if (isEditingSurveyForm) {
      if (isEditing) {
        saveEdit();
      } else {
        saveAdd();
        console.log("ini di klik");
      }
    } else {
      dataHardware(hardwareName.hardwareName.value, qty, flgAdditional, remark);
    }
    return closeModal();
  };

  const closeModal = () => {
    if (isEditing) {
      setModalOpen(false);
      setHardwareName(dataResult.hardwareName);
      setQty(dataResult.qty);
      setFlgAdditional(dataResult.flgAdditional);
      setRemark(dataResult.remark);
    } else {
      setModalOpen(false);
      setHardwareName("");
      setQty("");
      setFlgAdditional("N");
      setRemark("");
    }
  };

  const handleFlgChange = (newValue) => {
    setFlgAdditional(newValue);
  };

  const handleClick = () => {
    console.log("isEditing Form Survey? ", isEditingSurveyForm);
    console.log("isEditing Notes? ", isEditing);
  };

  useEffect(() => {
    if (isEditing) {
      if (dataResult) {
        setHardwareName({
          hardwareName: {
            label: dataResult.hardwareName,
            value: dataResult.hardwareName,
          },
        });
        setQty(dataResult.qty);
        setFlgAdditional(dataResult.flgAdditional);
        setRemark(dataResult.remark);
      }
    } else {
      setHardwareName("");
      setQty("");
      setFlgAdditional("");
      setRemark("");
    }
  }, [isEditing, dataResult]);

  return (
    <ModalCustom
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      // title={isEditing ? "Package Data Edit" : "Package Data Add"}

      title={
        isEditingSurveyForm
          ? isEditing
            ? "Hardware Survey Edit"
            : "Hardware Survey Add"
          : "Hardware Survey Add"
      }
      type="3xl">
      <div className="px-5 py-0">
        {/* ROW 1 */}
        <div className="flex justify-between mt-2">
          <div className="w-1/2">
            <HardwareDropdown
              id={sprintToHardwarePack.projectCtgrId}
              value={hardwareName.hardwareName}
              onChange={(event, value) => {
                setHardwareName({
                  ...hardwareName,
                  hardwareName: value ?? {
                    label: "",
                    value: "",
                  },
                });
              }}
            />
          </div>
          <div className="w-1/2 ml-6 mt-0.5">
            <TextFieldGlobal
              label="Quantity"
              placeholder="Enter Amount of Quantity"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            />
          </div>
        </div>
        {/* ROW 3 */}
        <div className="flex justify-between mt-2">
          <div className="w-1/2">
            <SwitchGlobal
              label="Flg. Additional"
              value={flgAdditional}
              onChange={handleFlgChange}
            />
          </div>
          <div className="w-1/2 ml-6">
            <TextFieldGlobal
              label="Remark"
              multiline={true}
              rows={2}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-end space-x-2 mt-5 mb-5">
          <Button
            type="primary"
            iconName={
              isEditingSurveyForm
                ? isEditing
                  ? faCheck
                  : faFloppyDisk
                : faFloppyDisk
            }
            text={
              isEditingSurveyForm ? (isEditing ? "Update" : "Save") : "Save"
            }
            // onClick={isEditing ? saveEdit : saveAdd}
            onClick={saveData}
          />
        </div>
      </div>
    </ModalCustom>
  );
}
