'use client';
import { useState } from "react";
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { editSnippet } from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet
}

const SnippetEditForm = ({snippet}: SnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string="") => {
    console.log(value);
    setCode(value);
  }
  const editSnippetAction = editSnippet.bind(null, snippet.id, code)
  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        onChange={handleEditorChange}
        options={{
          minimap: {enabled: false}
        }}
      />
      <form action={editSnippetAction}>
        <button type='submit' className='p-2 border rounded'>Save</button>

      </form>
    </div>
  )

}

export default SnippetEditForm;