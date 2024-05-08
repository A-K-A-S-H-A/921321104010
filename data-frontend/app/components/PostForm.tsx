"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  body: z.string().min(10, { message: "Body must be at least 10 characters." }),
});

function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Post added successfully");
      reset();
    } else {
      console.error("Failed to add post");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label htmlFor="title">Post Title</label>
        <Input
          id="title"
          placeholder="Enter Post Title"
          {...register("title")}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="body">Post Body</label>
        <Input id="body" placeholder="Enter Post Body" {...register("body")} />
        {errors.body && <p>{errors.body.message}</p>}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default PostForm;
