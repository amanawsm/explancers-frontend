import React from 'react';
import { Row, Col } from 'reactstrap';
import classes from './Header.module.css';

const header = (props) => {
    return (
        <Row className={classes.Heading}>
          <Col sm="3" xs="3" className={classes.HeadingAvatar}>
            <div className={classes.HeadingAvatarIcon}>
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Avatar" />
            </div>
          </Col>
          <Col sm="1" xs="1" className={classes.HeadingDot + ' pull-right'}>
            <i className="fa fa-ellipsis-v fa-2x pull-right"></i>
          </Col>
          <Col sm="2" xs="2" className={classes.HeadingCompose + ' pull-right'}>
            <i className="fa fa-comments fa-2x  pull-right"></i>
          </Col>
        </Row>
    )    
}

export default header;