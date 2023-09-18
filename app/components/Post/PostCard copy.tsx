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
import Image from "next/image";

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

function PostCard({ post }: any) {
  const router = useRouter();
  const [isShareClicked, setisShareClicked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [favo_num, setFavoNum] = useState(0);
  useEffect(() => {
    checkFavo();
    setFavoNum(post.favo_num);
  }, []);

  const handleDownload = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    window.open(post.file_url, "_blank");
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("uid", Cookies.get("uid") || "");
  headers.append("client", Cookies.get("client") || "");
  headers.append("access-token", Cookies.get("access-token") || "");

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

  async function checkFavo() {
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

  const HandleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/posts/${post.post_id}`);
  };

  return (
    <div
      className="max-w-2xl bg-antique p-5 border border-solid border-black m-5 rounded-lg cursor-pointer relative max-w-full ease-in-out hover:translate-y-1 hover:scale-105 duration-200"
      onClick={HandleCardClick}
    >
      <div className="flex">
        <div className="w-1/3">
          <div className="flex items-center px-15">
            {post.user_image_url && (
              <img
                src={post.user_image_url}
                alt="Avatar"
                style={{ width: "80px", height: "80px" }}
              />
            )}
            {!post.user_image_url && (
              <Image
                src="/default_avatar.png"
                alt="Avatar"
                width={100}
                height={100}
              />
            )}
            <p>{post.user.name}</p>
          </div>
          <div className="PostCardTitle">
            <p>{post.title}</p>
          </div>
          <div className="PostCardDescription">
            <p>{post.catchphrase}</p>
          </div>
          <Button />
        </div>
        <div className="w-1/3">
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
                    color="secondary"
                  />
                ))}
            {post.tags && post.tags.length > 3 && (
              <Chip
                key="ellipsis"
                label="..."
                clickable
                color="secondary"
                style={{ margin: "0.5rem" }}
              />
            )}
          </div>
          <div className="">
            <p className="">
              上演時間:{" "}
              <span className="font-bold underline">
                {ChangeNameforPlaytime(post.playtime)}
              </span>
            </p>
            <div className="flex gap-2">
              <p>
                男:{" "}
                <span className="font-bold underline">
                  {post.number_of_men}
                </span>
              </p>
              <p>
                女:{" "}
                <span className="font-bold underline">
                  {post.number_of_women}
                </span>
              </p>
              <p>
                総人数:{" "}
                <span className="font-bold underline">
                  {post.total_number_of_people}
                </span>
              </p>
            </div>
          </div>
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Avatar"
              style={{ width: "120px", height: "120px" }}
            />
          )}
          {!post.image_url && (
            <Image src="/NoImage.jpg" alt="Avatar" width={120} height={120} />
          )}
        </div>
      </div>
      <div></div>
      <div className="PostCardFooter">
        <embed src={post.file_url} className="embedPDF" />
      </div>

      <div className="flex justify-around">
        <div className="" onClick={handleDownload}>
          <DownloadIcon id="interactive-icon" component="svg" />
          <span className="invisible md:visible icon_text">download</span>
        </div>
        <div
          className=""
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
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
          <span className="invisible md:visible icon_text">{favo_num}</span>
        </div>
        <div
          className="ShareIcon"
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            if (isShareClicked) {
              setisShareClicked(false);
            } else {
              setisShareClicked(true);
            }
          }}
        >
          <ShareIcon id="interactive-icon" />
          <span className="invisible md:visible icon_text">share</span>
        </div>
        <div className="VisibilityIcon">
          <VisibilityIcon id="interactive-icon" />
          <span className="icon_text">
            {post.access_num} <span className="invisible md:visible">view</span>
          </span>
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

export default PostCard;
