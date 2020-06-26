import React, { Fragment } from 'react';
import ViewPortfolioListItem from './ViewPortfolioListItem/ViewPortfolioListItem';

const viewPortfolioList = (props) => {

    let portfolioListComponents = [];

    portfolioListComponents = props.portfolioList.map(((portfolio, index) => {
        return (
            <Fragment key={index + portfolio.id}>
                <ViewPortfolioListItem key={index} {...portfolio}
                    edit={props.editPortfolio}
                    delete={props.deletePortfolio}
                    actionMode={props.actionMode}
                > </ViewPortfolioListItem>
                <hr />
            </Fragment>
        )
    }));

    return portfolioListComponents;
}

export default viewPortfolioList;