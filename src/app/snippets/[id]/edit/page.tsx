import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
  params: Promise<{
    id: string
  }>
}

// export type paramsType = Promise<{ id: string }>;


const SnippetEditPage = async (props: SnippetEditPageProps) => {
  const { id } = await props.params;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id)}
  })

  if (!snippet) {
    return notFound();
  }

  return (
    // <div>Editing snippet with title {parseInt(id)}</div>
    <SnippetEditForm snippet={snippet} />
  )

}

export default SnippetEditPage;