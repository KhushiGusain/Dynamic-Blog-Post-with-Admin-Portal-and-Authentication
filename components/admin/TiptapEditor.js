"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from '@tiptap/extension-highlight'
import { useEditor, EditorContent, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Youtube from '@tiptap/extension-youtube'
import Menubar from "./Menubar";

export default function TiptapEditor({value, onChange}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      Youtube,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[300px] border rounded p-2",
      },
    },
    immediatelyRender: false,
    onUpdate: ({editor}) =>{
      onChange(editor.getHTML());
    }
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const addImage =()=>{
    const url = window.prompt("Enter image URL")
    if(url){
      editor?.chain().focus().setImage({src: url}).run();
    }
  }

  return (
    <div>
      {editor && <Menubar editor={editor} onAddImage={addImage} />}
      <EditorContent editor={editor} className="tiptap overflow-auto max-h-[400px] border p-1 rounded-md dark:bg-gray-700 bg-slate-500" />
    </div>
  );
}
