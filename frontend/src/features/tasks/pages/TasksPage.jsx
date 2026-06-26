import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";

import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/TaskModal";
import api from "../../../services/api";

import "../styles/tasks.css";

function TasksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState({ todo: [], progress: [], review: [], done: [] });
  const openModal = searchParams.get("modal") === "new";

  const normalizeTask = (task) => {
    const rawStatus = task?.status?.toString().trim().toLowerCase();
    const normalizedStatus =
      rawStatus === "in progress" || rawStatus === "progress"
        ? "progress"
        : rawStatus === "review"
        ? "review"
        : rawStatus === "done"
        ? "done"
        : "todo";

    return {
      ...task,
      id: task?._id || task?.id,
      _id: task?._id || task?.id,
      status: normalizedStatus,
      title: task?.title || "Untitled task",
      priority: task?.priority || "Medium",
    };
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const projectId = localStorage.getItem("activeProjectId");
        if (!projectId) {
          setTasks({ todo: [], progress: [], review: [], done: [] });
          return;
        }

        const res = await api.get(`/api/tasks/project/${projectId}`);
        const normalized = {
          todo: [],
          progress: [],
          review: [],
          done: [],
        };

        res.data.forEach((task) => {
          const normalizedTask = normalizeTask(task);
          if (normalizedTask.status === "progress") {
            normalized.progress.push(normalizedTask);
          } else if (normalizedTask.status === "review") {
            normalized.review.push(normalizedTask);
          } else if (normalizedTask.status === "done") {
            normalized.done.push(normalizedTask);
          } else {
            normalized.todo.push(normalizedTask);
          }
        });

        setTasks(normalized);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };

    loadTasks();
  }, []);

  // CREATE TASK
  const handleCreateTask = async (task) => {
    try {
      const projectId = localStorage.getItem("activeProjectId");
      const selectedProjectId = task.project || projectId;

      if (!selectedProjectId) {
        alert("Please select a project first.");
        return;
      }

      const payload = {
        project: selectedProjectId,
        title: task.title,
        description: task.description,
        status: task.status || "todo",
        priority: task.priority?.toLowerCase() || "medium",
        assignees: [],
      };

      const res = await api.post("/api/tasks", payload);
      const createdTask = normalizeTask(res.data);
      const columnKey =
        createdTask.status === "progress"
          ? "progress"
          : createdTask.status === "review"
          ? "review"
          : createdTask.status === "done"
          ? "done"
          : "todo";

      setTasks((prev) => ({
        ...prev,
        [columnKey]: [createdTask, ...(prev[columnKey] || [])],
      }));

      handleCloseModal();
    } catch (err) {
      console.error("Create task failed", err);
      alert(err?.response?.data?.message || "Create task failed");
    }
  };

  const handleCloseModal = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("modal");
    setSearchParams(nextParams, { replace: true });
  };

  // DRAG & DROP
  const handleDragEnd = async (result) => {
    const { source, destination } =
      result;

    // dropped outside
    if (!destination) return;

    // same column reorder
    if (
      source.droppableId ===
      destination.droppableId
    ) {
      const column = [
        ...tasks[source.droppableId],
      ];

      const [removed] = column.splice(
        source.index,
        1
      );

      column.splice(
        destination.index,
        0,
        removed
      );

      setTasks({
        ...tasks,
        [source.droppableId]: column,
      });

      return;
    }

    // move between columns
    const sourceColumn = [
      ...tasks[source.droppableId],
    ];

    const destinationColumn = [
      ...tasks[destination.droppableId],
    ];

    const [movedTask] =
      sourceColumn.splice(
        source.index,
        1
      );

    // update task status
    movedTask.status =
      destination.droppableId;

    destinationColumn.splice(
      destination.index,
      0,
      movedTask
    );

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destinationColumn,
    });

    try {
      await api.put(`/api/tasks/${movedTask._id}`, { status: destination.droppableId });
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  return (
    <div className="tasks-page">
      {/* HEADER */}
      <div className="tasks-header">
        <div>
          <h1>Tasks Board</h1>

          <p>
            Manage your team tasks
            efficiently
          </p>
        </div>
      </div>

      {/* BOARD */}
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <KanbanBoard tasks={tasks} />
      </DragDropContext>

      {/* MODAL */}
      {openModal && (
        <TaskModal
          onClose={handleCloseModal}
          onCreateTask={handleCreateTask}
        />
      )}
    </div>
  );
}

export default TasksPage;