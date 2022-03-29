import { useEffect } from 'react';
import checkmateServerLogo from '../static/images/community/checkmateserverlogo-removebg-preview.png';
import '../static/styles/Community.css';

function Community() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="community-background-wrapper">
      <br />
      <div style={{ width: '100%', textAlign: 'center', color: 'white'}} >
        <h1>我們的社群</h1>
        <div style={{ width: '20%', border: 'white 1px solid', margin: 'auto'}} />
      </div>
      <br />
      <div className="main-invitebox">
        <div className="imgBx">
          <img src={checkmateServerLogo} alt="" width="200"/>
        </div>
        <div className="content">
          <div className="title">
            <h2>雀可美特討論區 ( Discord 伺服器 )</h2>
          </div>
          <div className="text">
            <p>testing</p>
          </div>
        </div>
        <a href="https://discord.gg/checkmatekuhaku"><input type="button" className="joinbutton" value="加入" /></a>
      </div>
      <br />
      <div className="partner-container">
        {/* patern server 1 */}
        <div className="sub-invitebox virtualtransmissionbase">
          <div className="content" style={{ fontWeight: 'bold' }}>
            <h3>虛擬交流基地 Virtual Transmission Base <br />( 早期支持者 )</h3>
            <p>為每個喜歡聊天的DD們，單推們，建立一個屹立不搖的避風港，首先讓群裡的所有人能夠開心快樂的聊天與交流，次要為VTuber社群逐漸壯大的同時，推廣一些具有特色的VTuber給所有人認識，最後讓更多的人認識VTuber，讓更多的人喜歡VTuber，且讓各位每天打開VTB虛擬交流基地時，迎接的都是滿滿的快樂！</p>
            <a href="https://discord.gg/vtb"><input type="button" className="joinbutton" value="加入" /></a>
          </div>
        </div>
        {/* patern server 2 */}
        <div className="sub-invitebox">
          <div className="content">
            <h3>Meowクラウド蛋糕店 <br />( 早期支持者 )</h3>
            <p>testing</p>
            <a href="https://discord.gg/zxdFpr3GGx"><input type="button" className="joinbutton" value="加入" /></a>
          </div>
        </div>
      </div>
      <br />
      <br/>
    </div>
  );
}

export default Community;