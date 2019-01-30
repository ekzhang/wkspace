import React, { Component } from 'react';

class FileUpload extends Component {
  input = React.createRef();
  upload = this.upload.bind(this);
  handleChange = this.handleChange.bind(this);

  upload() {
    const promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    this.input.current.click();
    return promise;
  }

  handleChange() {
    const { files } = this.input.current;
    if (!files.length)
      return null;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = event =>
      this.resolve(event.target.result);
    try {
      reader.readAsText(file);
    }
    catch (e) {
      this.reject(e);
    }
  }

  render() {
    return (
      <>
        <input type="file" style={{display: 'none'}} ref={this.input} onChange={this.handleChange} />
        {this.props.children(this.upload)}
      </>
    )
  }
}

export default FileUpload;
