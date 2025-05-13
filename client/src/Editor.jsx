// Importing the ReactQuill component from the 'react-quill' library.
// ReactQuill is a wrapper for the Quill rich text editor that makes it easy to use in React.
// It provides features like formatted text, headings, lists, links, images, etc.
import ReactQuill from "react-quill";

// Editor component for writing blog content with rich formatting
export default function Editor({ value, onChange }) {
  // Configuration for the ReactQuill toolbar
  const modules = {
    toolbar: [
      // Header dropdown (H1, H2, Normal)
      [{ header: [1, 2, false] }],

      // Text styles
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],

      // List controls and indentation
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],

      // Links and images
      ['link', 'image'],

      // Remove formatting button
      ['clean'],
    ],
  };

  return (
    <div className="content">
      <ReactQuill
        value={value}        // content of the editor
        onChange={onChange}  // handler to update content state
        theme={'snow'}       // visual style of the editor (Snow is default)
        modules={modules}    // toolbar configuration
      />
    </div>
  );
}
