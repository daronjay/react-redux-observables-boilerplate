import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import history from 'modules/history';

import { showAlert } from 'actions';
import Home from 'routes/Home';
import SystemAlerts from 'components/SystemAlerts';

export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
  }

  render() {
    const { app, dispatch } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div>
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'en-us' }}
            encodeSpecialCharacters={true}
            defaultTitle="Ethfinex Demo"
            titleTemplate={`%s | 'foo'`}
            titleAttributes={{ itemprop: 'name', lang: 'en-us' }}
          />
          <main className="app__main">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </main>
          <SystemAlerts alerts={app.alerts} dispatch={dispatch} />
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(App);
