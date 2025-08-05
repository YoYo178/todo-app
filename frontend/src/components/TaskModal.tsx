import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import * as z from "zod";
  
  type Task = {
    id?: string;
    title: string;
    description: string;
    rating: number;
  };
  
  type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    mode: "add" | "edit";
    task?: Task | null;
  };
  
  // Schema
  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
  });
  
  type FormData = z.infer<typeof schema>;
  
  export const TaskModal = ({ open, onClose, onSave, mode, task }: Props) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        title: "",
        description: "",
      },
    });
  
    // Pre-fill on edit
    useEffect(() => {
      if (mode === "edit" && task) {
        reset({
          title: task.title,
          description: task.description,
        });
      } else {
        reset({
          title: "",
          description: "",
        });
      }
    }, [mode, task, reset]);
  
    const onSubmit = (data: FormData) => {
      const payload: Task = {
        id: task?.id,
        title: data.title,
        description: data.description,
        rating: task?.rating || 0,
      };
      onSave(payload);
      onClose();
    };
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{mode === "add" ? "Add Task" : "Edit Task"}</DialogTitle>
            <DialogDescription>
              {mode === "add" ? "Create a new task" : "Update your task"}
            </DialogDescription>
          </DialogHeader>
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {mode === "add" ? "Create" : "Update"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  