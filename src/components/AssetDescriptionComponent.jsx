import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty, values } from 'lodash';
import { Container, Header, Grid } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';
import { loadAssetAssigneeUsers } from '../_actions/users.actions';
import { allocateAsset, unassignAsset } from '../_actions/asset.actions';

import ModalComponent from './common/ModalComponent';
import ButtonComponent from '../components/common/ButtonComponent';
import ConfirmAction from './common/ConfirmAction';
import AssignedTo from './AssignAssetComponent';
import { ASSET_AVAILABLE, ASSET_ALLOCATED } from '../_constants';

import '../_css/AssetDescriptionComponent.css';

class AssetDescriptionComponent extends React.Component {
  state = {
    assignAssetButtonState: true,
    selectedUser: 0,
    UNITS: {
      processor_speed: 'GHz',
      screen_size: 'inch',
      storage: 'GB',
      memory: 'GB'
    }
  };

  onSelectUserEmail = (event, data) => {
    this.setState({ selectedUser: data.value, assignAssetButtonState: false });
  };

  getSpecs = (specs) => {
    const { UNITS } = this.state;
    if (!specs) {
      return 'This asset has no specifications';
    }

    delete specs.id;
    return Object.entries(specs).map(([label, value]) => {
      if (!value) {
        return null;
      }
      const specUnit = UNITS[label] || ' ';
      return (
        <p key={uuidv4()}>
          <span className="asset-specs__label">{`${label.replace(/_/g, ' ')}: `}</span>
          {`${value} ${specUnit}`}
        </p>
      );
    });
  };

  handleAssign = () => {
    const { selectedUser } = this.state;
    const { id, uuid } = this.props.assetDetail;
    const assetAllocated = {
      asset: id,
      current_owner: selectedUser
    };
    this.props.allocateAsset(assetAllocated, uuid);
  };

  handleUnassign = () => {
    const { id, uuid } = this.props.assetDetail;
    const assetAssigned = {
      asset: id,
      current_status: 'Available'
    };
    this.props.unassignAsset(assetAssigned, uuid);
  };

  handleConfirm = () => {
    const { assignedUser } = this.props;

    if (isEmpty(values(assignedUser))) {
      return this.handleAssign();
    }

    return this.handleUnassign();
  };

  triggerProps = () => {
    if (isEmpty(values(this.props.assignedUser))) {
      return {
        buttonName: 'Assign Asset',
        customCss: 'assign-asset',
        disabledState: this.state.assignAssetButtonState,
        color: 'primary'
      };
    }

    return {
      buttonName: 'Unassign Asset',
      customCss: 'unassign-asset',
      disabledState: false,
      color: 'primary'
    };
  };

  render() {
    const {
      assetAsigneeUsers,
      assignedUser,
      assetDetail,
      errorMessage,
      toggleModal,
      buttonLoading
    } = this.props;

    const triggerProps = this.triggerProps();

    const showAssignDropdown =
      assetDetail.current_status === ASSET_AVAILABLE ||
      assetDetail.current_status === ASSET_ALLOCATED;

    return (
      <Container>
        <Grid columns={2} stackable className="asset-description">
          <Grid.Column>
            <Header as="h3" content="Asset Specs" />
            <div className="asset-specs">
              {this.getSpecs(assetDetail.specs)}
            </div>
          </Grid.Column>
          <Grid.Column>
            <AssignedTo
              onSelectUserEmail={this.onSelectUserEmail}
              assignedUser={assignedUser}
              users={assetAsigneeUsers}
              selectedUserId={this.state.selectedUser}
              errorMessage={errorMessage}
              assetStatus={assetDetail.current_status}
            />

            {showAssignDropdown && (
              <ModalComponent
                trigger={<ButtonComponent {...triggerProps} />}
                modalTitle="Confirm Action"
              >
                <ConfirmAction
                  toggleModal={toggleModal}
                  handleConfirm={this.handleConfirm}
                  buttonState={buttonLoading}
                  buttonLoading={buttonLoading}
                />
              </ModalComponent>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

AssetDescriptionComponent.propTypes = {
  onSelectUserEmail: PropTypes.func,
  assignedUser: PropTypes.object,
  users: PropTypes.array,
  assetAsigneeUsers: PropTypes.array,
  selectedUserId: PropTypes.number,
  assignAssetButtonState: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleConfirm: PropTypes.func,
  buttonState: PropTypes.bool,
  buttonLoading: PropTypes.bool,
  unAssignedAsset: PropTypes.object,
  assetDetail: PropTypes.object,
  allocateAsset: PropTypes.func,
  unassignAsset: PropTypes.func,
  specs: PropTypes.object,
  errorMessage: PropTypes.string
};

AssetDescriptionComponent.defaultProps = {
  users: [],
  assetAsigneeUsers: [],
  selectedUserId: 0,
  assignAssetButtonState: false,
  handleConfirm: () => {},
  buttonState: false,
  buttonLoading: false,
  specs: {},
  errorMessage: ''
};

export default connect(null, {
  loadAssetAssigneeUsers,
  allocateAsset,
  unassignAsset
})(AssetDescriptionComponent);
