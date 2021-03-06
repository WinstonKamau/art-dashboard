import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { uploadStatus, StatusMessage } from './UploadStatus';
import errorMessage from './UploadErrorMessages';
import '../../_css/UploadAssets.css';

class UploadAssets extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.downloadedFile !== prevProps.downloadedFile) {
      const link = document.createElement('a');
      link.href = this.props.downloadedFile;
      link.setAttribute('download', 'file.csv');
      document.body.appendChild(link);
      link.click();
    }
  }

  handleDrop = (files) => {
    this.resetUpload();
    this.props.uploadAssets(files);
  };

  resetUpload = () => {
    this.props.resetUploadAssets();
  };

  handleFileDownload = (url) => {
    this.props.downloadFile(url);
    this.resetUpload();
  };

  render() {
    const { loading, success, error } = this.props;
    const showStatus = success || error;

    return (
      <div className="center-upload">
        <span className="failed-file">
          <a href="# " onClick={() => this.handleFileDownload('files/sample_import_file/')}>
            Download the sample file
          </a>{' '}
          , fill the columns and upload it.
        </span>

        <Dropzone
          onDrop={this.handleDrop}
          accept="text/csv"
          className="dropzone"
        >

          <div
            className="progress-handler"
            onClick={this.resetUpload}
            onKeyDown={this.resetUpload}
            role="button"
            tabIndex={0}
          >
            {loading && !showStatus && (
              <Progress style={{ width: '90%' }} percent={100} active>
                Upload in progress...
              </Progress>
            )}

            {showStatus && (
              <StatusMessage
                message={uploadStatus(success, error)}
                className={success.fail || error ? 'error-status' : 'success-status'}
                reset={this.resetUpload}
              />
            )}

            {!showStatus && !loading && (
              <p>Drag and drop the file here, or click to select the file to upload.</p>
            )}
          </div>

        </Dropzone>

        {errorMessage(error, success, this.handleFileDownload)}
      </div>
    );
  }
}

UploadAssets.propTypes = {
  success: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool,
  downloadedFile: PropTypes.string,
  downloadFile: PropTypes.func,
  resetUploadAssets: PropTypes.func,
  uploadAssets: PropTypes.func
};

export default UploadAssets;
