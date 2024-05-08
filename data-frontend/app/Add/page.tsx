import PostForm from "../components/PostForm";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <PostForm />
      <Link href="/">
        <button>show all data</button>
      </Link>
    </div>
  );
}
