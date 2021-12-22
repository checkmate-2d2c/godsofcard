import '../static/styles/Support.css';

function Support() {
  return (  
    <>
      <div id="n_Support">
        <h1 style={{ width: '100%', textAlign: 'center', color: 'white'}} >支援 Support</h1>
        <div style={{ width: '20%', margin: 'auto', border: 'white 1px solid'}} ></div>
      </div>
      <fieldset id="questions">
        <h2>問題</h2>
        <span>尋找問題</span>
      </fieldset>
      <br />
      <div className="card1-container">
        <div id="card1">
          <h2>聯繫資料</h2>
          <span>
            <b>Discord 伺服器：</b>
            <a href="https://discord.gg/checkmatekuhaku" target="_blank" rel="noreferrer">雀可美特討論區</a>
            <br />
            <b>開發者：</b>
            shr00m#7911, <a href="mailto:cmlee.ethan@gmail.com">EFunLee#7777</a>, <a href="mailto:jackey991206@gmail.com">からくりピエロ#0831</a>
            <br />
            <b>版本：</b>
            test1.1
            <br />
            <b>更新日期：</b>
            2021年 10月28日
            <br />
            <b>使用語音：</b>
            HTML, CSS, Javascript
          </span>
        </div>
        <div id="card1">
          <h2>合作資料</h2>
          <span>
            <b>Discord 伺服器：</b>
            <a href="https://discord.gg/vtb" target="_blank" rel="noreferrer">VTB虛擬交流基地</a>
            <a href="https://discord.gg/fEzvERDqaW" target="_blank" rel="noreferrer">, Meowクラウド蛋糕店</a>
            <br />
            <b>使用程序：</b>
            Adobe Photoshop, Adobe After Effect, Adobe XD
            <br />
            <b>合作畫家：</b>
            Mainkakao 
            <a href="https://www.pixiv.net/users/31697899" target="_blank" rel="noreferrer">
              <img src="/images/support/pixiv_logo.png" alt="" style={{ height: '25px'}} />
            </a> 
            <a href="https://www.instagram.com/mainkakao.paint" target="_blank" rel="noreferrer">
              <img src="/images/support/instagram_logo@2x.png" alt="" style={{ height: '25px' }} />
            </a>
            <br />
          </span>
        </div>
        <div id="card1">
          <h2>版權</h2>
          <span style={{ fontSize: '18px' }} >
            本網頁的內容，包括但不限於所有文本、影片、圖片、照片以及數據或其他資料的匯編，均受版權保障，雀可美特討論區管理員以及畫作作者是本網頁內所有版權作品的擁有人，除非預先得到開發者的授權，否則嚴禁複製、改編、分發、發布或向公眾提供該等版權作品作商業用途
            <br /><br />
            This website and its content, including all texts, videos, pictures, photos and data or other infomation, is copyright of Checkmate Discord Forum's administrators and artists. All rights reserved. Unless authorised, it is forbitten to copy, spread, distribute or post all contents of this website.
          </span>
        </div>
        <div id="card1">
          <h2>版權</h2>
          <span style={{ fontSize: '18px' }} >
            使用本網頁的文本、平面圖像、圖畫、圖片、照片前， 請先請求擁有人的使用批准。
            <br /><br />
            The use of texts, graphic images, videos, pictures, and photos from this website requires author’s approval.
          </span>
        </div>
      </div>
      <br /><br />
      <div id="card2">
        <h3>雀可相關</h3>
        <div classNameName="img-box">
          <a href="https://discord.gg/checkmatekuhaku" target="_blank" rel="noreferrer">
            <img src="/images/support/Discord-Logo+Wordmark-Color.png" alt="" style={{ height: '40px'}} />
          </a>
          <a href="https://www.youtube.com/c/%E9%9B%80%E5%8F%AF%E7%BE%8E%E7%89%B9" target="_blank" rel="noreferrer">
            <img src="/images/support/youtube-logo-4-3.png" alt="" style={{ height: '40px'}} />
          </a>
          <a href="https://www.facebook.com/checkmatekuhaku" target="_blank" rel="noreferrer">
            <img src="/images/support/facebook-logo-4-3.png" alt="" style={{ height: '40px'}} />
          </a>
          <a href="https://www.instagram.com/checkmatekuhaku" target="_blank" rel="noreferrer">
            <img src="/images/support/instagram_logo_icon_170643.png" alt="" style={{ height: '40px'}} />
          </a>
        </div>
      </div>
      <br />
    </>
  );
}

export default Support;