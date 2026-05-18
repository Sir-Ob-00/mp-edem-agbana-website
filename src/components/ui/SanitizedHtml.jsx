import DOMPurify from "dompurify";

export default function SanitizedHtml({
  html = "",
  className = "",
  tag = "div",
}) {
  const Tag = tag;

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
}
