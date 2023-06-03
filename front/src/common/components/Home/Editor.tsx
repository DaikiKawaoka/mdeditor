import { Dispatch } from "react";
import Box from "@mui/material/Box";
import { File } from "../Model/File";

type Props = {
  file: File | null;
  editFile: Dispatch<string>;
};

const Editor = (props: Props) => {
  return (
    <Box sx={{ height: "100%", mb: "3px", cursor: "pointer" }}>
      {props.file === null ? (
        ""
      ) : (
        <textarea
          placeholder="Enter Markdown ..."
          value={props.file.content}
          onChange={(event) => props.editFile( event.target.value )}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#1e1e1e",
            padding: "0.5rem",
            outline: "none",
            color: "#fff",
            fontSize: "17px"
          }}
        ></textarea>
      )}
    </Box>
  );
};

export default Editor;
