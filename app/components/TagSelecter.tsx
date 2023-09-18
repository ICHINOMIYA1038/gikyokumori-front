import { Chip, TextField, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";

//Homeコンポーネント
export const TagSelecter = ({ onChildStateChange, tags }: any) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  let tagnames: string[] = [];
  if (tags != undefined) {
    tagnames = tags;
  } else {
    tagnames = [
      "ホラー",
      "アクション",
      "感動",
      "不条理劇",
      "コメディ",
      "会話劇",
      "アングラ",
      "コンテンポラリー",
      "抽象劇",
      "具象劇",
      "群像劇",
      "Tag12",
      "Tag13",
      "Tag14",
      "Tag15",
      "Tag16",
      "Tag17",
      "Tag18",
      "Tag19",
      "Tag20",
    ];
  }
  const [validation, setValidation] = useState({ error: false, message: "" });

  useEffect(() => {
    onChildStateChange(selectedTags);
  }, [selectedTags]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tag: any) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const handleInputChange = (event: any, value: any) => {
    setSelectedTags(value);
  };

  return (
    <div className="max-w-md">
      <div>
        <Autocomplete //importしたコンポーネントを使用
          renderTags={(value: readonly string[], getTagProps: any) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="filled"
                label={option}
                color="primary"
                {...getTagProps({ index })}
              />
            ))
          }
          multiple //複数選択
          freeSolo //任意の入力値を管理できる（デフォルトはオプション選択のみ）
          filterSelectedOptions //選択されたオプションを非表示にする
          options={tagnames.map((option: any) => option)} //ドロップダウンメニューの項目：文字列の配列
          value={selectedTags} //入力欄に表示される値：①のときは文字列の配列、指定しないときは文字列 --- ③
          onChange={handleInputChange} //コールバック関数（オプションを選択か「Enter」を押すとイベントが起きる）： function --- ④
          renderInput={(params: any) => (
            <TextField //importしたコンポーネント
              {...params}
              variant="standard"
              label="タグ" // --- ⑤
              placeholder="タグ名を入力"
              error={validation.error} //エラー状態（trueのときは⑤labelや⑥helperTextが赤色になる）： boolean
              helperText={validation.message} //入力欄の下に表示されるテキスト： node（公式のデモ通り文字列を指定） // --- ⑥
            />
          )}
        />
      </div>
      <div>
        {tagnames.slice(0, 10).map((tag: any) => (
          <Chip
            key={tag}
            label={tag}
            clickable
            color={selectedTags.includes(tag) ? "secondary" : "default"}
            onClick={() => handleTagClick(tag)}
            style={{ margin: "0.5rem" }}
          />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {}

export default TagSelecter;
