"use client";
import { useEffect, useState } from "react";
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
 
export default function Home() {
  const [posts, setPosts] = useState([]);
 
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3001/");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }
 
    fetchPosts();
  }, []);
 
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Card key={post.id} className={cn("w-[380px] mb-4")}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{post.body}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Read More
            </Button>
          </CardFooter>
        </Card>
        
      ))}
    </div>
  );
}
