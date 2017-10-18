import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const PageShell = Page => {
  return props =>
    <ReactCSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={400}
      transitionEnterTimeout={400}
      transitionLeaveTimeout={150}
      transitionName={props.match.path === '/' ? 'SlideOut' : 'SlideIn'} >
      <Page { ...props } />
    </ReactCSSTransitionGroup>
}

export default PageShell;