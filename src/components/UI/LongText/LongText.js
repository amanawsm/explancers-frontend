import React, { Component, Fragment } from 'react';
import classes from './LongText.module.css';
import { Button } from 'reactstrap';

class LongText extends Component {
    state = { showAll: false }
    showMore = () => this.setState({ showAll: true });
    showLess = () => this.setState({ showAll: false });
    render() {
        const { content, limit } = this.props;
        const { showAll } = this.state;
        
        if (content.length <= limit) {
            // there is nothing more to show
            return content;
        }
        if (showAll) {
            // We show the extended text and a link to reduce it
            return (
                <Fragment>
                    {content}
                    <Button color="info" size="sm" className={"btn-square btn-ghost-success " + classes.ReadLess}
                    onClick={(e) => { e.stopPropagation(); this.showLess(); }} > Read less</Button>
                </Fragment>
            )
        }
        // In the final case, we show a text with ellipsis and a `Read more` button
        const toShow = content.substring(0, limit) + "...";
        return <Fragment>
            {toShow}
            <Button color="info" size="sm" className={"btn-square btn-ghost-success " + classes.ReadMore} 
            onClick={ (e) => { e.stopPropagation(); this.showMore(); }}> Read more</Button>
        </Fragment>
    }
}

export default LongText;