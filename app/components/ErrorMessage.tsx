import React, { useState, useEffect } from "react";

function ErrorMessagePopup({ message, onClose }: any) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div className="error-popup">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export function MyComponent() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  function handleAsyncAction() {
    setErrorMessage("エラーですｙ");
    setShowError(true);
  }

  const closeErrorPopup = () => {
    setShowError(false);
    setErrorMessage("");
  };

  return (
    <div>
      <button onClick={handleAsyncAction}>非同期処理を実行</button>
      {showError && (
        <ErrorMessagePopup message={errorMessage} onClose={closeErrorPopup} />
      )}
    </div>
  );
}
