import { useState, useEffect, useRef } from 'react'
import { Header } from '../Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../Model/User';
import { File, createRegisteredFiles, addNewFile, createNonRegisteredFile } from '../Model/File';
import DirectoryModel from '../Model/Directory';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DirectoryList from '../Home/DirectoryList';
import FileList from '../Home/FileList';
import Editor from '../Home/Editor';
import Preview from '../Home/Preview';
import dayjs from 'dayjs'

export const Home = () => {

  //画面左のフォルダ、ファイルリストの表示フラグ
  const [isListVisible, setIsListVisible] = useState<boolean>(true);

  // プレビューモードフラグ
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const [user, setUser] = useState<User>();

  const newUser = (user: User) => {
    setUser(user);
  };

  //ファイルが編集されたかフラグ
  const [isEditedFile, setIsEditedFile] = useState<boolean>(false);

  const [directories, setDirectories] = useState<Array<DirectoryModel>>([]);
  const newDirectories = (directories :Array<DirectoryModel>) => {
    setDirectories(directories)
  };

  const [files, setFiles] = useState<Array<File>>([]);
  const newFiles = (files :Array<File>) => {
    setFiles(createRegisteredFiles(files));
  };

  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryModel | null>(null);
  async function changeSelectedDirectory(directory :DirectoryModel) {
    // ファイルを保存する
    if (isEditedFile) {
      // タイマーリセット
      resetTimer();
      await updateFile(selectedFile);
    }

    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + '/directories/' + directory.id + '/files'
      );
  
      // ファイルの更新が完了した後にディレクトリを変更する
      setSelectedDirectory(directory);
      newFiles(res.data.files);
      let file = res.data.files[0];
      if (!file) {
        file = createNonRegisteredFile({ user_id: user!.id, dir_id: directory.id });
      }
      setSelectedFile(file);
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  async function changeSelectedFile(file :File|null) {

    // 以前選択されていたファイルを更新 or 削除
    if (isEditedFile) {
      // タイマーリセット
      resetTimer();
      await updateFile(selectedFile);
    }

    // contentが空の場合にファイル配列から削除
    if (selectedFile!.content === '' ){
      // ファイルの内容が空文字の場合にファイル配列から削除
      const index = files.findIndex(file => file.id === selectedFile!.id)
      files.splice(index, 1);
    }

    // 選択中ファイルを変更
    setSelectedFile(file)
  }

  async function updateFile(file :File|null) {
    // ファイル保存
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(
        process.env.REACT_APP_API_URL + '/file',
        {
          file: file
        }
      )
      .then((res) => {
        // 保存が成功した場合、登録済フラグをONにする
        const index = files.findIndex(file => file.id === selectedFile!.id)
        files[index].is_registered = true;
        // setFiles(files);
        console.log(files);
      }).catch(error => {
        console.log(error);
      });
    });

    // 編集済みフラグを初期化
    setIsEditedFile(false);
  }

  // フォルダ内のファイル一覧を初期化
  const initFiles = () => {
    const newFiles = addNewFile([], user!.id, selectedDirectory!.id);
    setFiles(newFiles);
    setSelectedFile(newFiles[0]);
    setIsEditedFile(false);
  }

  const createFile = () => {
    // ファイル配列に新規ファイルを追加
    const newFiles = addNewFile(files, user!.id, selectedDirectory!.id);
    setFiles(newFiles);
    setSelectedFile(newFiles[0]);
    setIsEditedFile(false);
    changeSelectedFile(newFiles[0]);
  };

  const editFile = (value: string) => {
    if(selectedFile === null) return;

    // 配列から削除
    const newFiles = files.filter(file => file.id !== selectedFile.id)

    // 編集後のファイル値
    const newFileValue = { ...selectedFile, content: value, updated_at: dayjs().format('YYYY/MM/DD HH:mm:ss') };

    // 新しいファイルを配列の先頭に配置
    newFiles.unshift(newFileValue)
    setFiles(newFiles);

    // 選択されたファイルを更新し、現在の編集フラグを更新
    setSelectedFile(newFileValue)

    // 編編集フラグをON
    setIsEditedFile(true);
    console.log('aaa');

    // オートセーブ開始
    autoSaveWithFile(newFileValue);
  };

  // ファイル自動保存タイマー
  const timerRef = useRef<number | null>(null);

  // タイマーリセット処理
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // ファイルが編集された場合、5秒毎に自動保存処理
  const autoSaveWithFile = (file :File|null) => {
    if(file === null) return;

    // タイマーが起動していた場合リセット
    if (timerRef.current) {
      resetTimer();
    }

    timerRef.current = window.setTimeout(() => {
      if (isEditedFile) {
        updateFile(file);
      }
      // タイマーリセット
      resetTimer();
    }, 5000);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/home')
    .then((res) => {
      newUser(res.data.user);
      newDirectories(res.data.directories);
      newFiles(res.data.files);
      const selectedDirectory = res.data.directories.find((dir :DirectoryModel) => dir.id === res.data.selectedDirectoryId);
      if (selectedDirectory) {
        setSelectedDirectory(selectedDirectory);
      }

      let selectedFile = res.data.files[0];
      if (!selectedFile) {
        selectedFile = createNonRegisteredFile({user_id: res.data.user.id, dir_id: res.data.selectedDirectoryId})
      }
      setSelectedFile(selectedFile);

    }).catch(error => {
      navigate("/signin");
    })
  },[]);

  return (
    <>
      <Header
        isListVisible={isListVisible}
        setIsListVisible={setIsListVisible}
        isPreviewMode={isPreviewMode}
        togglePreviewMode={togglePreviewMode}
      />
      <CssBaseline />
      <Box sx={{ height: '92vh' }}>
        <Grid container sx={{ height: '100%' }} justifyContent="center">
          {isPreviewMode ? (
            <Grid item xs={8}>
              <Preview file={selectedFile} isPreviewMode={true}/>
            </Grid>
          ) : (
            <>
              {isListVisible && (
                <>
                  <Grid item xs={1.2} sx={{ height: '100%' }}>
                    <DirectoryList
                      directories={directories}
                      setDirectories={setDirectories}
                      selectedDirectory={selectedDirectory}
                      changeSelectedDirectory={changeSelectedDirectory}
                    />
                  </Grid>
                  <Grid item xs={1.2} sx={{ height: '100%' }}>
                    <FileList
                      files={files}
                      selectedFile={selectedFile}
                      setFiles={setFiles}
                      changeSelectedFile={changeSelectedFile}
                      createFile={createFile}
                      initFiles={initFiles}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={isListVisible ? 4.8 : 6} sx={{ height: '100%' }}>
                <Editor file={selectedFile} editFile={editFile} />
              </Grid>
              <Grid item xs={isListVisible ? 4.8 : 6} sx={{ height: '100%' }}>
                <Preview file={selectedFile} isPreviewMode={false}/>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
