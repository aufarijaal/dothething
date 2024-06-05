import { Icon } from "@iconify-icon/react";
import React from "react";
import dayjs from "dayjs";

const TaskItem: React.FC<{ task: Task; toggleButtonDisabled: boolean; deleteTaskButtonDisabled: boolean; onBtnEditClick: () => void; onDeleteBtnClick: () => void; onToggleBtnClick: () => void }> = ({ task, toggleButtonDisabled, deleteTaskButtonDisabled, onBtnEditClick, onDeleteBtnClick, onToggleBtnClick }) => {
  return (
    <div className="task-item bg-base-200/50 p-4 flex items-center gap-2 group w-full rounded-[var(--rounded-box,1rem)]">
      <button className={`btn btn-circle btn-sm ${task.done ? "btn-accent" : ""}`} disabled={toggleButtonDisabled} onClick={() => onToggleBtnClick()}>
        <Icon icon="mdi:check" width="24" height="24" />
      </button>

      <div className="flex flex-col gap-1 flex-grow">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis text-lg">{task.title}</span>
        <span className="text-xs text-secondary">{dayjs(task.time).format("MMMM DD YYYY HH:mm:ss")}</span>
      </div>

      <div className="task-item-actions gap-1 group-hover:flex hidden transition">
        <button className="btn btn-circle btn-xs btn-success" onClick={() => onBtnEditClick()}>
          <Icon icon="mdi:pencil" />
        </button>
        <button className="btn btn-circle btn-xs btn-error" onClick={() => onDeleteBtnClick()} disabled={deleteTaskButtonDisabled}>
          <Icon icon="mdi:trash" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
