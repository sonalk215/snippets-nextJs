'use server';
import { redirect } from "next/navigation";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const editSnippet = async (id: number, code: string) => {
  console.log(id, code);
  await db.snippet.update({
    where: {id},
    data: {code}
  })
  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`);
}

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: {id}
  })
  revalidatePath('/');
  redirect('/');

}

export const createSnippet = async (formState: {message: string}, formData: FormData) => {
  try {
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer'
      }
    }
    if (typeof code !== 'string' || code.length < 5) {
      return {
        message: 'Code must be longer'
      }
    }

    await db.snippet.create({
      data: {
        title: title,
        code: code,
      }
    });
    // throw new Error('Failed to save to database.');
  } catch(err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message
      }
    } else {
      return {
        message: 'Oops!! A bug, Something went wrong!'
      }
    }
  } 

    revalidatePath('/');
    redirect('/');
  }