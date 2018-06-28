import React from 'react';
import { Button, Header, Table, Pagination } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import PropTypes from 'prop-types';
import TableRowComponent from './TableRowComponent';
import ModalComponent from './common/ModalComponent';
import ActionComponent from './ActionComponent';
import LoaderComponent from './LoaderComponent';
import ModelNumberContainer from '../_components/ModelNumber/ModelNumberContainer';
import CategoryContainer from '../_components/Category/CategoryContainer';
import { ToastMessage } from '../_utils/ToastMessage';

const AssetsTableContent = (props) => {
  if (props.isLoading) {
    return <LoaderComponent size="large" dimmerStyle={{ height: '100vh' }} />;
  }

  if (props.hasError) {
    setTimeout(() => {
      ToastMessage.error({ message: props.errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }

  if (props.emptyAssetsCheck()) {
    return (
      <Header as="h3" id="empty-assets" content="There are no assets assigned to you" />
    );
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <div className="assets-header">
                Category
                <ModalComponent modalTitle="Add Asset Category">
                  <CategoryContainer />
                </ModalComponent>
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Sub-category
                <ModalComponent />
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Asset Code
                <ModalComponent />
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Serial Number
                <ModalComponent />
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Model Number
                <ModalComponent modalTitle="Add Asset Model Number">
                  <ModelNumberContainer />
                </ModalComponent>
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <div className="assets-header">
                Asset Type
                <ModalComponent />
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            props.activePageAssets.map((asset) => {
              asset.category = 'Electronics';
              asset.sub_category = 'Computers';
              return (
                <TableRowComponent
                  key={asset.id}
                  data={asset}
                  headings={[
                    'category',
                    'sub_category',
                    'asset_code',
                    'serial_number',
                    'model_number',
                    'asset_type'
                  ]}
                >
                  <Table.Cell>
                    <ActionComponent />
                  </Table.Cell>
                </TableRowComponent>
              );
            })
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              {!props.emptyAssetsCheck() && (
                <Pagination
                  totalPages={props.handlePageTotal()}
                  onPageChange={props.handlePaginationChange}
                  activePage={props.activePage}
                />
              )}
              <Button circular icon="add" floated="right" size="big" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>);
};

AssetsTableContent.propTypes = {
  activePage: PropTypes.number,
  activePageAssets: PropTypes.arrayOf(PropTypes.object),
  emptyAssetsCheck: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handlePageTotal: PropTypes.func,
  handlePaginationChange: PropTypes.func,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired
};

AssetsTableContent.defaultProps = {
  activePage: 1,
  errorMessage: ''
};
export default AssetsTableContent;