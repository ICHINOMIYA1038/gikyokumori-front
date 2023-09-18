import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Chip, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import Cookies from "js-cookie";
import LoginPopup from "@/components/LoginPopup";
import ShareButton from "@/components/Share";
import { useMediaQuery } from "@mui/material";

interface Post {
  post_id: number;
  content: string;
  user_id: string;
  title: string;
  synopsis: string;
  catchphrase: string;
  number_of_men: string;
  number_of_women: string;
  total_number_of_people: string;
  playtime: string;
  image_url: string;
  file_url: string;
  user_image_url: string;
  name: string;
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
  }
}

function PostCardDetail({ post }: any) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [isShareClicked, setisShareClicked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [favo_num, setFavoNum] = useState(0);
  useEffect(() => {
    Favolist();
    setFavoNum(post.favo_num);
  }, []);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("uid", Cookies.get("uid") || "");
  headers.append("client", Cookies.get("client") || "");
  headers.append("access-token", Cookies.get("access-token") || "");

  const isMediumScreen = useMediaQuery(
    (theme: { breakpoints: { up: (arg0: string) => any } }) =>
      theme.breakpoints.up("sm")
  );

  const handleDownload = () => {
    // ファイルをダウンロードする処理を記述する
    window.open(post.file_url, "_blank");
  };
  async function Favo() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAILS_API}/posts/${post.post_id}/favorites`,
      { method: "POST", headers: headers }
    );

    if (response.ok) {
      setIsFavorite(!isFavorite);
      setFavoNum(favo_num + 1);
    } else {
      const data = await response.json();
      setErrorMessage(data.error);
    }
  }

  async function DeleteFavo() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAILS_API}/posts/${post.post_id}/favorites`,
      { method: "DELETE", headers: headers }
    );
    if (response.ok) {
      setIsFavorite(!isFavorite);
      setFavoNum(favo_num - 1);
    } else {
      const data = await response.json();
    }
  }

  async function Favolist() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAILS_API}/post/${post.post_id}/favo`,
      { method: "GET", headers: headers }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.result == "OK") {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }

  return (
    <div className={`PostCard ${isClicked ? "clicked" : ""} PopUpContainer`}>
      <div className="PostCardHeadar">
        <div className="PostCardHeaderLeft">
          <div className="PostCardUserProfile">
            <img
              src={post.user_image_url}
              alt="Avatar"
              style={{ width: "80px", height: "80px" }}
            />
            <p>{post.name}</p>
          </div>
          <div className="PostCardTitle">
            <p>{post.title}</p>
          </div>
          <div className="PostCardDescription">
            <p>{post.catchphrase}</p>
          </div>
        </div>
        <div className="PostCardHeaderRight">
          <div className="tagsContainer">
            {post.tags &&
              post.tags
                .slice(0, 3)
                .map((elem: any) => (
                  <Chip
                    key={elem}
                    label={elem.name}
                    clickable
                    style={{ margin: "0.5rem" }}
                  />
                ))}
            {post.tags && post.tags.length > 3 && (
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
                {ChangeNameforPlaytime(post.playtime)}
              </span>
            </p>
            <div className="PersonCount">
              <p>
                男: <span className="Emphasize">{post.number_of_men}</span>
              </p>
              <p>
                女: <span className="Emphasize">{post.number_of_women}</span>
              </p>
              <p>
                総人数:{" "}
                <span className="Emphasize">{post.total_number_of_people}</span>
              </p>
            </div>
          </div>
          <img
            src={post.image_url}
            alt="Avatar"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
      </div>
      <div className="PostCardFooter">
        <embed src={post.file_url} className="embedPDF" />
      </div>

      <div className="SynopsisContainer">
        <p>あらすじ</p>
        <p>{post.synopsis}</p>
      </div>

      <div className="CopyRightContainer">
        <p>著作権: 無料</p>
        <p>
          脚色や改変は適宜行ってください。 特に制限はありません。
          是非とも感想などでもご連絡いただけると嬉しいです。
        </p>
      </div>

      <div className="impressionContainer">
        <div className="DownloadIcon">
          <DownloadIcon id="interactive-icon" onClick={handleDownload} />
          {isMediumScreen && <span className="icon_text">download</span>}
        </div>
        <div
          className="FavoriteIcon"
          onClick={() => {
            if (isFavorite) {
              DeleteFavo();
            } else {
              Favo();
            }
          }}
        >
          <FavoriteIcon
            id="interactive-icon"
            style={{ color: isFavorite ? "red" : "black" }}
          />
          <span className="icon_text">{favo_num}</span>
        </div>
        <div
          className="ShareIcon"
          onClick={() => {
            if (isShareClicked) {
              setisShareClicked(false);
            } else {
              setisShareClicked(true);
            }
          }}
        >
          <ShareIcon id="interactive-icon" />
          {isMediumScreen && <span className="icon_text">share</span>}
        </div>
        <div className="VisibilityIcon">
          <VisibilityIcon id="interactive-icon" />
          {isMediumScreen && (
            <span className="icon_text">{post.access_num} view</span>
          )}
          {!isMediumScreen && (
            <span className="icon_text">{post.access_num}</span>
          )}
        </div>
      </div>
      <div>
        {errorMessage && (
          <LoginPopup
            errorMessage={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
        {isShareClicked && (
          <ShareButton
            onClose={() => {
              if (isShareClicked) {
                setisShareClicked(false);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PostCardDetail;
