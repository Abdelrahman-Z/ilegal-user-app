"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

import "./editor.css";
import { config } from "./config";

export function Editor({setEditor , data}: {setEditor: Dispatch<SetStateAction<DecoupledEditor | null>>, data: string}) {
  const editorContainerRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorRef = useRef(null);

  const { editorConfig } = config;

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_document-editor"
        ref={editorContainerRef}
      >
        <div className="editor-container__toolbar" ref={editorToolbarRef}></div>
        <div className="editor-container__editor-wrapper">
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {editorConfig && (
                <CKEditor
                  onReady={(editor) => {
                    // @ts-expect-error that is a private method
                    editorToolbarRef.current.appendChild(
                      editor.ui.view.toolbar.element
                    );
                    editor.setData(data);
                    setEditor(editor);
                  }}
                  editor={DecoupledEditor}
                  config={editorConfig}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}