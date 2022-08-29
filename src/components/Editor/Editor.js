import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "ckeditor5-custom-build";
import "./style.css";

const Editor = ({ value, index, name, setWordData }) => {
  const handleDefinitons = (data) => {
    setWordData((prev) => {
      let changedDef = { ...prev.definitions[index] };
      let definitions = [...prev.definitions];
      changedDef = { ...changedDef, [name]: data };
      definitions[index] = changedDef;
      return {
        ...prev,
        definitions: [...definitions],
      };
    });
  };

  return (
    <CKEditor
      editor={BalloonEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        handleDefinitons(data)
      }}
    />
  );
};

export default Editor;
