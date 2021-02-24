import React from 'react';
import {
  SemanticICONS, Breadcrumb, Header, Icon,
} from 'semantic-ui-react';

interface IBreadcrumbsProp {
  showNextMenu: boolean;
  title: string;
  menuText?: string;
  iconName: SemanticICONS;
}

const BreadcrumbsMenu = ({
  showNextMenu,
  title,
  menuText,
  iconName,
}: IBreadcrumbsProp) => {
  if (showNextMenu) {
    return (
      <Breadcrumb>
        <Breadcrumb.Section>
          <Header color="teal" as="h3">
            <Header.Content>{title}</Header.Content>
          </Header>
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section>
          <Header as="h3">{menuText}</Header>
        </Breadcrumb.Section>
      </Breadcrumb>
    );
  }
  return (
    <Breadcrumb>
      <Breadcrumb.Section>
        <Header color="teal" as="h3">
          <Icon name={iconName} />
          <Header.Content>{title}</Header.Content>
        </Header>
      </Breadcrumb.Section>
    </Breadcrumb>
  );
};

BreadcrumbsMenu.defaultProps = {
  menuText: '',
};

export default React.memo(BreadcrumbsMenu);
