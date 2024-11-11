import { useState } from "react";
import { BASE_URL } from "../API/Requests";
import { useUserContext } from "../Providers/UserProvider";

export const NewPost = () => {
  const [file, setFile] = useState<File | undefined>();
  const [title, setTitle] = useState("");

  const { JWT } = useUserContext();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      // Read on stack overflow that multipart/form-data is inferred with fetch, and that including it explicitly causes problems
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JWT,
        x_meta_function: "uploadNewVideo",
      },
      body: formData,
    }).then(() => {
      setFile(undefined);
      setTitle("");
    });
  };

  return (
    <form onSubmit={submit} className="popup_box_default">
      <input
        className="file_input"
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <input type="submit" className="submit" value="Submit" />
    </form>
  );
};
