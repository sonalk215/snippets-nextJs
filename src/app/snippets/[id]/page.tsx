import Link from "next/link";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { deleteSnippet } from "@/actions";

interface SnippetShowPageProps {
  params: Promise<{
    id: string
  }>
}

const SnippetShowPage = async (props: SnippetShowPageProps) => {
  const {id} = await props.params;
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(id)
    }
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id)

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>

      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>
          {snippet.code}
        </code>
      </pre>
    </div>
  )
}

export default SnippetShowPage;

export const generateStaticParams = async () => {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString()
    }
  })
}