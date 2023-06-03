import { Dispatch, useState } from "react";
import Box from "@mui/material/Box";
import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import DirectoryModel from "../Model/Directory";
import DirectoryMenu from './DirectoryMenu';

type Props = {
  directory: DirectoryModel;
  directories: Array<DirectoryModel>;
  selectedDirectory: DirectoryModel|null;
  setDirectories: Dispatch<DirectoryModel[]>;
  changeSelectedDirectory: Dispatch<DirectoryModel>;
};

const Directory = (props: Props) => {
  const isSelected = () =>{
    if(props.selectedDirectory === null){
      return false;
    }
    return props.directory.id === props.selectedDirectory.id;
  }

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
        sx={{
          height: "30px",
          md: "3px",
          borderRadius: "5px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#464646",
            opacity: [0.9, 0.8, 0.7],
          },
          backgroundColor: isSelected() ? "#ae8e23" : "transparent",
        }}
        onClick={() => {
          props.changeSelectedDirectory(props.directory);
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          setAnchorEl(event.currentTarget);
        }}
      >
        <Box sx={{ my: "5px", display: "flex" }}>
          <Typography align="center" height="100%">
            <FolderIcon
              sx={{ mx: "2px", fontSize: 18, verticalAlign: "middle" }}
            />
          </Typography>
          <div style={{ width: "85%", whiteSpace: "nowrap" }}>
            <Box
              component="div"
              sx={{
                mt: "3px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                verticalAlign: "middle",
                fontSize: "14px",
              }}
            >
              {props.directory.name}
            </Box>
          </div>
        </Box>
      </Box>
      {
        // 削除可能なフォルダのみ右クリックでメニュー表示
        props.directory.deletable ? <DirectoryMenu anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose} directory={props.directory} directories={props.directories} setDirectories={props.setDirectories} /> : ''
      }
    </>
  );
};

export default Directory;