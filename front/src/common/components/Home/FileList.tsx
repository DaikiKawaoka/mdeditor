import { Dispatch, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import File from "./File";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FileModel from "../Model/File";
import Tooltip from "@mui/material/Tooltip";
// import FileMenu from "./FileMenu";

type Props = {
  files: Array<FileModel>;
  setFiles: Dispatch<FileModel[]>;
  selectedFile: FileModel | null;
  changeSelectedFile: Dispatch<FileModel>;
  createFile: () => void;
  initFiles: () => void;
};

const FileList = (props: Props) => {
  const isFileCreationAllowed = () => {
    // ファイルが存在しない場合 or ファイルが初期状態の場合（編集されていない）
    return props.files.length === 0 || props.selectedFile?.content !== "";
  };

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box style={{ backgroundColor: "#252526" }} sx={{ height: "100%" }}>
      <Box sx={{ pt: "5px", pb: "0px", display: "flex" }}>
        <DescriptionIcon
          sx={{ mx: "3px", fontSize: 22, verticalAlign: "middle", color: "#aaa" }}
        />
        <Typography sx={{ color: "#aaa" }}>Files</Typography>

        <Tooltip title="ファイル新規作成" arrow>
          <IconButton
            disabled={!isFileCreationAllowed()}
            color="primary"
            size="small"
            sx={{
              ml: "auto",
              mr: "5px",
              fontSize: 22,
              verticalAlign: "middle",
              cursor: "pointer",
            }}
            onClick={props.createFile}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
      {props.files.map((file) => (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          key={file.id}
        >
          <Grid item xs={11}>
            <Box
            // onContextMenu={(event) => {
            //   event.preventDefault();
            //   setAnchorEl(event.currentTarget);
            // }}
            >
              <File
                file={file}
                files={props.files}
                setFiles={props.setFiles}
                selectedFile={props.selectedFile}
                changeSelectedFile={props.changeSelectedFile}
                initFiles={props.initFiles}
              />
            </Box>
          </Grid>
          {/* <FileMenu
            key={file.id}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            file={file}
            files={props.files}
            setFiles={props.setFiles}
          /> */}
        </Grid>
      ))}
    </Box>
  );
};

export default FileList;
