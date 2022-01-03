import React from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Paging from "./component/Page/Paging";
import Setting from "./component/Setting/Setting";
import TableData from "./component/TableData/TableData";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_paging: [],
      page: [],
      fileUpload: null,
      setting: null,
      pageNumber: 0,
    };
    this.paging = this.paging.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.download = this.download.bind(this);
  }
  async updateSetting(setting) {
    await axios.put("http://localhost:8080/setting", setting);
    window.location.reload();
    console.log("setting", setting);
  }
  onChangeFileUpload(e) {
    this.setState({
      fileUpload: e.target.files[0],
    });
  }

 async download(id, pageNumber) {
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = "blob";
    // xhr.open("GET", `http://localhost:8080/deleteById/?id=${id}`);
    // xhr.send();
    // xhr.onload = (event) =>{
    //   const blob = xhr.response;
      var link = window.document.createElement("a");
      link.href = await `http://localhost:8080/download/?id=${id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      const dataDownloadCount = await axios.get(`http://localhost:8080/downloadCount/?id=${id}`);

      if(dataDownloadCount.data === "Success"){
        this.paging(pageNumber);

      }
      console.log(dataDownloadCount.data);
    
   
  }
  async deleteFile(id) {
    const confirmBox = window.confirm("Do you want to remove this file ?");
    if (confirmBox === true){
      try {
        await axios.post(`http://localhost:8080/deleteById/?id=${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }
  async uploadFile(e) {
    e.preventDefault();
    const file = this.state.fileUpload;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData
      );
      if (response.data.message === "Invalid type of file") {
        alert(response.data.message);
      } else if (
        response.data.message === "The size of file bigger than requirement"
      ) {
        alert(response.data.message);
      } else if (response.data.message === "save successfully!") {
        window.location.reload();
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async paging(pageNumber) {
    // console.log("page", pageNumber);
    let list = [];
    const listFromDbPage = await axios.get(
      `http://localhost:8080/pagination/?pageNumber=${pageNumber}`
    );
    list = listFromDbPage.data.content;
    let page1 = [];
    for (let i = 0; i < listFromDbPage.data.totalPages; i++) {
      page1.push(i);
    }
    let count = 0;
    for (let i = list.length - 1; 0 < i; i--) {
      count = i - 1;
      if (list[count].name === list[i].name) {
        list[i].name = null;
      }
    }
    list.map((file) => {
      let date = new Date(file.createDateTime.toString());
      file.createDateTime = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
    });
    this.setState({
      page: page1,
      file_paging: list,
      pageNumber: pageNumber,
    });
  }
  componentDidMount() {
    this.paging(this.state.pageNumber);
  }
  render() {
    const { file_paging, page } = this.state;
    return (
      <div className="sum">
        <div className="header">
          <h1>File Management</h1>
        </div>
        <div className="container">
          <div className="header_table">
            <Setting updateSetting={this.updateSetting} />
            <div className="form_upload">
              <Form.Group controlId="formFile">
                <Form.Control
                  name="fileUpload"
                  onChange={this.onChangeFileUpload}
                  type="file"
                />
              </Form.Group>
              <Button variant="primary" onClick={this.uploadFile}>
                Upload
              </Button>
            </div>
          </div>
          <TableData
            pageNumber={this.state.pageNumber}
            deleteFile={this.deleteFile}
            file_paging={file_paging}
            download={this.download}
          />
        </div>
        <div className="page">
          <Paging page={page} paging={this.paging} />
        </div>
      </div>
    );
  }
}
