import { Dispatch, useState } from "react";
import Box from "@mui/material/Box";
import Directory from "./Directory";
import SourceIcon from "@mui/icons-material/Source";
import Typography from "@mui/material/Typography";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DirectoryModel from "../Model/Directory";
import DirectorySaveModal from "./DirectorySaveModal";

type Props = {
  directories: Array<DirectoryModel>;
  selectedDirectory: DirectoryModel | null;
  setDirectories: Dispatch<DirectoryModel[]>;
  changeSelectedDirectory: Dispatch<DirectoryModel>;
};

const DirectoryList = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: "100%", backgroundColor: "#333333" }}>
      <Box
        sx={{
          height: "95.5%",
        }}
      >
        <Box sx={{ pt: "5px", mb: "3px" , display: "flex" }}>
          <SourceIcon
            sx={{ mx: "3px", fontSize: 22, verticalAlign: "middle", color: "#aaa" }}
          />
          <Typography sx={{ color: "#aaa" }}>Folders</Typography>
        </Box>
        <Box
        sx={{
          height: "93.5%",
          cursor: "pointer",
          overflowY: "scroll",
          pl: "0.2rem",
        }}>
          {props.directories.map((directory) => (
            <Box
              alignItems="center"
              key={directory.id}
            >
              <Box>
                <Directory
                  directory={directory}
                  directories={props.directories}
                  setDirectories={props.setDirectories}
                  selectedDirectory={props.selectedDirectory}
                  changeSelectedDirectory={props.changeSelectedDirectory}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", mb: "10px", cursor: "pointer" }}
        onClick={handleOpen}
      >
        <CreateNewFolderIcon
          sx={{ mx: "3px", fontSize: 22, verticalAlign: "middle" }}
        />
        <Typography sx={{ mt: "2px", fontSize: 14 }}>新規作成</Typography>
      </Box>
      <DirectorySaveModal
        open={open}
        handleClose={handleClose}
        action="CREATE"
        directory={null}
        changeSelectedDirectory={props.changeSelectedDirectory}
        directories={props.directories}
        setDirectories={props.setDirectories}
      />
    </Box>
  );
};

export default DirectoryList;
