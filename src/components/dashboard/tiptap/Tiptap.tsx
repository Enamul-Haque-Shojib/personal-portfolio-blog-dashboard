// "use client"

// import React from 'react';
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Toolbar from './Toolbar';
// import Heading from "@tiptap/extension-heading"

// const Tiptap = ({
//     content,
//      onChange
//     }:{
//         content: string,
//         onChange: (richText: string) => void
//     }) => {
//         const editor = useEditor({
//             extensions: [
//                 StarterKit.configure({}),
//                 Heading.configure({
//                     HTMLAttributes:{
//                         class: "text-xl font-bold",
//                         levels: [2]
//                     }
//                 })
//             ],
//             content: content,
//             editorProps: {
//                 attributes:{
//                     class: "rounded-md border min-h-[150px border-input bg-back ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50]"
//                 }
//             },
//             onUpdate({editor}){
//                 onChange(editor.getHTML())
//                 console.log(editor.getHTML())
//             }
//         })
//     return (
//         <div className='flex flex-col justify-stretch min-h-[250px]'>
//             <Toolbar editor={editor}></Toolbar>
//             <EditorContent editor={editor}></EditorContent>
//         </div>
//     );
// };

// export default Tiptap;


"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Toolbar from "./Toolbar";

const Tiptap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [2],
        HTMLAttributes: {
          class: "text-xl font-semibold",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full rounded-md border p-3 bg-muted/40">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
