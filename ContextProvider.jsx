import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState("false");
  const modalOpenClose = (isopen) => {
    setOpenModal(isopen); //modal function changed
  };

  const [loading, setLoading] = useState(false);

  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  // const [dataParam, setDataParam] = useState("dataa");

  // const setNewDataParam = (newData) => {
  //   setDataParam(newData);
  // };

  const [data, setData] = useState("dataa");

  const setNewData = (newData) => {
    setData(newData);
  };

  const [dataHardware, setDataHardware] = useState("dataa");

  const setNewDataHardware = (newData) => {
    setDataHardware(newData);
  };

  const [dataSprint, setDataSprint] = useState("dataa");

  const setNewDataSprint = (newData) => {
    setDataSprint(newData);
  };

  const [taskSprint, setTaskSprint] = useState({});

  const setNewTaskSprint = (newData) => {
    setTaskSprint(newData);
  };

  const [dataTask, setDataTask] = useState("dataa");

  const setNewDataTask = (newData) => {
    setDataTask(newData);
  };

  const [divisionId, setDivisionId] = useState(-99);

  const setNewDivisionId = (newData) => {
    setDivisionId(newData);
  };

  const [divisionPack, setDivisionPack] = useState({});

  const setNewDivisionPack = (newData) => {
    setDivisionPack(newData);
  };

  const [momPack, setMomPack] = useState({});

  const setNewMomPack = (newData) => {
    setMomPack(newData);
  };

  const [surveyPack, setSurveyPack] = useState({});

  const setNewSurveyPack = (newData) => {
    setSurveyPack(newData);
  };

  const [hardwarePack, setHardwarePack] = useState({});

  const setNewHardwarePack = (newData) => {
    setHardwarePack(newData);
  };

  const [parameterPack, setParameterPack] = useState({});

  const setNewParameterPack = (newData) => {
    setParameterPack(newData);
  };

  const [isEditing, setIsEditing] = useState(false);

  const statusIsEditing = (newData) => {
    setIsEditing(newData);
  };

  const [openViaDivision, setopenViaDivision] = useState(false);

  const statusOpenViaDivision = (newData) => {
    setopenViaDivision(newData);
  };

  const [dataMom, setDataMom] = useState({});
  const setNewDataMom = (newData) => {
    setDataMom(newData);
  };

  const [dataEdit, setDataEdit] = useState({});

  const setNewDataEdit = (newData) => {
    setDataEdit(newData);
  };

  const [notifType, setNotificationType] = useState("success");
  const [notifMsg, setNotificationMessage] = useState("");
  const [notification, setNotificationOpen] = useState(false);

  const setNotif = (type, message) => {
    if (type === "error") {
      const stackTrace = new Error().stack;
      console.log(stackTrace);
    }
    setNotificationType(type);
    setNotificationMessage(message);
    setNotificationOpen(true);

    setTimeout(() => {
      setNotificationOpen(false);
    }, 3000);
  };

  return (
    <StateContext.Provider
      value={{
        openModal,
        modalOpenClose,
        // dataParam,
        // setNewDataParam,
        data,
        setNewData,
        dataHardware,
        setNewDataHardware,
        dataSprint,
        setNewDataSprint,
        loading,
        setLoadingState,
        notifType,
        notifMsg,
        notification,
        setNotif,
        dataTask,
        setNewDataTask,
        isEditing,
        statusIsEditing,
        divisionId,
        setNewDivisionId,
        momPack,
        setNewMomPack,
        surveyPack,
        setNewSurveyPack,
        dataMom,
        setNewDataMom,
        dataEdit,
        setNewDataEdit,
        divisionPack,
        setNewDivisionPack,
        openViaDivision,
        statusOpenViaDivision,
        taskSprint,
        setNewTaskSprint,
        hardwarePack,
        setNewHardwarePack,
        parameterPack,
        setNewParameterPack,
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
