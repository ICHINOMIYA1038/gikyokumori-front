import { useRouter } from "next/router";

function TopImage({}: any) {
  const router = useRouter();


  function onclickbutton() {
    router.push("/SignUp");
  }

  return (
    <>
      <div className="top-container">
        <div className="top-lead-layout">
          <div className="top-lead">
            <div className="top-main-lead-message">
              <h2>
                戯曲を投稿し<br></br>評価しあうプラットフォーム
              </h2>
            </div>
            <div className="top-sub-lead-message">
              <p>脚本を探す/脚本を投稿する/脚本を評価する</p>
            </div>

            <button className="top-lead-button" onClick={onclickbutton}>
              無料で新規登録
            </button>
          </div>
        </div>
        <div className="top-image-container"></div>
      </div>
    </>
  );
}

export default TopImage;
