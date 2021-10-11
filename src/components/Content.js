import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";

class Content extends Component {
  render() {
    return (
      <div className="next-steps my-5">
        <h2 className="my-5 text-center">Descripcion de la app</h2>
        <Row className="d-flex justify-content-between">
          
            <Col className="mb-4">
              <h6 className="mb-3">
                <a>
                  1
                </a>
              </h6>
              <p>2</p>
            </Col>
          
        </Row>
      </div>
    );
  }
}

export default Content;
