import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Menu,
  Dropdown,
  Icon,
} from 'semantic-ui-react';
import '../styles/Navbar.modules.scss';

interface INavbarProps {
  logout(): void;
  name: string;
  toggleSidebar(): void;
}

class Navbar extends React.PureComponent<INavbarProps> {
  public logout = () => {
    this.props.logout();
  };

  public render() {
    return (
      <Menu className="navbar" inverted>
        <Container className="navbar-top">
          <Menu.Item onClick={this.props.toggleSidebar}>
            <Icon name="bars" />
          </Menu.Item>
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
              <Dropdown.Item
                icon="settings"
                text="settings"
                as={Link}
                to="/settings/profile"
              />
              <Dropdown.Item icon="sign out" text="Sign out" onClick={this.logout} />
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    );
  }
}

export default Navbar;
