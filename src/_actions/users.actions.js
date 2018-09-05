import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_ASSET_ASSIGNEE_USERS_SUCCESS,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE
} = constants;

export const loadUsers = (pageNumber, limit) => (dispatch) => {
  dispatch(loading(true));
  return axios.get(`users?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading(false));
      dispatch(loadUsersFailure(error.message));
    });
};

export const loadAssetAssigneeUsers = () => (dispatch) => {
  dispatch(loading(true));
  return axios.get('asset-assignee/?paginate=false')
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadAssetAssigneeSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading(false));
      dispatch(loadUsersFailure(error.message));
    });
};

const loading = isLoading => ({
  type: LOADING_USERS,
  isLoading
});

const loadUsersSuccess = users => ({
  type: LOAD_USERS_SUCCESS,
  payload: users
});
const loadUsersFailure = error => ({
  type: LOAD_USERS_FAILURE,
  payload: error
});
const loadAssetAssigneeSuccess = users => ({
  type: LOAD_ASSET_ASSIGNEE_USERS_SUCCESS,
  payload: users
});

export const addSecurityUser = securityUser => dispatch => axios.post('/security-users/', securityUser)
  .then((response) => {
    dispatch({
      type: CREATE_SECURITY_USER_SUCCESS,
      payload: response.data
    });
    dispatch(updateToastMessageContent('New Security User Added Successfully', 'success'));
  }).catch((error) => {
    dispatch({
      type: CREATE_SECURITY_USER_FAILURE,
      payload: error.message
    });
    dispatch(updateToastMessageContent('Could not save Security User', 'error'));
  });
