import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { prefetch } from '@isogon/prefetch';
import { createStructuredSelector as select } from 'reselect';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardList,
  CardTitle,
  renderMarkdown,
} from 'styled';

import kitten from './kitten.jpg';
import * as aboutActions from './actions';
import { getAbout, getShowKitten } from './selectors';


const wrap = compose(
  prefetch(() =>
    aboutActions.loadAbout()
  ),

  connect(select({
    about: getAbout,
    showKitten: getShowKitten,
  }), aboutActions)
);

// eslint-disable-next-line react/prefer-stateless-function
export class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
    showKitten: PropTypes.bool.isRequired,
    toggleKitten: PropTypes.func.isRequired,
  };

  render() {
    const { showKitten, toggleKitten } = this.props;
    return (
      <CardList>
        <Card>
          <CardTitle>About this project:</CardTitle>
          <CardContent>
            {renderMarkdown(this.props.about)}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h4>Psst! Would you like to see a kittenss?</h4>
            {showKitten && <img src={kitten} alt="kitten" />}
          </CardContent>
          <CardActions>
            <Button onClick={toggleKitten}>
              {showKitten ? 'No! Take it away!' : 'Yes! Please!'}
            </Button>
          </CardActions>
        </Card>
      </CardList>
    );
  }
}

export default wrap(About);
