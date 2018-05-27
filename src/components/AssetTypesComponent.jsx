import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Table, Pagination } from 'semantic-ui-react';

import TableRowComponent from './TableRowComponent';

import { loadAssetTypeAction } from '../_actions/assetType.action';

export class AssetTypesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10,
  }
  componentDidMount() {
    this.props.loadAssetTypeAction(this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetTypeAction(activePage);
  }

  handlePageTotal = () => {
    return Math.ceil(this.props.assetTypesCount / this.state.limit);
  }

  emptyAssetTypeCheck = () => {
    return (this.props.assetTypes.length === 0);
  }

  loadRoles = () => {
    if (this.emptyAssetTypeCheck()) {
      return <Table.Row><Table.Cell colSpan="3">No Data found</Table.Cell></Table.Row>
    } else {
      const assetTypes = this.props.assetTypes.map((assetType, index) => {
        return <TableRowComponent key={index} data={assetType} />
      });
      return assetTypes;
    }
  }

  render() {
    return (
      <div className=''>
      <Container>
        <Header className='landing-heading' content='Asset Types' />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Sub-category</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.loadRoles()
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                {
                  (this.emptyAssetTypeCheck()) ? '' :
                    <Pagination
                      totalPages={this.handlePageTotal()}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.state.activePage}
                    />
                }
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </div>
    )
  }
};

const mapStateToProps = ({ assetTypeReducer }) => {
  const { assetTypes, assetTypesCount } = assetTypeReducer;
  return {
    assetTypes,
    assetTypesCount,
  }
}

export default withRouter(connect(mapStateToProps, {
  loadAssetTypeAction,
})(AssetTypesComponent));
