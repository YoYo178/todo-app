import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLogoutMutation } from "@/hooks/network/auth/useLogoutMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useTaskContext } from "@/contexts/TasksContext";
import { TaskModal } from "@/components/TaskModal";
import { useState } from "react";
import { useCreateTaskMutation } from "@/hooks/network/tasks/useCreateTaskMutation";
import { useUpdateTaskMutation } from "@/hooks/network/tasks/useUpdateTaskMutation";
import { useDeleteTaskMutation } from "@/hooks/network/tasks/useDeleteTaskMutation";

// Star rating component
const StarRating = ({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (rating: number) => void;
}) => {
  return (
    <div className="flex gap-1 mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="text-xl"
          onClick={() => onRate(star)}
        >
          {star <= rating ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
};

export const Dashboard = () => {
  const { auth, setAuth } = useAuthContext();
  const { tasks } = useTaskContext();
  const logoutMutation = useLogoutMutation({});
  const queryClient = useQueryClient();

  const createTaskMutation = useCreateTaskMutation({ queryKey: ['tasks'] });
  const updateTaskMutation = useUpdateTaskMutation({ queryKey: ['tasks'] });
  const deleteTaskMutation = useDeleteTaskMutation({ queryKey: ['tasks'] });

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync({});

    setAuth(null);
    queryClient.invalidateQueries({ queryKey: ['auth'] });
    queryClient.invalidateQueries({ queryKey: ['tasks'] });

    alert("Logged out!");
    navigate("/login");
  };

  const handleAdd = () => {
    setModalMode("add");
    setTaskToEdit(null);
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    setModalMode("edit");
    setTaskToEdit(task);
    setModalOpen(true);
  };

  const handleSaveTask = async (newTask: any) => {
    if (modalMode === "add") {
      await createTaskMutation.mutateAsync({
        payload: {
          title: newTask?.title,
          description: newTask?.description,
          rating: 0
        }
      })
    } else {
      await updateTaskMutation.mutateAsync({
        pathParams: {
          taskId: taskToEdit._id
        },
        payload: {
          title: newTask?.title,
          description: newTask?.description,
          rating: newTask?.rating
        }
      })
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Delete this task?");
    if (!confirm) return;

    await deleteTaskMutation.mutateAsync({
      pathParams: {
        taskId: id
      }
    })
  };

  const updateRating = async (id: string, rating: number) => {
    await updateTaskMutation.mutateAsync({
      pathParams: {
        taskId: id
      },
      payload: { rating }
    })
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [taskToEdit, setTaskToEdit] = useState<any>(null);

  return (
    <>
      <title>Dashboard | TodoApp</title>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Welcome, {auth?.name || 'User'}</h1>
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </div>

        {/* Add button + heading */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Your Tasks</h2>
          <Button onClick={handleAdd}>+ Add Task</Button>
        </div>

        {/* Task list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Card key={task._id} className="relative">
              <CardContent className="pt-6 pb-4">
                <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>

                <StarRating
                  rating={task.rating || 0}
                  onRate={(r) => updateRating(task._id, r)}
                />

                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(task._id)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <TaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveTask}
          mode={modalMode}
          task={taskToEdit}
        />
      </div>
    </>
  );
};