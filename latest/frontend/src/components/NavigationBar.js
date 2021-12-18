import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import genRandomToken from '../utils/genRandomToken';
import '../static/styles/Navbar.css';

function NavigationBar(props) {
  const navigateWrapper = (dest) => (e) => {
    props.navigate(dest);
    e.target.blur();
  };

  const renderPlayerUtils = () => {
    if (props.userdata.user_id !== null) {
      return (
        <>
          <Nav.Item>
            <Nav.Link href="" onClick={navigateWrapper("/card")}>抽卡</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="" onClick={navigateWrapper("/inventory")}>卡牌庫</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="" onClick={navigateWrapper("#")}>戰鬥</Nav.Link>
          </Nav.Item>
        </>
      );
    }
  };

  const renderUserInfo = () => {
    if (props.userdata.user_id === null){
      const randomToken = genRandomToken(32);
      const login_url = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&scope=identify%20guilds&state=${randomToken}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&prompt=none`;
      console.log(login_url);
      return <a href={login_url}><Button variant="outline-success" className="my-2 my-sm-0" onClick={() => localStorage.setItem('oauth2_state', randomToken)}>登入</Button></a>;
    } else {
      const avatar_url = `https://cdn.discordapp.com/avatars/${props.userdata.user_id}/${props.userdata.avatar_hash}.png`;
      return (
        <Nav navbar="true" className="ml-auto">
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} href="" onClick={navigateWrapper("#")} id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img className="icon" src={avatar_url} alt="" /><span>{props.userdata.username}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right" aria-labelledby="navbarDropdownMenuLink">
              <Dropdown.Item className="text-center" href="" onClick={navigateWrapper("#")} style={{color: 'red'}} id="logout">登出</Dropdown.Item>
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
          <Nav.Link href="" onClick={navigateWrapper("/admin")}>管理員專區</Nav.Link>
        </Nav.Item>
      );
    }
  };

  return (
    <Navbar as="nav" expand="lg" bg="light" variant="light" style={{position: 'sticky', top: '0px'}}>
      <Navbar.Brand href="/" style={{fontSize: '25px'}}>卡牌之神</Navbar.Brand>
      <Navbar.Toggle as="button" className="ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
      </Navbar.Toggle>
      <Navbar.Collapse className="collapse" id="navbarTogglerDemo01">
        <Navbar as={Nav} className="mr-auto mt-2 mt-lg-0">
          <Nav.Item>
            <Nav.Link href="" onClick={navigateWrapper("/")}>主頁</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="" onClick={navigateWrapper("/news")}>新聞</Nav.Link>
          </Nav.Item>
          {renderPlayerUtils()}
          <Nav.Item>
            <Nav.Link href="" onClick={navigateWrapper("/collection")}>圖鑒</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="" onClick={navigateWrapper("/community")}>社群</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="" onClick={navigateWrapper("/support")}>支援</Nav.Link>
          </Nav.Item>
          {renderAdminUtils()}
        </Navbar>
        {renderUserInfo()}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;