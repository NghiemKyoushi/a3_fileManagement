import React from "react";
import Pagination from "react-bootstrap/Pagination";
export default class Paging extends React.Component {
  render() {
    return (
      <Pagination>
        <Pagination.Prev />
        {
            (this.props.page.length > 0)?
             this.props.page.map((pageNumber, index)=>(
                <Pagination.Item onClick={() => this.props.paging(index)} key ={index}>{index}</Pagination.Item>
             ))
             :
             ""
        }
        <Pagination.Next />
      </Pagination>
    );
  }
}
