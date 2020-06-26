import React from 'react';
import { Row, Col } from 'reactstrap';
import classes from './SearchBar.module.css';

const searchBar = (props) => {
    return (
        <Row className={classes.SearchBox}>
        <Col sm="12" md="12" xs="12" className={classes.SearchBoxInner}>
          <div className="form-group">
            <input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search" />
            <span className="form-control-feedback"></span>
          </div>
        </Col>
      </Row>
    )    
}

export default searchBar;