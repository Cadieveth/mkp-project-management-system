// ...
import React from "react";
import { useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";
import { useStateContext } from "../../ContextProvider";

export default function DroppableWidget({
  dataCombo,
  dataTask,
  handleDrop,
  divisionId,
  taskSprint,
  getTaskDivisionList,
}) {
  return (
    <div className="flex justify-between w-full">
      {dataCombo.map((item, index) => {
        const status = item.code;

        const [{ isOver }, drop] = useDrop({
          accept: "CARD",
          drop: (droppedItem) => handleDrop(droppedItem, status),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
          }),
        });

        return (
          <div
            ref={drop}
            key={item.code}
            id={`widget-${item.code}`}
            className={`p-2 bg-slate-200 rounded-lg mb-3 ${
              index !== dataCombo.length - 1 ? "mr-3" : ""
            } w-full`}>
            <div id="label-widget" className="flex justify-center font-bold">
              {item.propKey}
            </div>
            <div
              className={`border mt-3 ${
                isOver ? "border-dashed border-2 border-gray-500" : ""
              }`}>
              {dataTask === null ? (
                <div className="text-center">
                  <div className="text-sm font-bold">No Task Available</div>
                  <div className="text-xs">Please input data Task</div>
                </div>
              ) : (
                dataTask
                  .filter((task) => task.status === status)
                  .map((filteredTask) => (
                    <DraggableCard
                      key={filteredTask.id}
                      taskData={filteredTask}
                      divisionId={divisionId}
                      taskSprint={taskSprint}
                      getTaskDivisionList={getTaskDivisionList}
                    />
                  ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
