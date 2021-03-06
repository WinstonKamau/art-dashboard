import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Table } from 'semantic-ui-react';

import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import PageHeader from '../common/PageHeader';
import Paginator from '../common/PaginationComponent';
import StatusMessageComponent from '../common/StatusComponent';
import TableHeader from '../common/Table/TableHeaderComponent';
import TableContent from '../common/Table/TableContent';

class AndelaCentresComponent extends React.Component {
  state = {
    limit: 10,
    activePage: 1
  };

  componentDidMount() {
    this.props.loadOfficeLocations(this.state.activePage);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadOfficeLocations(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadOfficeLocations(activePage);
  };

  getTotalPages = () => Math.ceil(this.props.locationCount / this.state.limit);

  render() {
    const { isLoading, locationList, error, resetMessage } = this.props;
    const hasLocations = !isEmpty(locationList);
    const showStatus = error;

    return (
      <NavBarComponent>
        <PageHeader header="Andela Centres" />

        <div className="assets-list">
          {showStatus && (
            <StatusMessageComponent
              message={error}
              className="error-status"
              reset={resetMessage}
            />
          )}
        </div>

        {isLoading && <LoaderComponent />}

        {(!isLoading && !hasLocations) && (
          <ItemsNotFoundComponent
            header="No Andela Centres found!"
            message="Please try again later to see if there will be centres to show you"
          />
        )}

        {(!isLoading && hasLocations) && (
          <Table basic className="assets-list">
            <TableHeader titles={['Name', 'Country']} />
            <TableContent
              data={locationList}
              headings={['centre_name', 'country']}
            />
          </Table>
        )}

        <Paginator
          activePage={this.state.activePage}
          handleRowChange={this.handleRowChange}
          handlePaginationChange={this.handlePaginationChange}
          limit={this.state.limit}
          totalPages={this.getTotalPages()}
          isLoading={this.props.isLoading}
        />
      </NavBarComponent>
    );
  }
}

AndelaCentresComponent.propTypes = {
  isLoading: PropTypes.bool,
  loadOfficeLocations: PropTypes.func,
  resetMessage: PropTypes.func,
  locationCount: PropTypes.number,
  locationList: PropTypes.array,
  error: PropTypes.string
};

AndelaCentresComponent.defaultProps = {
  loadOfficeLocations: () => {}
};

export default AndelaCentresComponent;
