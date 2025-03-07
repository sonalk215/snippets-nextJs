import { db } from "@/db";
import Link from "next/link";

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

const Home = async () => {
  const snippets = await db.snippet.findMany();
  // console.log(snippets);

  const renderedSnippets = snippets.map(snippet => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>
          {snippet.title}
        </div>
        <div>View</div>
      </Link>
    )
  })

  return (
    <div className="home">
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xlfont-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">New</Link>
      </div>
    
      <div className="flex flex-col gap-2">
        {renderedSnippets}
      </div>
  </div>
  )
}

export default Home;