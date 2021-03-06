import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const TextInputComponent = props => (
  <Input
    fluid
    size="large"
    icon="pencil"
    placeholder={props.placeholder}
    value={props.value}
    name={props.name}
    onChange={props.onChange}
    className={props.customCss}
  />
);

TextInputComponent.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  customCss: PropTypes.string,
  value: PropTypes.string
};

TextInputComponent.defaultProps = {
  placeholder: '',
  onChange: () => {},
  customCss: ''
};

export default TextInputComponent;
