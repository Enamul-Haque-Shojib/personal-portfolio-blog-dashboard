// "use client"


// import React from 'react';
// import { Editor } from '@tiptap/react'
// import { Toggle } from '@/components/ui/toggle';
// import { Bold, Heading2, Italic, List, Strikethrough } from 'lucide-react';

// type Props = {
//     editor: Editor | null
// }
// const Toolbar = ({editor}:Props) => {
//     if(!editor){
//         return null;
//     }
//     return (
//         <div className='border border-input bg-transparent rounded'>
//             <Toggle
//                 size= "sm"
//                 pressed= {editor.isActive("heading")}
//                 onPressedChange={()=>
//                     editor.chain().focus().toggleHeading({ level: 2 }).run()
//                 } 
//             >
//                 <Heading2 className="w-4 h-4"></Heading2>
//             </Toggle>
//             <Toggle
//                 size= "sm"
//                 pressed= {editor.isActive("bold")}
//                 onPressedChange={()=>
//                     editor.chain().focus().toggleBold().run()
//                 } 
//             >
//                 <Bold className="w-4 h-4"></Bold>
//             </Toggle>
//             <Toggle
//                 size= "sm"
//                 pressed= {editor.isActive("italic")}
//                 onPressedChange={()=>
//                     editor.chain().focus().toggleItalic().run()
//                 } 
//             >
//                 <Italic className="w-4 h-4"></Italic>
//             </Toggle>
//             <Toggle
//                 size= "sm"
//                 pressed= {editor.isActive("strike")}
//                 onPressedChange={()=>
//                     editor.chain().focus().toggleStrike().run()
//                 } 
//             >
//                 <Strikethrough className="w-4 h-4"></Strikethrough>
//             </Toggle>
//             <Toggle
//                 size= "sm"
//                 pressed= {editor.isActive("bulletList")}
//                 onPressedChange={()=>
//                     editor.chain().focus().toggleBulletList().run()
//                 } 
//             >
//                 <List className="w-4 h-4"></List>
//             </Toggle>
//         </div>
//     );
// };

// export default Toolbar;


"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Heading2, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { Editor } from "@tiptap/react";
import React, { useEffect, useState } from "react";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    if (!editor) return;

    const activeFormats: string[] = [];

    if (editor.isActive("heading", { level: 2 })) activeFormats.push("heading");
    if (editor.isActive("bold")) activeFormats.push("bold");
    if (editor.isActive("italic")) activeFormats.push("italic");
    if (editor.isActive("strike")) activeFormats.push("strike");
    if (editor.isActive("bulletList")) activeFormats.push("bulletList");
    if (editor.isActive("orderList")) activeFormats.push("orderList");

    setValues(activeFormats);
  }, [editor?.state, editor]);

  if (!editor) return null;

  const handleToggle = (value: string[]) => {
    setValues(value);

    if (value.includes("heading")) {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    }

    if (value.includes("bold")) {
      editor.chain().focus().toggleBold().run();
    }

    if (value.includes("italic")) {
      editor.chain().focus().toggleItalic().run();
    }

    if (value.includes("strike")) {
      editor.chain().focus().toggleStrike().run();
    }

    if (value.includes("bulletList")) {
      editor.chain().focus().toggleBulletList().run();
    }
    if (value.includes("orderList")) {
      editor.chain().focus().toggleOrderedList().run();
    }
  };

  return (
    <div className="mb-2 rounded-md border bg-muted p-2">
      <ToggleGroup type="multiple" value={values} onValueChange={handleToggle} className="flex flex-wrap gap-2">
        <ToggleGroupItem value="heading">
          <Heading2 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strike">
          <Strikethrough className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="bulletList">
          <List className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="bulletList">
          <ListOrdered className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default Toolbar;

