import { useState } from "react";
import { BASE_URL } from "../API/Requests";

export const NewPost = () => {
  const [file, setFile] = useState<File | undefined>();
  const [caption, setCaption] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      // Read on stack overflow that multipart/form-data is inferred with fetch, and that including it explicitly causes problems
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    }).then(() => {
      setFile(undefined);
      setCaption("");
    });
  };

  return (
    <form onSubmit={submit}>
      <input
        onChange={(e) => {
          if (e.target.files !== null) {
            console.log(e.target.files[0].size);
            setFile(e.target.files[0]);
          }
        }}
        type="file"
        accept="image/*,video/*"
      />
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        type="text"
        placeholder="caption"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
