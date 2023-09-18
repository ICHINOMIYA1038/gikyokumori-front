import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";

interface DeleteButtonProps {
  tableName: string;
  primaryColumnName: string;
  id: number;
  endpointUrl: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({
  tableName,
  primaryColumnName,
  id,
  endpointUrl,
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!confirmed) {
        return;
      }
      const response = await axios.delete(`${endpointUrl}/${id}`);
      router.push(`/users`);
      // ここで必要な追加の処理を実行することもできます
    } catch (error) {
      console.error(error); // エラーハンドリング
      // エラー処理を行うこともできます
    }
  };

  return (
    <div>
      <ClearIcon className="icon" onClick={handleDelete} />
    </div>
  );
};

export default DeleteButton;
