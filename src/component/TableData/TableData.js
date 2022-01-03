import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
export default class TableData extends React.Component {
  render() {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: 40 }}>Index</th>
              <th>File Name</th>
              <th style={{ width: 40 }}>Version</th>
              <th style={{ width: 80 }}>File size</th>
              <th>Create time</th>
              <th style={{ width: 40 }}>Download</th>
              <th style={{ width: 280 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.file_paging
              ? this.props.file_paging.map((file, index) => (
                  <tr key={index}>
                    <td>{file.name ? index : null}</td>
                    <td>{file.name}</td>
                    <td>{file.version}</td>
                    <td>{file.fileSize} (MB)</td>
                    <td>{file.createDateTime}</td>
                    <td>{file.numberOfDownload}</td>
                    <td>
                      <Button  onClick={() => this.props.download(file.id, this.props.pageNumber)} variant="warning">Download</Button>
                      <Button
                        onClick={() => this.props.deleteFile(file.id)}
                        style={{ marginLeft: 10 }}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </Table>
      </>
    );
  }
}
