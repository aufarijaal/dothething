"use client";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Modal, useModal } from "@faceless-ui/modal";
import axios from "axios";
import FormAddTask from "../_components/forms/form-add-task";
import FormEditTask from "../_components/forms/form-edit-task";
import { toast } from "sonner";
import TaskItem from "../_components/TaskItem";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { toggleModal, closeModal } = useModal();

  const [tasks, setTasks] = useState<Task[]>();
  const [taskToEdit, setTaskToEdit] = useState<Task>();
  const [getTasksLoading, setGetTasksLoading] = useState(true);
  const [toggleDoneTaskLoading, setToggleDoneTaskLoading] = useState(false);
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);

  function onCloseModal(slug: string) {
    closeModal(slug);

    document.body.style.overflowY = "hidden";
  }

  async function getTasks() {
    try {
      setGetTasksLoading(true);

      const result = await axios.get("/api/tasks");
      setTasks(result.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setGetTasksLoading(false);
    }
  }

  async function toggleTask(id: number, value: boolean) {
    try {
      setToggleDoneTaskLoading(true);

      await axios.put(`/api/tasks/${id}/toggle`, { value });

      getTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setToggleDoneTaskLoading(false);
    }
  }

  function editTask(task: Task) {
    setTaskToEdit(task);
    toggleModal("modal-edit-task");
  }

  async function deleteTask(id: number) {
    try {
      setDeleteTaskLoading(true);

      if (confirm("Are you sure want to delete this?")) {
        await axios.delete(`/api/tasks/${id}`);
        getTasks();
      }

      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(`Failed to delete task. ${error}`);
    } finally {
      setDeleteTaskLoading(false);
    }
  }

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [pathname]);

  useEffect(() => {
    async function initialFetch() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        getTasks();
      } else {
        return redirect("/auth/signin");
      }
    }

    initialFetch();
  }, []);

  return (
    <div id="dashboard-page" className="pb-[200px] max-w-7xl mx-auto">
      <>
        <Modal slug="modal-add-task" className="modal-box">
          <h3 className="font-bold text-lg">Add new task</h3>
          <div>
            <FormAddTask
              formId="form-add-task"
              onSuccess={() => {
                onCloseModal("modal-add-task");
                getTasks();
              }}
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-sm" onClick={() => onCloseModal("modal-add-task")}>
              Close
            </button>
            <button type="submit" form="form-add-task" className="btn btn-sm btn-primary">
              Submit
            </button>
          </div>
        </Modal>

        <Modal slug="modal-edit-task" className="modal-box">
          <h3 className="font-bold text-lg">Edit task</h3>
          <div>
            {taskToEdit ? (
              <FormEditTask
                existing={taskToEdit}
                formId="form-edit-task"
                onSuccess={() => {
                  onCloseModal("modal-edit-task");
                  getTasks();
                }}
              />
            ) : null}
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-sm" onClick={() => onCloseModal("modal-edit-task")}>
              Close
            </button>
            <button type="submit" form="form-edit-task" className="btn btn-sm btn-primary">
              Submit
            </button>
          </div>
        </Modal>

        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Tasks</h2>

          <div>
            <button className="btn btn-sm btn-accent" onClick={() => toggleModal("modal-add-task")}>
              <Icon icon="mdi:plus" />
              Add new task
            </button>
          </div>
        </header>

        <div className="mt-10 max-w-4xl mx-auto">
          <div className="tasks-list flex flex-col gap-2">
            {!getTasksLoading && tasks && tasks.map((task, i) => <TaskItem key={i} task={task} deleteTaskButtonDisabled={deleteTaskLoading} toggleButtonDisabled={toggleDoneTaskLoading} onBtnEditClick={() => editTask(task)} onDeleteBtnClick={() => deleteTask(task.id)} onToggleBtnClick={() => toggleTask(task.id, !task.done)} />)}

            {getTasksLoading && Array.from({ length: 5 }, (v, i) => <div className="skeleton h-[64px] w-full" key={i}></div>)}
          </div>
        </div>
      </>
    </div>
  );
}

export default DashboardPage;
