"use client";

import React, { ChangeEvent, useState, useEffect, useRef } from "react";
// import { generatePdf, htmlToWord } from "@/actions/htmltoword";
import mammoth from "mammoth";

import { Button } from "@heroui/react";
import { Editor, EditorContent } from "@tiptap/react";

type CustomFileReader = FileReader & {
  result: string | ArrayBuffer | null;
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  if (!editor) {
    return null;
  }

  const exportWord = async () => {
    // const html = editor.getHTML();
    // const docxBuffer = await htmlToWord(html);
    // // Convert the buffer to a Blob
    // const blob = new Blob([docxBuffer], {
    //   type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // });
    // // Create a download link
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "document.docx";
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);
    // document.body.removeChild(a);
  };

  const importWord = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (
      this: FileReader,
      e: ProgressEvent<FileReader>
    ) {
      try {
        const customReader = e.target as CustomFileReader;
        const arrayBuffer = customReader.result as ArrayBuffer;
        const result = await mammoth.convertToHtml(
          { arrayBuffer },
          {
            // Italic formatting
            styleMap: [
              "i => em",
              "italic => em",
              // Underline formatting
              "u => u",
              "underline => u",
              // Bold formatting
              "b => strong",
              "bold => strong",
              // Quote formatting
              "p[style-name='Quote'] => blockquote",
              "p[style-name='Quotation'] => blockquote",
            ],
          }
        );

        // Ensure the result is a valid string
        if (typeof result.value === "string") {
          console.log("Setting value:", result.value);
          editor.commands.setContent(result.value, false);
        } else {
          console.error("Unexpected output from mammoth:", result);
          alert("Failed to process the Word document. Please try again.");
        }
      } catch (error: unknown) {
        console.error("Error importing Word document:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        alert("Error importing Word document: " + errorMessage);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const exportPDF = async () => {
    // const html = editor.getHTML();
    // console.log(html);
    // const pdfBuffer = await generatePdf(html);
    // // Convert the buffer to a Blob
    // const blob = new Blob([pdfBuffer], {
    //   type: "application/pdf",
    // });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "document.pdf";
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);
    // document.body.removeChild(a);
  };

  const setLink = () => {
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
    setLinkUrl("");
    setShowLinkInput(false);
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const toolbarButtonClass = (isActive: boolean) =>
    `px-2 py-1 border border-gray-300 text-sm ${
      isActive
        ? "bg-blue-600 text-white border-blue-700"
        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }`;

  const imageInputRef = useRef<HTMLInputElement>(null);

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        editor.commands.setImage({
          src: result,
          alt: file.name,
          title: file.name,
        });
      }
    };
    reader.readAsDataURL(file);

    // Reset input value to allow uploading the same file again
    if (event.target) {
      event.target.value = "";
    }
  };
  return (
    <div className="flex flex-wrap gap-1 p-1 border-b border-gray-300 bg-gray-100">
      <Button onPress={exportWord} className={toolbarButtonClass(false)}>
        Export Word
      </Button>
      <Button onPress={exportPDF} className={toolbarButtonClass(false)}>
        Export PDF
      </Button>
      <input
        type="file"
        accept=".docx"
        onChange={importWord}
        id="word-import"
        className="hidden"
      />
      <label
        htmlFor="word-import"
        className={`${toolbarButtonClass(
          false
        )} cursor-pointer rounded-md my-auto`}
      >
        Import Word
      </label>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <Button
        onPress={() => editor.chain().focus().toggleBold().run()}
        className={toolbarButtonClass(editor.isActive("bold"))}
        title="Bold"
      >
        B
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleItalic().run()}
        className={toolbarButtonClass(editor.isActive("italic"))}
        title="Italic"
      >
        I
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleUnderline().run()}
        className={toolbarButtonClass(editor.isActive("underline"))}
        title="Underline"
      >
        U
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleStrike().run()}
        className={toolbarButtonClass(editor.isActive("strike"))}
        title="Strikethrough"
      >
        S
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleHighlight().run()}
        className={toolbarButtonClass(editor.isActive("highlight"))}
        title="Highlight"
      >
        H
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleSubscript().run()}
        className={toolbarButtonClass(editor.isActive("subscript"))}
        title="Subscript"
      >
        X₂
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleSuperscript().run()}
        className={toolbarButtonClass(editor.isActive("superscript"))}
        title="Superscript"
      >
        X²
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleCode().run()}
        className={toolbarButtonClass(editor.isActive("code"))}
        title="Inline Code"
      >
        Code
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <input
        type="color"
        onInput={(e) => {
          editor.chain().focus().setColor(e.currentTarget.value).run();
        }}
        title="Text Color"
        className="w-8 h-8 p-0 cursor-pointer bg-transparent"
      />
      <select
        onChange={(e) => {
          editor.chain().focus().setFontFamily(e.target.value).run();
        }}
        title="Font Family"
        className="bg-white text-gray-800 border border-gray-300 rounded p-1 text-sm"
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
      </select>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <Button
        onPress={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={toolbarButtonClass(editor.isActive("heading", { level: 1 }))}
        title="Heading 1"
      >
        H1
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={toolbarButtonClass(editor.isActive("heading", { level: 2 }))}
        title="Heading 2"
      >
        H2
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={toolbarButtonClass(editor.isActive("heading", { level: 3 }))}
        title="Heading 3"
      >
        H3
      </Button>
      <Button
        onPress={() => editor.chain().focus().setParagraph().run()}
        className={toolbarButtonClass(editor.isActive("paragraph"))}
        title="Paragraph"
      >
        P
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleBulletList().run()}
        className={toolbarButtonClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        • List
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleOrderedList().run()}
        className={toolbarButtonClass(editor.isActive("orderedList"))}
        title="Numbered List"
      >
        1. List
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleBlockquote().run()}
        className={toolbarButtonClass(editor.isActive("blockquote"))}
        title="Blockquote"
      >
        Quote
      </Button>
      <Button
        onPress={() => editor.chain().focus().toggleCodeBlock().run()}
        className={toolbarButtonClass(editor.isActive("codeBlock"))}
        title="Code Block"
      >
        &lt;/&gt;
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <Button
        onPress={() => editor.chain().focus().setTextAlign("left").run()}
        className={toolbarButtonClass(editor.isActive({ textAlign: "left" }))}
        title="Align Left"
      >
        Left
      </Button>
      <Button
        onPress={() => editor.chain().focus().setTextAlign("center").run()}
        className={toolbarButtonClass(editor.isActive({ textAlign: "center" }))}
        title="Align Center"
      >
        Center
      </Button>
      <Button
        onPress={() => editor.chain().focus().setTextAlign("right").run()}
        className={toolbarButtonClass(editor.isActive({ textAlign: "right" }))}
        title="Align Right"
      >
        Right
      </Button>
      <Button
        onPress={() => editor.chain().focus().setTextAlign("justify").run()}
        className={toolbarButtonClass(
          editor.isActive({ textAlign: "justify" })
        )}
        title="Align Justify"
      >
        Justify
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <Button
        onPress={() => setShowLinkInput(!showLinkInput)}
        className={toolbarButtonClass(editor.isActive("link"))}
        title="Insert Link"
      >
        Link
      </Button>
      {showLinkInput && (
        <div className="flex gap-1 items-center bg-white p-1 border border-gray-300 rounded">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="bg-white text-gray-800 border border-gray-300 rounded p-1 text-sm"
          />
          <Button
            onPress={setLink}
            className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
          >
            Set
          </Button>
        </div>
      )}
      <Button
        onPress={insertTable}
        className={toolbarButtonClass(editor.isActive("table"))}
        title="Insert Table"
      >
        Table
      </Button>
      {/* Image Upload Button */}
      <Button
        onPress={triggerImageUpload}
        className={toolbarButtonClass(false)}
        title="Insert Resizable Image"
      >
        Image
      </Button>
      <input
        title="Insert Resizable Image"
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <Button
        onPress={() => editor.chain().focus().setHorizontalRule().run()}
        className={toolbarButtonClass(false)}
        title="Horizontal Rule"
      >
        HR
      </Button>
      <Button
        onPress={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={`${toolbarButtonClass(false)} ${
          !editor.can().undo() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        title="Undo"
      >
        Undo
      </Button>
      <Button
        onPress={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={`${toolbarButtonClass(false)} ${
          !editor.can().redo() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        title="Redo"
      >
        Redo
      </Button>
    </div>
  );
};

export const TiptapEditor = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="bg-white border border-gray-300 rounded h-full">
      {editor && (
        <>
          <MenuBar editor={editor} />
          <div className="!h-[calc(100vh-300px)] overflow-y-auto prose max-w-none">
            <EditorContent
              editor={editor}
              className="text-gray-800 flex-1 overflow-y-scroll h-full p-4"
            />
          </div>
        </>
      )}
    </div>
  );
};
