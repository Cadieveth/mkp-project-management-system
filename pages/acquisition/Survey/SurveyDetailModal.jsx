import React, { useState, useEffect } from "react";
import {
  faCheck,
  faFloppyDisk,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import ModalCustom from "../../../components/ModalCustom";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import SwitchGlobal from "../../../components/SwitchGlobal";
import { useStateContext } from "../../../ContextProvider";
import ParameterDropdown from "../../master/ParameterPackage/ParameterDropdown";

export default function SurveyDetailModal({
  modalOpen,
  setModalOpen,
  isEditing,
  sprintToDetailPack,
  dataResult,
  getDataList,
  dataResultSurvey,
  isEditingSurveyForm,

  dataDetail,
}) {
  const { setNotif } = useStateContext();
  const [id, setId] = useState(-99);
  const [surveyId, setSurveyId] = useState(-99);
  const [projectCtgrId, setProjectCtgrId] = useState(-99);
  const baseParameter = {
    parameterTitle: { label: "", value: "" },
  };
  const [parameterTitle, setParameterTitle] = useState(baseParameter);
  const [parameterValue, setParameterValue] = useState("");
  const [remark, setRemark] = useState("");
  const [flgAdditional, setFlgAdditional] = useState("");

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
        projectCtgrId: sprintToDetailPack.projectCtgrId,
        parameterTitle: parameterTitle.parameterTitle.value,
        parameterValue: parameterValue,
        remark: remark,
        flgAdditional: flgAdditional,
      };
      const response = await fetch(`${config.api_ptms}/survey/detail/edit`, {
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
        projectCtgrId: sprintToDetailPack.projectCtgrId,
        parameterTitle: parameterTitle.parameterTitle.value,
        parameterValue,
        remark,
        flgAdditional,
      };
      const response = await fetch(`${config.api_ptms}/survey/detail/add`, {
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
      }
    } else {
      dataDetail(
        projectCtgrId,
        parameterTitle.parameterTitle.value,
        parameterValue,
        remark,
        flgAdditional
      );
    }
    return closeModal();
  };

  const closeModal = () => {
    if (isEditing) {
      setModalOpen(false);
      setParameterTitle(dataResult.parameterTitle);
      setParameterValue(dataResult.parameterValue);
      setRemark(dataResult.remark);
      setFlgAdditional(dataResult.flgAdditional);
    } else {
      setModalOpen(false);
      setParameterTitle("");
      setParameterValue("");
      setRemark("");
      setFlgAdditional("");
    }
  };

  const handleClick = () => {
    console.log("CheckPack: ", sprintToDetailPack);
    console.log("Data dari table Edit: ", dataResult);
    console.log("is Editing Form Survey? ", isEditingSurveyForm);
    console.log("is Editing Note? ", isEditing);
  };

  const handleFlgChange = (newValue) => {
    setFlgAdditional(newValue);
  };

  useEffect(() => {
    if (isEditing) {
      if (dataResult) {
        setParameterTitle({
          parameterTitle: {
            label: dataResult.parameterTitle,
            value: dataResult.parameterTitle,
          },
        });
        setParameterValue(dataResult.parameterValue);
        setRemark(dataResult.remark);
        setFlgAdditional(dataResult.flgAdditional);
      }
    } else {
      setParameterTitle({
        parameterTitle: {
          label: "",
          value: "",
        },
      });
      setParameterValue("");
      setRemark("");
      setFlgAdditional("N");
    }
  }, [isEditing, dataResult]);

  return (
    <ModalCustom
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={
        isEditingSurveyForm
          ? isEditing
            ? "Survey Detail Edit"
            : "Survey Detail Add"
          : "Survey Detail Add"
      }
      type="3xl">
      <div className="px-5 py-0">
        {/* ROW 1 */}
        <div className="flex justify-between mt-2">
          <div className="w-full">
            <TextFieldGlobal
              label="Project Category"
              value={sprintToDetailPack.projectCtgrName}
            />
          </div>
        </div>
        {/* ROW 2 */}
        <div className="flex justify-between mt-2">
          <div className="w-1/2">
            <ParameterDropdown
              id={sprintToDetailPack.projectCtgrId}
              value={parameterTitle.parameterTitle}
              onChange={(event, value) => {
                setParameterTitle({
                  ...parameterTitle,
                  parameterTitle: value ?? {
                    label: "",
                    value: "",
                  },
                });
              }}
            />
          </div>
          <div className="w-1/2 ml-6 mt-0.5">
            <TextFieldGlobal
              label="Parameter Value"
              value={parameterValue}
              onChange={(e) => setParameterValue(e.target.value)}
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
            onClick={saveData}
          />
        </div>
      </div>
    </ModalCustom>
  );
}
