import React, {
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { Chip } from "@mui/material";

function ChangeNameforCondition(option: Number) {
  if (option === 0) {
    return "特になし";
  } else if (option === 1) {
    return "あり";
  }
}

function ChangeNameforPlaytime(option: Number) {
  if (option === 0) {
    return "30分未満";
  } else if (option === 1) {
    return "30分以上〜60分未満";
  } else if (option === 2) {
    return "60分以上〜90分未満";
  } else if (option === 3) {
    return "90分以上〜120分未満";
  } else if (option === 4) {
    return "120分以上";
  } else {
    return "";
  }
}

function ChangeNameforFee(option: Number) {
  if (option === 0) {
    return "無料";
  } else if (option === 1) {
    return "有料";
  } else if (option === 2) {
    return "その他";
  }
}

function ChangeNameforContact(option: Number) {
  if (option === 0) {
    return "必要";
  } else if (option === 1) {
    return "不要";
  } else if (option === 2) {
    return "その他";
  }
}

function ChangeNameforCredit(option: Number) {
  if (option === 0) {
    return "必要";
  } else if (option === 1) {
    return "不要";
  } else if (option === 2) {
    return "その他";
  }
}

function ChangeNameforModification(option: Number) {
  if (option === 0) {
    return "改変不可";
  } else if (option === 1) {
    return "改変自由";
  } else if (option === 2) {
    return "その他";
  }
}

function PostCardEdit({ post, setFormData }: any) {
  const [isClicked, setIsClicked] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [fileSrc, setFileSrc] = useState<string>("");

  useEffect(() => {
    if (post?.image) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(post.image);
    }
  }, [post?.image]);

  useEffect(() => {
    if (post?.pdfFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(post.pdfFile);
    }
  }, [post?.pdfFile]);

  const clickmen = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      number_of_men: 8,
    }));
  };

  return (
    <div className="sticky top-28 border border-opacity-20 p-4 box-border shadow-md rounded-lg my-6 mx-auto w-1/2 h-192 bg-yellow-100">
      <div className="flex justify-between">
        <div className="">
          <div className="px-4 pt-4">
            <div>
              {imageSrc ? (
                <label htmlFor="imageInput" style={{ cursor: "pointer" }}>
                  <img
                    src={imageSrc}
                    alt="Avatar"
                    style={{ width: "80px", height: "80px" }}
                  />
                </label>
              ) : (
                <label htmlFor="imageInput" style={{ cursor: "pointer" }}>
                  クリックして画像を選択
                </label>
              )}
              <input
                type="file"
                id="imageInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) {
                    if (file.size > 10000000) {
                    } else {
                      setFormData((prevData: any) => ({
                        ...prevData,
                        image: file,
                      }));
                    }
                  }
                }}
              />
            </div>
            <p>{post?.name}</p>
          </div>
          <div className="" onClick={clickmen}>
            <p>{post?.title}</p>
          </div>
          <div className="">
            <p>{post?.catchphrase}</p>
          </div>
        </div>
        <div className="">
          <div className="tagsContainer">
            {post?.tags &&
              post?.tags
                .slice(0, 3)
                .map((elem: any) => (
                  <Chip
                    key={elem}
                    label={elem}
                    clickable
                    style={{ margin: "0.5rem" }}
                  />
                ))}
            {post?.tags && post?.tags.length > 3 && (
              <Chip
                key="ellipsis"
                label="..."
                clickable
                style={{ margin: "0.5rem" }}
              />
            )}
          </div>
          <div className="PlotDetail">
            <p className="Playtime">
              上演時間:{" "}
              <span className="Underline">
                {ChangeNameforPlaytime(Number(post?.playtime))}
              </span>
            </p>
            <div className="PersonCount">
              <p>
                男: <span className="Emphasize">{post?.number_of_men}</span>
              </p>
              <p>
                女: <span className="Emphasize">{post?.number_of_women}</span>
              </p>
              <p>
                総人数:{" "}
                <span className="Emphasize">
                  {post?.total_number_of_people}
                </span>
              </p>
            </div>
          </div>
          <img
            src={post?.user_image_url}
            alt="Avatar"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
      </div>

      <div className="flex items-center">
        <p className="text-xl font-bold ">上演料</p>
        <p className="px-64">{ChangeNameforFee(Number(post?.fee))}</p>
        <p>{post?.feeText}</p>
      </div>

      <div className="flex items-center">
        <p className="text-xl font-bold ">クレジット</p>

        <p className="px-64">{ChangeNameforCredit(Number(post?.credit))}</p>
        <p>{post?.creditText}</p>
      </div>

      <div className="flex items-center">
        <p className="text-xl font-bold ">作者への連絡</p>

        <p className="px-64">{ChangeNameforContact(Number(post?.contact))}</p>
        <p>{post?.contactText}</p>
      </div>

      <div className="flex items-center">
        <p className="text-xl font-bold ">改変に関して</p>

        <p className="px-64">
          {ChangeNameforModification(Number(post?.modification))}
        </p>
        <p>{post?.modificationText}</p>
      </div>

      <div className="flex items-center">
        <p className="text-xl font-bold ">そのほか条件</p>

        <p className="px-64">
          {ChangeNameforCondition(Number(post?.condition))}
        </p>
        <p>{post?.conditionText}</p>
      </div>

      <div>
        <embed src={fileSrc} className="w-full h-112" />
      </div>
    </div>
  );
}

export default PostCardEdit;
