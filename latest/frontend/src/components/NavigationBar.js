import { useEffect } from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import genRandomToken from '../utils/genRandomToken';
import { Login, Logout } from '../ajax/user';

import '../static/styles/NavigationBar.css';

function NavigationBar(props) {
  const renderPlayerUtils = () => {
    if (props.userdata.user_id !== null) {
      return (
        <>
          <Nav.Item>
            <Nav.Link onFocus={e => e.target.blur()} href="" onClick={() => props.navigate("/draw")}>抽卡</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onFocus={e => e.target.blur()} href="" onClick={() => props.navigate("/inventory")}>卡牌庫</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onFocus={e => e.target.blur()} disabled href="" onClick={() => props.navigate("/#")}>戰鬥</Nav.Link>
          </Nav.Item>
        </>
      );
    }
  };

  const renderUserInfo = () => {
    if (props.userdata.user_id === null){
      const randomToken = genRandomToken(32);
      const login_url = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&scope=identify%20guilds&state=${randomToken}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&prompt=consent`;
      return <a href={login_url}><Button variant="outline-success" className="my-2 my-sm-0" onClick={() => localStorage.setItem('oauth2_state', randomToken)}>登入</Button></a>;
    } else {
      const avatar_url = `https://cdn.discordapp.com/avatars/${props.userdata.user_id}/${props.userdata.avatar_hash}.png`;
      return (
        <Nav navbar="true" className="ml-auto">
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img className="icon" src={avatar_url} alt="" /><span>{props.userdata.username}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right" aria-labelledby="navbarDropdownMenuLink">
              <Dropdown.Item className="text-center" href="" onClick={() => Logout(props)} style={{color: 'red'}} id="logout">登出</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      );
    }
  };

  const renderAdminUtils = () => {
    if (props.userdata.admin === true){
      return (
        <Nav.Item>
          <Nav.Link onFocus={e => e.target.blur()} href="" onClick={() => props.navigate("/admin")}>管理員專區</Nav.Link>
        </Nav.Item>
      );
    }
  };

  useEffect(() => {
    (async() => await Login(props))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar as="nav" expand="lg" bg="light" variant="light" style={{position: 'sticky', top: '0px'}}>
        <Navbar.Brand href="/" style={{fontSize: '25px'}}>卡牌之神</Navbar.Brand>
        <Navbar.Toggle as="button" className="ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <Navbar.Toggle as="span" aria-controls="basic-navbar-nav"></Navbar.Toggle>
        </Navbar.Toggle>
        <Navbar.Collapse className="collapse" id="navbarTogglerDemo01">
          <Navbar as={Nav} className="mr-auto mt-2 mt-lg-0">
            <Nav.Item>
              <Nav.Link onFocus={e => e.target.blur()} href="" onClick={() => props.navigate("/")}>主頁</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onFocus={e => e.target.blur()} href="" onClick={() => props.navigate("/news")}>新聞</Nav.Link>
            </Nav.Item>
            {renderPlayerUtils()}
            <Nav.Item>
              <Nav.Link onFocus={e => e.target.blur()} href="" onClick={() => props.navigate("/collection")}>圖鑒</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onFocus={e => e.target.blur()} href="" onClick={() => props.navigate("/community")}>社群</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onFocus={e => e.target.blur()} href="" onClick={() => props.navigate("/support")}>支援</Nav.Link>
            </Nav.Item>
            {renderAdminUtils()}
          </Navbar>
          {renderUserInfo()}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;