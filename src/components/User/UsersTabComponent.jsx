import React from 'react';

import PageHeader from '../common/PageHeader';
import NavBarComponent from '../../_components/NavBarContainer';
import TabsComponent from '../../components/common/TabsComponent';
import UserComponent from '../../_components/User/UserContainer';
import SecurityUser from '../../_components/SecurityUser/SecurityUserContainer';

const UsersTabComponent = () => (
  <NavBarComponent>
    <PageHeader header="Users" />
    <div className="users-list">
      <TabsComponent panes={[
        {
          header: 'Andelans',
          component: <UserComponent />
        },
        {
          header: 'Security Users',
          component: <SecurityUser />
        }
      ]}
      />
    </div>
  </NavBarComponent>
);

export default UsersTabComponent;
