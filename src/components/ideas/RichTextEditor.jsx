import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link", "clean"],
];

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editorContainer = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorContainer.current) return;

    const quill = new Quill(editorContainer.current, {
      theme: "snow",
      placeholder: placeholder || "Describe your idea in detail...",
      modules: { toolbar: toolbarOptions },
    });

    quill.clipboard.dangerouslyPasteHTML(value || "");

    const handleTextChange = () => {
      const html = editorContainer.current.querySelector(".ql-editor")?.innerHTML || "";
      onChange(html === "<p><br></p>" ? "" : html);
    };

    quill.on("text-change", handleTextChange);
    quillRef.current = quill;

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change", handleTextChange);
        quillRef.current.destroy();
        quillRef.current = null;
      }
      if (editorContainer.current) {
        editorContainer.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!quillRef.current || !editorContainer.current) return;
    const currentHtml = editorContainer.current.querySelector(".ql-editor")?.innerHTML || "";
    const normalizedValue = value || "";

    if (normalizedValue !== currentHtml) {
      quillRef.current.clipboard.dangerouslyPasteHTML(normalizedValue);
    }
  }, [value]);

  return (
    <div className="rounded-md border bg-white">
      <div ref={editorContainer} className="min-h-[170px]" />
    </div>
  );
}
