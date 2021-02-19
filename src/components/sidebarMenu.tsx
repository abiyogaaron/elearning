import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Sidebar,
  Icon,
  Image,
} from 'semantic-ui-react';
import { MENU_LIST_ADMIN } from '../constants';
import logo from '../images/elearning-logo.png';
import '../styles/SidebarMenu.modules.scss';

interface ISideBarProps {
  isAdmin: boolean;
  visible: boolean;
}

class SidebarMenu extends React.PureComponent<ISideBarProps> {
  public renderMenus() {
    if (this.props.isAdmin) {
      return MENU_LIST_ADMIN.map((item, index) => (
        <Menu.Item as={Link} to={item.to} key={index}>
          <Icon name={item.icon} />
          {item.title}
        </Menu.Item>
      ));
    }
    return null;
  }

  public render() {
    return (
      <Sidebar
        className="sidebar-menu"
        as={Menu}
        animation="overlay"
        icon="labeled"
        vertical
        visible={this.props.visible}
        inverted
        width="thin"
      >
        <Menu.Item>
          <Image src={logo} centered size="mini" />
        </Menu.Item>
        {this.renderMenus()}
      </Sidebar>
    );
  }
}

export default SidebarMenu;
