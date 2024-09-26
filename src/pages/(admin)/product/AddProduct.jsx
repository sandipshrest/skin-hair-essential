import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [description, setDescription] = useState("");
  console.log(description);
  return (
    <div className="p-6">
      <Editor
        apiKey="w1iws9974slreyds2t0bbulpgxvy2m7s1ymxao2tuwhdbh0m"
        value={description}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={(content) => setDescription(content)}
      />
    </div>
  );
};

export default AddProduct;
