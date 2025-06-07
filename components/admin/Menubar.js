"use client"
import React from 'react'


const Menubar = ({editor, onAddImage}) => {
  if (!editor || typeof editor.can !== 'function') return null;


  return (
    <div className="controls flex flex-col gap-y-2 my-2">
      <div className="buttons flex flex-wrap gap-2">
        <div className='flex gap-2 flex-wrap'>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          type="button"
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive("bold") ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleBold().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type="button"
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive("italic") ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleItalic().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          Italic
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          type="button"
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive("strike") ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleStrike().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          Strike
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          type="button"
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive("code") ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleCode().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          Code
        </button>

        <button 
        className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
             bg-gray-100 text-black hover:bg-gray-200`}
             type="button"
             onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            Remove Text Formatting
        </button>
        <button 
        className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
             bg-gray-100 text-black hover:bg-gray-200`}
             type="button"
             onClick={() => editor.chain().focus().clearNodes().run()}>
                Reset Layout
                </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          type="button"
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer bg-gray-100 text-black hover:bg-gray-200
            ${!editor.can().chain().focus().setParagraph().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          Paragraph
        </button>
        </div>
        <div className='flex gap-2 flex-wrap'>
        <button
        type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('heading', { level: 1 }) ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleHeading({level:1}).run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          H1
        </button>

        <button
        type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('heading', { level: 2 }) ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleHeading({level: 2}).run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          H2
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('heading', { level: 3 }) ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleHeading({level:3}).run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('heading', { level: 4 }) ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleHeading({level: 4}).run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          H4
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('heading', { level: 5 }) ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleHeading({level: 5}).run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          H5
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('heading', { level: 6 }) ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleHeading({level: 6}).run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          H6
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('bulletList') ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleBulletList().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          Bullet list
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('orderedList') ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleOrderedList().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          Ordered list
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('codeBlock') ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleCodeBlock().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          Code block
        </button>
              </div>

        <div className='flex gap-2 flex-wrap'>

        <button
        type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('blockquote') ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleBlockquote().run() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
          &ldquo;Blockquote&rdquo;
        </button>

        <button 
        type="button"
        className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            bg-gray-100 text-black hover:bg-gray-200`}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Add Divider Line
        </button>
        <button 
        type="button"
        className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            bg-gray-100 text-black hover:bg-gray-200`}
        onClick={() => editor.chain().focus().setHardBreak().run()}>
          New Line
        </button>
        <button
        type="button"
        className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            bg-gray-100 text-black hover:bg-gray-200`}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
              !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
            }
            >
          Undo
        </button>
        <button
        type="button"
        className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            bg-gray-100 text-black hover:bg-gray-200`}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
              !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
            }
            >
          Redo
        </button>
        <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`px-3 py-1 rounded-md text-sm transition-all cursor-pointer
            ${editor.isActive('highlight') ? "bg-purple-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"}
            ${!editor.can().chain().focus().toggleHighlight().run() ? "opacity-50 cursor-not-allowed" : ""}`}
        >
        Highlight
        </button>
    </div>
    </div>
    </div>
  );
};

export default Menubar
