import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxFileSize: 0,
      itemPerPage: 0,
      mimeTypeAllowed: "png,jpeg",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  submit(e) {
    e.preventDefault();
    const setting = {
      maxFileSize: this.state.maxFileSize,
      itemPerPage: this.state.itemPerPage,
      mimeTypeAllowed: this.state.mimeTypeAllowed,
    };
    this.props.updateSetting(setting);
  }
  render() {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            Setting
          </Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            <Form onSubmit={this.submit}>
              <Form.Group className="mb-3">
                <Form.Label>Max file size (MB)</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="maxFileSize"
                  type="number"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Item per page</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="itemPerPage"
                  type="number"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Allowed upload type</Form.Label>
                <Form.Select
                  onChange={this.handleChange}
                  name="mimeTypeAllowed"
                  defaultValue={'png,jpeg'}
                  required
                >
                  <option value="png,jpeg">Image</option>
                  <option value="xlsx,xls">Excel</option>

                </Form.Select>
              </Form.Group>
              <Button type="submit" variant="success">
                Success
              </Button>
            </Form>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
}
