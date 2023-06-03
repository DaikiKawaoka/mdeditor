import { Dispatch, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import FileModel from "../Model/File";
import FileDeleteModal from './FileDeleteModal';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  anchorEl: HTMLElement|null;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  file: FileModel;
  files: Array<FileModel>;
  setFiles: Dispatch<FileModel[]>;
  initFiles: () => void;
};

const FileMenu = (props: Props) => {
  const open = Boolean(props.anchorEl);
  const [openDeleteModal, setDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={open}
      onClose={props.handleClose}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={handleOpenDeleteModal}>
        <ListItemIcon>
          <DeleteIcon fontSize="small"/>
        </ListItemIcon>
        <Typography variant="inherit">
          ファイルを削除
        </Typography>
      </MenuItem>
      <FileDeleteModal openModal={openDeleteModal} handleCloseModal={handleCloseDeleteModal} file={props.file} files={props.files} setFiles={props.setFiles} initFiles={props.initFiles}/>
    </Menu>
  );
};

export default FileMenu;