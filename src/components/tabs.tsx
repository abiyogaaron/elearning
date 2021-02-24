import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { ITab, ITabType } from '../interface';

interface ITabs {
  tabs: ITab[];
  activeTab: ITabType;
}

const renderMenuItem = (tabs: ITab[], activeTab: string) => {
  const content = tabs.map((item, idx) => (
    <Menu.Item
      name={item.name}
      as={Link}
      to={item.to}
      active={activeTab === item.name}
      color="teal"
      key={idx}
    />
  ));
  return content;
};

const Tabs = ({ tabs, activeTab }: ITabs) => (
  <Menu pointing secondary>
    { renderMenuItem(tabs, activeTab) }
  </Menu>
);

export default React.memo(Tabs);
