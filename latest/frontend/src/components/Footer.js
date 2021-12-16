import '../static/styles/Footer.css';
import finalLogo from '../static/images/footer/final logo.png';

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="l-footer">
        <img src={finalLogo} alt="" style={{width: '40%'}} />
        <p>卡牌之神機械人啟發自遊戲人生與及多到動漫，希望為各位動漫迷提供一個可以收集自己喜歡角色的地方。這個遊戲稍後更會加入戰鬥系統，玩家與玩家之中可以使用自己深愛的角色組成隊伍然後進行互相切磋。此外，所有角色會開放給全部玩家共同製作，大家可以參與製作自己喜歡的角色。那是不宜遲，<b>ゲーム開始。。。</b></p>
      </div>
      <ul className="r-footer">
        <li className="box">
          <h2>卡牌之神</h2>
          <ul className="box">
            <li><a href="/#">Discord 伺服器 : 雀可美特討論區</a></li>
            <li><a href="/#">開發者 : shr00m#7911, EFunLee#7777</a></li>
            <li><a href="/#">版本 : test1.0</a></li>
            <li><a href="/#">更新日期 : 28 / 10</a></li>
          </ul>
        </li>
        <li className="box">
          <h2>網頁資訊</h2>
          <ul className="box">
            <li><a href="/#">主頁</a></li>
            <li><a href="/#">抽卡</a></li>
            <li><a href="/#">圖鑒</a></li>
            <li><a href="/#">問題</a></li>
          </ul>
        </li>
        <li className="box">
          <h2>條款與及聲明</h2>
          <ul className="box">
            <li><a href="/#">版權</a></li>
            <li><a href="/#">免責聲明</a></li>
            <li><a href="/#">投訴</a></li>
          </ul>
        </li>
      </ul>
      <div className="b-footer">
        <p>All rights reserved by ©雀可美特討論區 ( discord ) 2021 </p>
      </div>
    </footer>
  );
};

export default Footer;