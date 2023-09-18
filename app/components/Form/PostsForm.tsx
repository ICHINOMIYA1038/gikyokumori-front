import { useRouter } from "next/router";
import { Alert, Button } from "@mui/material/";
import axios from "axios";
import Cookies from "js-cookie";
import TagSelecter from "@/components/TagSelecter";
import React, {
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { FormData } from "@/components/types/type";

type FormProps = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
};

const PostsForm: FC<FormProps> = ({ formData, setFormData }) => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pdfFileSizeLimit] = useState(50 * 1024 * 1024);
  const [imageFileSizeLimit] = useState(10 * 1024 * 1024);

  useEffect(() => {
    const { error } = router.query;
    if (error) {
      setIsError(true);
      setErrorMessage(decodeURIComponent(error as string));
    }
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      total_number_of_people: prevData.number_of_men + prevData.number_of_women,
    }));
  }, [formData.number_of_men, formData.number_of_women]);

  async function sendPageContent(content: any, router: any): Promise<void> {
    try {
      const URL = `${process.env.NEXT_PUBLIC_RAILS_API}/posts`;
      const response = await axios.post(URL, content, {
        headers: {
          "Content-Type": "multipart/form-data",
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          "access-token": Cookies.get("access-token"),
        },
      });
      router.push("/");
    } catch (error: any) {
      console.error("Error while sending page content:", error);
      setIsError(true);
      setErrorMessage(error.response.data.error);
      throw error;
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (formData.title?.trim() === "") {
      setIsError(true);
      setErrorMessage("タイトルを入力してください。");
      return;
    }

    if (formData.catchphrase.trim() === "") {
      setIsError(true);
      setErrorMessage("キャッチフレーズを入力してください。");
      return;
    }

    if (formData.number_of_men < 0 || formData.number_of_women < 0) {
      setIsError(true);
      setErrorMessage("人数は0以上で入力してください。");
      return;
    }

    if (formData.playtime === "") {
      setIsError(true);
      setErrorMessage("上演時間を選択してください。");
      return;
    }

    if (!formData.pdfFile) {
      setIsError(true);
      setErrorMessage("PDFファイルを選択してください。");
      return;
    }

    if (formData.pdfFile.size > pdfFileSizeLimit) {
      setIsError(true);
      setErrorMessage(
        `PDFファイルのサイズは${formatFileSize(
          pdfFileSizeLimit
        )}以下にしてください。`
      );
      return;
    }

    if (formData.image && formData.image.size > imageFileSizeLimit) {
      setIsError(true);
      setErrorMessage(
        `画像のサイズは${formatFileSize(
          imageFileSizeLimit
        )}以下にしてください。`
      );
      return;
    }

    const content = new FormData();
    content.append("post[title]", formData.title.trim());
    content.append("post[mainfile]", formData.pdfFile);
    if (formData.image) {
      content.append("post[postImage]", formData.image);
    }
    content.append("post[catchphrase]", formData.catchphrase.trim());
    content.append("post[number_of_men]", formData.number_of_men.toString());
    content.append(
      "post[number_of_women]",
      formData.number_of_women.toString()
    );
    content.append(
      "post[total_number_of_people]",
      formData.total_number_of_people.toString()
    );
    content.append("post[playtime]", formData.playtime);
    content.append("post[fee]", formData.fee);
    content.append("tags", formData.tags.join(","));

    sendPageContent(content, router)
      .then(() => {
        setIsError(true);
        setErrorMessage("完了しました。");
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage("エラーが発生しました。");
      });

    setFormData((prevData) => ({
      ...prevData,
      title: "",
      catchphrase: "",
      number_of_men: 0,
      number_of_women: 0,
      total_number_of_people: 0,
      playtime: "",
      pdfFile: null,
      image: null,
    }));
  };

  const handleChildStateChange = (value: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: value,
    }));
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size}B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)}KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)}MB`;
    }
  };

  return (
    <div>
      <form className="p-10 " onSubmit={handleSubmit}>
        <h1 className="font-bold text-3xl">脚本登録</h1>

        <div className="m-20">
          <div className="font-bold text-xl">基本情報</div>
          <label className="post-form-label">
            タイトル
            <textarea
              rows={1}
              className="resize-none"
              value={formData.title}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setFormData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }));
                }
              }}
              required
            />
            <div className="post-form-char-count">
              <span>{formData.title?.length}/30</span>
            </div>
          </label>

          <label className="post-form-label">
            キャッチフレーズ:
            <textarea
              className="resize-none"
              rows={3}
              value={formData.catchphrase}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setFormData((prevData) => ({
                    ...prevData,
                    catchphrase: e.target.value,
                  }));
                }
              }}
              required
            />
            <div className="post-form-char-count">
              <span>{formData.catchphrase?.length}/60</span>
            </div>
          </label>

          <div className="post-form-number">
            <label className="post-form-label">
              男:
              <input
                type="number"
                value={formData.number_of_men}
                min={0}
                max={21}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    number_of_men: Number(e.target.value),
                  }))
                }
                required
              />
            </label>

            <label className="post-form-label">
              女:
              <input
                type="number"
                value={formData.number_of_women}
                min={0}
                max={21}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    number_of_women: Number(e.target.value),
                  }))
                }
                required
              />
            </label>

            <label className="post-form-label">
              総人数:
              <input
                type="number"
                value={formData.total_number_of_people}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    total_number_of_people: Number(e.target.value),
                  }))
                }
                required
              />
            </label>
          </div>

          <label className="post-form-label">
            上演時間:
            <select
              value={formData.playtime}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  playtime: e.target.value,
                }))
              }
              required
            >
              <option value="">選択してください</option>
              <option value="0">30分未満</option>
              <option value="1">30分以上〜60分未満</option>
              <option value="2">60分以上〜90分未満</option>
              <option value="3">90分以上〜120分未満</option>
              <option value="4">120分以上</option>
            </select>
          </label>
        </div>

        <div className="m-20">
          <div className="font-bold text-3xl">添付ファイル</div>
          <label className="post-form-label">
            PDFファイル:
            <input
              className="post-form-input"
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  if (file.size > pdfFileSizeLimit) {
                    setIsError(true);
                    setErrorMessage(
                      `PDFファイルのサイズは${formatFileSize(
                        pdfFileSizeLimit
                      )}以下にしてください。`
                    );
                  } else {
                    setIsError(false);
                    setErrorMessage("");
                    setFormData((prevData) => ({
                      ...prevData,
                      pdfFile: file,
                    }));
                  }
                }
              }}
              required
            />
          </label>

          <label className="post-form-label">
            <label htmlFor="imageInput" style={{ cursor: "pointer" }}>
              クリックして画像を選択
            </label>
            <input
              className="post-form-input"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  if (file.size > imageFileSizeLimit) {
                    setIsError(true);
                    setErrorMessage(
                      `画像のサイズは${formatFileSize(
                        imageFileSizeLimit
                      )}以下にしてください。`
                    );
                  } else {
                    setIsError(false);
                    setErrorMessage("");
                    setFormData((prevData) => ({
                      ...prevData,
                      image: file,
                    }));
                  }
                }
              }}
            />
          </label>
        </div>

        <TagSelecter onChildStateChange={handleChildStateChange} />

        <div className="p-5">
          <p className="text-2xl">上演料</p>
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.fee === "0"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    fee: e.target.checked ? "0" : "",
                  }))
                }
              />
              <span className="ml-2">無料</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.fee === "1"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    fee: e.target.checked ? "1" : "",
                  }))
                }
              />
              <span className="ml-2">有料</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.fee === "2"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    fee: e.target.checked ? "2" : "",
                  }))
                }
              />
              <span className="ml-2">その他</span>
            </label>
          </div>
          {(formData.fee === "1" || formData.fee === "2") && (
            <textarea
              className="resize-none post-form-input mt-4 p-2 border rounded-md w-full"
              placeholder="料金が必要な場合は記入して下さい。"
              value={formData.feeText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  feeText: e.target.value,
                }))
              }
              rows={4}
            />
          )}
        </div>

        {/* クレジット */}
        <div className="p-5">
          <p className="text-2xl">クレジット</p>
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.credit === "0"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    credit: e.target.checked ? "0" : "",
                  }))
                }
              />
              <span className="ml-2">必要</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.credit === "1"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    credit: e.target.checked ? "1" : "",
                  }))
                }
              />
              <span className="ml-2">不要</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.credit === "2"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    credit: e.target.checked ? "2" : "",
                  }))
                }
              />
              <span className="ml-2">その他</span>
            </label>
          </div>
          {(formData.credit === "0" || formData.credit === "2") && (
            <textarea
              className=" resize-none post-form-input mt-4 p-2 border rounded-md w-full"
              placeholder="クレジットが必要な場合は、クレジットに記載する名前を記述してください。"
              value={formData.creditText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  creditText: e.target.value,
                }))
              }
              rows={4}
            />
          )}
        </div>
        {/* 作者への連絡 */}
        <div className="p-5">
          <p className="text-2xl">作者への連絡</p>
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.contact === "0"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    contact: e.target.checked ? "0" : "",
                  }))
                }
              />
              <span className="ml-2">必要</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.contact === "1"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    contact: e.target.checked ? "1" : "",
                  }))
                }
              />
              <span className="ml-2">不要</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.contact === "2"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    contact: e.target.checked ? "2" : "",
                  }))
                }
              />
              <span className="ml-2">その他</span>
            </label>
          </div>
          {(formData.contact === "0" || formData.contact === "2") && (
            <textarea
              className=" resize-none post-form-input mt-4 p-2 border rounded-md w-full"
              placeholder="必要の場合は連絡先を必ず記入してください。"
              value={formData.contactText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  contactText: e.target.value,
                }))
              }
              rows={4}
            />
          )}
        </div>

        {/* 脚本の改変 */}
        <div className="p-5">
          <p className="text-2xl">脚本の改変</p>
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.modification === "0"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    modification: e.target.checked ? "0" : "",
                  }))
                }
              />
              <span className="ml-2">改変不可</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.modification === "1"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    modification: e.target.checked ? "1" : "",
                  }))
                }
              />
              <span className="ml-2">改変自由</span>
            </label>
            <label className=" flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.modification === "2"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    modification: e.target.checked ? "2" : "",
                  }))
                }
              />
              <span className="ml-2">その他</span>
            </label>
          </div>
          {formData.modification === "2" && (
            <textarea
              className=" resize-none post-form-input mt-4 p-2 border rounded-md w-full"
              placeholder="脚本改変のルールについて自由に記述してください。"
              value={formData.modificationText}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  modificationText: e.target.value,
                }))
              }
              rows={4}
            />
          )}
        </div>

        <div className="p-5">
          <p className="text-2xl">そのほか条件</p>
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="post-form-input h-6 w-6"
                checked={formData.condition === "0"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    condition: e.target.checked ? "0" : "",
                  }))
                }
              />
              <span className="ml-2">特になし</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="h-6 w-6"
                checked={formData.condition === "1"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    condition: e.target.checked ? "1" : "",
                  }))
                }
              />
              <span className="ml-2">あり</span>
            </label>
          </div>
          {formData.condition === "1" && (
            <div className="mt-4">
              <p>その他の詳細</p>
              <textarea
                className=" resize-none mt-2 p-2 border rounded-md w-full"
                placeholder="その他の詳細を入力してください"
                value={formData.conditionText}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    conditionText: e.target.value,
                  }))
                }
                rows={4}
              />
            </div>
          )}
        </div>

        <Button color="primary" size="large" variant="contained" type="submit">
          投稿する
        </Button>
      </form>

      {isError && (
        <Alert
          style={{ width: "70%", display: "box", margin: "0 auto" }}
          onClose={() => {
            setIsError(false);
            setErrorMessage("");
          }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default PostsForm;
