import { Dispatch, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FileModel, { getDisplayUpdatedAt } from "../Model/File";
import removeMd from "remove-markdown";
import FileMenu from "./FileMenu";

type Props = {
  file: FileModel;
  files: Array<FileModel>;
  selectedFile: FileModel | null;
  setFiles: Dispatch<FileModel[]>;
  changeSelectedFile: Dispatch<FileModel>;
  initFiles: () => void;
};

const File = (props: Props) => {
  const isSelected = () => {
    if (props.selectedFile === null) return false;
    return props.file.id === props.selectedFile.id;
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onClick={() => props.changeSelectedFile(props.file)}
        onContextMenu={(event) => {
          event.preventDefault();
          setAnchorEl(event.currentTarget);
        }}
      >
        <Box
          sx={
            isSelected()
              ? {
                  backgroundColor: "#ae8e23",
                  width: "100%",
                  height: "50px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  mb: "3px",
                }
              : {
                  width: "100%",
                  height: "50px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  mb: "3px",
                  "&:hover": {
                    backgroundColor: "#464646",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }
          }
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12}>
              <div style={{ width: "100%", whiteSpace: "nowrap" }}>
                <Box
                  component="div"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    ml: "3px",
                    mt: "5px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {props.file.content === ""
                    ? "New File"
                    : removeMd(props.file.content)}
                </Box>
              </div>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={3}>
                <div style={{ width: "100%", whiteSpace: "nowrap" }}>
                  <Box component="div" sx={{ ml: "3px", fontSize: "12px" }}>
                    {getDisplayUpdatedAt(props.file)}
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <FileMenu
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        file={props.file}
        files={props.files}
        setFiles={props.setFiles}
        initFiles={props.initFiles}
      />
    </>
  );
};

export default File;
