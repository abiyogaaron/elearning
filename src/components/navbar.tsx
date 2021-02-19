import React from 'react';
import {
  Container,
  Menu,
  Dropdown,
} from 'semantic-ui-react';
import '../styles/Navbar.modules.scss';

interface INavbarProps {
  logout(): void;
  name: string;
}

class Navbar extends React.PureComponent<INavbarProps> {
  public logout = () => {
    this.props.logout();
  };

  public render() {
    return (
      <Menu fixed="top" inverted>
        <Container className="navbar-top">
          <Dropdown
            item
            simple
            icon={{
              size: 'big',
              name: 'user circle',
            }}
            text={this.props.name}
          >
            <Dropdown.Menu>
              <Dropdown.Item icon="settings" text="settings" />
              <Dropdown.Divider />
              <Dropdown.Item icon="sign out" text="Sign out" onClick={this.logout} />
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    );
  }
}

export default Navbar;
