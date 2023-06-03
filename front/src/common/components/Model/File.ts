import dayjs from 'dayjs'

export type File = {
  id: number,
  user_id: number,
  dir_id: number,
  content: string,
  created_at: string,
  updated_at: string,
  is_registered: boolean, // 追加されたフラグカラム
}

// ファイル作成（DB未登録ファイル）
export const createNonRegisteredFile = (params: Omit<File, 'id'|'content'|'created_at'|'updated_at'|'is_registered'>): File => ({
  ...params,
  id: generateUniqueRandomId(null),
  content: '',
  created_at: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  updated_at: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  is_registered: false, // フラグカラムの初期値をfalseに設定
});

// ファイル配列作成
export const createNonRegisteredFiles = (fileParamsList: Omit<File, 'content'|'created_at'|'updated_at'|'is_registered'>[]): File[] => {
  return fileParamsList.map((fileParams) => createNonRegisteredFile(fileParams));
};

// 登録済みファイル作成
export const createRegisteredFile = (params: Omit<File, 'is_registered'>): File => ({
  ...params,
  is_registered: true, // フラグカラムの初期値をtrueに設定
});

// 登録済みファイル配列作成
export const createRegisteredFiles = (fileParamsList: Omit<File, 'is_registered'>[]): File[] => {
  return fileParamsList.map((fileParams) => createRegisteredFile({...fileParams}));
};

// ファイルをファイル配列に追加
export const addFile = (files: File[], file: File): File[] => {
  return [...files, file];
};

export const addNewFile = (files: File[], user_id: number, dir_id: number): File[] => {
  const newFileParams = {
    id: generateUniqueRandomId(files.map(file => file.id)),
    user_id: user_id,
    dir_id: dir_id,
  };
  const newFile = createNonRegisteredFile(newFileParams);
  // 新規ファイルは配列の先頭に追加
  return [newFile, ...files];
};

const generateUniqueRandomId = (existingIds: number[] | null): number =>{
  const max = Number.MAX_SAFE_INTEGER;
  const min = 0;
  const range = max - min + 1;
  let id = Math.floor(Math.random() * range) + min;

  // existingIdsがNULLではない時は、重複チェックを行う
  if(existingIds){
    while (existingIds.includes(id)) {
      id = Math.floor(Math.random() * range) + min;
    }
  }
  return id;
}

export function getDisplayUpdatedAt(file: File) {
  dayjs.locale('ja');
  const today = dayjs().format('YYYY/MM/DD');
  const updatedDate = dayjs(file.updated_at).format('YYYY/MM/DD');

  // 現在日より更新日の方が小さい場合は日付表示（例: 2023/03/20）
  if (today > updatedDate) {
    return updatedDate
  }

  // 時間を表示（例: 12:30）
  return dayjs(file.updated_at).format('HH:mm')
}

export default File;