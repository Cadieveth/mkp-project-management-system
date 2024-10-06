import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { BarChart, PieChart } from "@mui/x-charts";

import DatePickerNew from "../../../components/DatePickerNew";
import Button from "../../../components/Button";
import {
  faFilter,
  faCircleXmark,
  faCircleCheck,
  faCircleUp,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import WelcomeBanner from "../../../partials/dashboard/WelcomeBanner";
import config from "../../../../config";
import { auto } from "@popperjs/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variablePie from "highcharts/modules/variable-pie";
import { handleTokenExpired } from "../../../utils/Utils";

variablePie(Highcharts);

export default function DashboardPanel() {
  const [startDate, setStartDate] = useState(moment().format("01 MMM YYYY"));
  const [endDate, setEndDate] = useState(moment().format("DD MMM YYYY"));
  const fullName = localStorage.getItem("fullName");

  const [open, setOpen] = useState(0);
  const [lost, setLost] = useState(0);
  const [won, setWon] = useState(0);
  const [listTraffic, setListTraffic] = useState([]);
  const [listBusiness, setListBusiness] = useState([]);
  const navigate = useNavigate();

  const { setLoadingState, setNotif } = useStateContext();

  const getAnalyticsSalesStage = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${
          config.api_ptms
        }/analytic/sum-sales-stages-by-date?startDate=${moment(
          startDate,
          "DD MMM YYYY"
        ).format("YYYYMMDD")}&endDate=${moment(endDate, "DD MMM YYYY").format(
          "YYYYMMDD"
        )}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOpen(data.result[0].open);
        setLost(data.result[0].lost);
        setWon(data.result[0].won);
        setNotif("success", data.meta.message);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const getAnalyticsTrafficSprint = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${
          config.api_ptms
        }/analytic/traffic-sales-stages-by-project-ctgr?startDate=${moment(
          startDate,
          "DD MMM YYYY"
        ).format("YYYYMMDD")}&endDate=${moment(endDate, "DD MMM YYYY").format(
          "YYYYMMDD"
        )}`,
        // `${config.api_ptms}/analytic/traffic-sales-stages-by-project-ctgr?startDate=20231101&endDate=20231130`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNotif("success", data.meta.message);
        setListTraffic(data.result);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const getAnalyticsBusinessSprint = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${
          config.api_ptms
        }/analytic/traffic-sum-sprint-by-business_ctgr?startDate=${moment(
          startDate,
          "DD MMM YYYY"
        ).format("YYYYMMDD")}&endDate=${moment(endDate, "DD MMM YYYY").format(
          "YYYYMMDD"
        )}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNotif("success", data.meta.message);
        setListBusiness(data.result);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const zoneTime = () => {
    const currentTime = moment().format("LT");
    let greeting = "";
    if (
      moment(currentTime, "h:mm A").isBetween(
        moment("4:01 AM", "h:mm A"),
        moment("11:59 AM", "h:mm A")
      )
    ) {
      greeting = "Morning";
    } else if (
      moment(currentTime, "h:mm A").isBetween(
        moment("12:00 PM", "h:mm A"),
        moment("5:59 PM", "h:mm A")
      )
    ) {
      greeting = "Afternoon";
    } else if (
      moment(currentTime, "h:mm A").isBetween(
        moment("6:00 PM", "h:mm A"),
        moment("7:59 PM", "h:mm A")
      )
    ) {
      greeting = "Evening";
    } else {
      greeting = "Night";
    }

    return greeting;
  };

  const applyFilter = () => {
    const isValidDateRange = moment(startDate, "DD MMM YYYY").isSameOrBefore(
      moment(endDate, "DD MMM YYYY")
    );
    if (isValidDateRange) {
      getAnalyticsSalesStage();
      getAnalyticsTrafficSprint();
      getAnalyticsBusinessSprint();
    } else {
      setNotif("error", "The Start Date must be before the End Date!");
    }
  };

  const chartPackage = () => {
    const wonData = [];
    const lostData = [];
    const categories = [];
    // const tooltipSuffix = [];

    listTraffic.forEach((item) => {
      categories.push(item.projectCtgrCode);
      wonData.push(item.won);
      lostData.push(item.lost);
      // tooltipSuffix.push(` (${item.projectCtgrName})`);
    });
    const packageOptions = {
      title: {
        text: "Traffic Sprint by Product Category",
        align: "left",
      },
      // subtitle: {
      //   text: `tambahan keterangan`,
      //   align: "left",
      // },
      series: [
        {
          name: "WON",
          data: wonData,
        },
        {
          name: "LOST",
          data: lostData,
        },
      ],
      xAxis: {
        categories: categories,
        crosshair: true,
        accessibility: {
          description: "Categories",
        },
      },
      credits: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Closed Project (Won/Lost)",
        },
      },
      // tooltip: {
      //   valueSuffix: tooltipSuffix,
      // },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      chart: {
        type: "column",
      },
    };

    return packageOptions;
  };

  const chartBusiness = () => {
    const filteredData = listBusiness.filter((item) => item.count !== 0);

    const data = filteredData.map((item) => ({
      name: item.businessCtgrCode,
      y: item.count,
      z: item.count,
      desc: item.businessCtgrName,
    }));

    const businessOption = {
      chart: {
        type: "variablepie",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Traffic Sprint by Business Category",
        align: "left",
      },
      tooltip: {
        headerFormat: "",
        pointFormat: "{point.desc}: {point.y}",
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "20%",
          zMin: 0,
          name: "Business Category",
          borderRadius: 5,
          data: data,
          colors: [
            "#1e40af",
            "#4caefe",
            "#3dc3e8",
            "#2dd9db",
            "#2ddbbb",
            "#2ddba7",
          ],
        },
      ],
    };

    return businessOption;
  };

  useEffect(() => {
    getAnalyticsSalesStage();
    getAnalyticsTrafficSprint();
    getAnalyticsBusinessSprint();
    zoneTime();
  }, []);

  return (
    <div>
      {/* BANNER */}
      <div>
        <WelcomeBanner zoneTime={zoneTime()} fullName={fullName} />
      </div>
      {/* FILTER */}
      <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
        <div className="flex justify-between">
          <div className="flex justify-between w-4/5 px-3">
            <div className="w-1/2 mr-2">
              <DatePickerNew
                label="Start Date"
                value={startDate}
                onChange={(value) =>
                  setStartDate(moment(value).format("DD MMM YYYY"))
                }
              />
            </div>
            <div className="w-1/2 ml-2">
              <DatePickerNew
                label="End Date"
                value={endDate}
                onChange={(value) =>
                  setEndDate(moment(value).format("DD MMM YYYY"))
                }
              />
            </div>
          </div>
          <div className="flex justify-end items-end w-1/5">
            <Button
              type="primary"
              iconName={faFilter}
              text="Filter"
              onClick={() => {
                applyFilter();
              }}
            />
          </div>
        </div>
      </div>
      {/* SALES STAGE */}
      <div className="flex flex-grow justify-between mt-5">
        <div className="w-4/6 flex justify-between">
          <div className="justify-center items-center rounded-2xl bg-white border border-slate-200 w-1/2 mr-5 h-20 overflow-hidden">
            <div className="w-full flex justify-between">
              <div className="w-1/3 flex justify-start items-center h-20 text-6xl -ml-5">
                <FontAwesomeIcon
                  icon={faCircleUp}
                  size="2xl"
                  style={{ color: "#1e40af" }}
                />
              </div>
              <div className="w-2/3 flex justify-between">
                <div className="w-3/4 ml-2">
                  <div className="h-1/2 flex justify-start items-end font-mono text-xl font-bold">
                    OPEN
                  </div>
                  <div className="h-1/2 flex justify-start items-start text-xs font-semibold">
                    in this month:
                  </div>
                </div>
                <div className="w-1/4 mr-3 flex justify-end items-center font-bold text-5xl text-[#1e40af]">
                  {open}
                </div>
              </div>
            </div>
          </div>
          <div className="justify-center items-center rounded-2xl bg-white border border-slate-200 w-1/2 h-20 overflow-hidden">
            <div className="w-full flex justify-between">
              <div className="w-1/3 flex justify-start items-center h-20 text-6xl -ml-5">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="2xl"
                  style={{ color: "#1e40af" }}
                />
              </div>
              <div className="w-2/3 flex justify-between">
                <div className="w-3/4 ml-2">
                  <div className="h-1/2 flex justify-start items-end font-mono text-xl font-bold">
                    CLOSE LOST
                  </div>
                  <div className="h-1/2 flex justify-start items-start text-xs font-semibold">
                    in this month:
                  </div>
                </div>
                <div className="w-1/4 mr-3 flex justify-end items-center font-bold text-5xl text-[#1e40af]">
                  {lost}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/6 ml-5">
          <div className="justify-center items-center rounded-2xl bg-white border border-slate-200 h-20 overflow-hidden">
            <div className="w-full flex justify-between">
              <div className="w-1/3 flex justify-start items-center h-20 text-6xl -ml-5">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="2xl"
                  style={{ color: "#1e40af" }}
                />
              </div>
              <div className="w-2/3 flex justify-between">
                <div className="w-3/4 ml-2">
                  <div className="h-1/2 flex justify-start items-end font-mono text-xl font-bold">
                    CLOSE WON
                  </div>
                  <div className="h-1/2 flex justify-start items-start text-xs font-semibold">
                    in this month:
                  </div>
                </div>
                <div className="w-1/4 mr-3 flex justify-end items-center font-bold text-5xl text-[#1e40af]">
                  {won}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CHART */}
      <div className="flex justify-between mt-5">
        {/* PROJECT */}
        <div className="w-4/6">
          <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200 h-auto mr-3">
            <div className="w-full font-bold"></div>
            <div className="flex justify-between w-full">
              <div className="w-full">
                <div
                  style={{
                    overflowX: "auto",
                    overflowY: "hidden",
                    width: "100%",
                  }}>
                  {console.log("listTraffic: ", listTraffic)}
                  <div id="container">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartPackage()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BUSINESS */}
        <div className="w-2/6 flex justify-end ml-2">
          <div className="w-full rounded-2xl bg-white px-5 py-5 border border-slate-200 h-full">
            <div className="h-auto">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartBusiness()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
