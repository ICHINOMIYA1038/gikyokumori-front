import { SetStateAction, useEffect, useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import TagSelecter from "@/components/TagSelecter";
import { useQuery } from "@tanstack/react-query";


export default function SearchForm({ sort_by, sortDirection }: any) {
  const [keyword, setKeyword] = useState<string>("");
  const [minMaleCount, setMinMaleCount] = useState<string>("");
  const [maxMaleCount, setMaxMaleCount] = useState<string>("");
  const [minFemaleCount, setMinFemaleCount] = useState<string>("");
  const [maxFemaleCount, setMaxFemaleCount] = useState<string>("");
  const [minTotalCount, setMinTotalCount] = useState<string>("");
  const [maxTotalCount, setMaxTotalCount] = useState<string>("");
  const [minPlaytime, setMinPlaytime] = useState<number>(0);
  const [maxPlaytime, setMaxPlaytime] = useState<number>(4);
  const [tags, setSelectedTags] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    handleSubmit();
  }, [sort_by, sortDirection]);

  const handleChildStateChange = (value: SetStateAction<string[]>) => {
    setSelectedTags(value);
  };

  const handleSubmit = () => {
    const page = 1;
    const per = 8;

    const searchParams: Record<string, string> = {
      keyword: keyword,
      minMaleCount: minMaleCount,
      maxMaleCount: maxMaleCount,
      minFemaleCount: minFemaleCount,
      maxFemaleCount: maxFemaleCount,
      minTotalCount: minTotalCount,
      maxTotalCount: maxTotalCount,
      minPlaytime: minPlaytime.toString(),
      maxPlaytime: maxPlaytime.toString(),
      sort_by: sort_by.toString(),
      sortDirection: sortDirection.toString(),
      tags: tags.join(","), // tagsをカンマ区切りの文字列に変換
      page: page.toString(),
      per: per.toString(),
    };

    const query = new URLSearchParams(searchParams).toString();
    router.push(`/?${query}`);
  };

  return (
    <>
      <div className="my-4 mx-auto max-w-3xl border-solid border-2 border-gray-800 p-5 rounded-3xl">
        <p className="font-bold text-[18px]">脚本検索</p>
        <div>
          <p className="font-bold text-[18px]">キーワード</p>
          <div className="mt-1 mb-4 flex">
            <TextField
              className="w-80"
              label="キーワード"
              variant="outlined"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setKeyword(e.target.value)
              }
            />
          </div>
        </div>
        <div className="lg:flex">
          <div>
            <p className="font-bold text-[18px]">男性人数</p>
            <div className="mt-1 mb-4 flex">
              <TextField
                className="w-16"
                type="number"
                size="small"
                value={minMaleCount}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMinMaleCount(e.target.value)
                }
              />
              <p className="mx-1 my-2">〜</p>
              <TextField
                className="w-16"
                type="number"
                value={maxMaleCount}
                size="small"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMaxMaleCount(e.target.value)
                }
              />
            </div>
            <p className="font-bold text-[18px]">女性人数</p>
            <div className="mt-1 mb-4 flex">
              <TextField
                className="w-16"
                type="number"
                size="small"
                value={minFemaleCount}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMinFemaleCount(e.target.value)
                }
              />
              <p className="mx-1 my-2">〜</p>
              <TextField
                className="w-16"
                type="number"
                value={maxFemaleCount}
                size="small"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMaxFemaleCount(e.target.value)
                }
              />
            </div>
            <p className="font-bold text-[18px]">総人数</p>
            <div className="mt-1 mb-4 flex">
              <TextField
                className="w-16"
                type="number"
                size="small"
                value={minTotalCount}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMinTotalCount(e.target.value)
                }
              />
              <p className="mx-1 my-2">〜</p>
              <TextField
                className="w-16"
                type="number"
                value={maxTotalCount}
                size="small"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMaxTotalCount(e.target.value)
                }
              />
            </div>
            <p className="font-bold text-[18px]">上演時間</p>
            <div className="mt-1 mb-4 flex">
              <TextField
                select
                value={minPlaytime}
                onChange={(e: any) => setMinPlaytime(e.target.value)}
              >
                <MenuItem value={0}>30分未満</MenuItem>
                <MenuItem value={1}>30分以上〜60分未満</MenuItem>
                <MenuItem value={2}>60分以上〜90分未満</MenuItem>
                <MenuItem value={3}>90分以上〜120分未満</MenuItem>
                <MenuItem value={4}>120分以上</MenuItem>
              </TextField>
              <p className="mx-1 my-2">〜</p>
              <TextField
                select
                value={maxPlaytime}
                onChange={(e: any) => setMaxPlaytime(e.target.value)}
              >
                <MenuItem value={0}>30分未満</MenuItem>
                <MenuItem value={1}>30分以上〜60分未満</MenuItem>
                <MenuItem value={2}>60分以上〜90分未満</MenuItem>
                <MenuItem value={3}>90分以上〜120分未満</MenuItem>
                <MenuItem value={4}>120分以上</MenuItem>
              </TextField>
            </div>
          </div>
          <div className="lg:p-5">
            <p className="font-bold text-[18px]">タグ</p>
            <TagSelecter
              onChildStateChange={handleChildStateChange}
              tags={undefined}
            />
          </div>
        </div>
        <div className="w-96 mx-auto">
          <Button
            className="w-96 text-center"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            検索
          </Button>
        </div>
      </div>
    </>
  );
}
