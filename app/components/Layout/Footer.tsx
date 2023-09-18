import React from "react";
import FooterBtn from "./FooterBtn";
import Image from "next/image"
import Link from "next/link";

const Footer :React.FC = ()=>{
    return (
<footer className="footer">
  <div className="md-flex md-justify-between">
    <Link href="/">
      <Image 
      src="/footer.png"
      alt="logo"
      width={200}
      height={45} 
      />
    </Link>
    <div className="grid">
      <div>
        <p className="footer__navi-heading">このサイトについて</p>
        <ul className="footer__navi">
          <li><Link href="/support/aboutus">運営者概要</Link></li>
          <li><Link href="/support/press-release">プレスリリース</Link></li>
          <li><Link href="#"></Link></li>
        </ul>
      </div>
      <div>
        <p className="footer__navi-heading">ヘルプ</p>
        <ul className="footer__navi">
          <li><Link href="/support/contact">お問い合わせ</Link></li>
          <li><Link href="/support/privacy-policy">プライバシーポリシー</Link></li>
        </ul>
      </div>
      <div>
        <p className="footer__navi-heading">利用規約等</p>
        <ul className="footer__navi">
          <li><Link href="/support/tos">利用規約</Link></li>
          <li><Link href="#"></Link></li>
          <li><Link href="#"></Link></li>
          <li><Link href="#"></Link></li>
        </ul>
      </div>
    </div>
  </div>
  <p className="copyright">© 2023 <Link href="">戯曲の森</Link> All Rights Reserved.
  </p>
  <FooterBtn/>
</footer>
    );
}
export default Footer;