import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const FormAddTask: React.FC<{ formId: string; onSuccess: () => void }> = ({ formId, onSuccess }) => {
  const schema = z.object({
    title: z.string().trim().min(1, "Title cannot be empty"),
    time: z.string().trim().min(1, "Time cannot be empty"),
    done: z.boolean(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function submit(data: z.infer<typeof schema>) {
    try {
      await axios.post("/api/tasks", data);

      onSuccess();
      toast.success("Task added successfully");
    } catch (error: any) {
      if (error instanceof AxiosError) {
        form.setError("root", error.response?.data.message);
        toast.success(`Failed to add task. ${error.response?.data.message}`);
      }
    }
  }
  return (
    <form id={formId} className="flex flex-col gap-2" onSubmit={form.handleSubmit(submit)}>
      <div className="root-errors">
        <p>{form.formState.errors.root?.message}</p>
      </div>

      <label className="form-control w-full max-w-full">
        <div className="label">
          <span className="label-text font-semibold">Title</span>
        </div>
        <input {...form.register("title", { required: true })} type="text" placeholder="Example: Grocery shopping" className="input input-bordered w-full max-w-full input-sm" />
        {form.formState.errors.title ? (
          <div className="label">
            <span className="label-text-alt text-error">{form.formState.errors.title.message}</span>
          </div>
        ) : null}
      </label>

      <label className="form-control w-full max-w-full">
        <div className="label">
          <span className="label-text font-semibold">Time</span>
        </div>
        <input {...form.register("time", { required: true })} type="datetime-local" step="any" className="input input-bordered w-full max-w-full input-sm" />
        {form.formState.errors.time ? (
          <div className="label">
            <span className="label-text-alt text-error">{form.formState.errors.time.message}</span>
          </div>
        ) : null}
      </label>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text font-semibold">Done</span>
          <input {...form.register("done", { required: true })} type="checkbox" className="checkbox checkbox-primary" />
        </label>
        {form.formState.errors.done ? (
          <div className="label">
            <span className="label-text-alt text-error">{form.formState.errors.done.message}</span>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default FormAddTask;
