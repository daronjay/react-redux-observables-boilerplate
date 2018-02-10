import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import  isEmpty  from 'lodash/isEmpty';

import { fetchTicker, fetchBook, cancelBook } from 'actions/index';


export class Home extends React.PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    ticker: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTicker());//this is single REST call at the moment, and ought to refresh, can't find a collective websocket version
    dispatch(fetchBook('tBTCUSD'));//I have yet to figure out how to switch symbol without crashing, or how to restart
  };
  stopBook =() => {
    this.props.dispatch(cancelBook());//I have yet to figure out how to switch symbol without crashing, or how to restart after cancel
  };
  getAsks() {
    const { book } = this.props;
    if (!isEmpty(book.orders.data.asks)) {
      let total = 0;

      return Object.keys(book.orders.data.asks).sort().map(key => {
        const ask = book.orders.data.asks[key];
        total += ask.amount;
        const width = total / 2;
        const barStyle = {
          width: width.toString()+'%',
        };
        return (
          <div key={key} className="order-row">
            <div className="ask-total-bar"><div className="bar" style={barStyle}></div></div>
            <div className="row-set">
              <div className="left10">{ask.price}</div>
              <div className="right40">{parseFloat(total).toFixed(1)}</div>
              <div className="right40">{parseFloat(ask.amount).toFixed(1)}</div>
              <div className="ask-spacer">&nbsp;</div>
              <div className="center10">{ask.count}</div>
            </div>
          </div>);
      });
    }
    return <div className="order-row">Loading</div>;
  };

  getBids() {
    const { book } = this.props;
    if (!isEmpty(book.orders.data.bids)) {
      let total = 0;

      return Object.keys(book.orders.data.bids).sort().map(key => {
        const bid = book.orders.data.bids[key];
        total += bid.amount;
        const width = total / 2;
        const barStyle = {
          width: width.toString()+'%'
        };
        return (
          <div key={key} className="order-row">
            <div className="bid-total-bar"><div className="bar" style={barStyle}></div></div>
            <div className="row-set">
              <div className="center10">{bid.count}</div>
              <div className="right40">{parseFloat(bid.amount).toFixed(1)}</div>
              <div className="right40">{parseFloat(total).toFixed(1)}</div>
              <div className="bid-spacer">&nbsp;</div>
              <div className="right10">{bid.price}</div>
            </div>
          </div>);
      });
    }
    return <div className="order-row">Loading</div>;

  }

  render() {
    const { ticker: { pairs } } = this.props;
    if (pairs.status !== 'loaded') {
      return (
        <div key="Home" className="wrapper">
          <div className="widgets container-fluid">
            <div className="col-md-12">
              <div className="loader">Loading...</div>
            </div>
          </div>
        </div>
      );
    }
    let ticker = [];
    ticker.push({ name: 'BTC',  data: pairs.data.filter(p => p[0].substring(0, 4) === 'tBTC') });
    ticker.push({ name: 'ETH',  data: pairs.data.filter(p => p[0].substring(0, 4) === 'tETH') });
    ticker.push({ name: 'XRP',  data: pairs.data.filter(p => p[0].substring(0, 4) === 'tXRP') });
    ticker.push({ name: 'LTC',  data: pairs.data.filter(p => p[0].substring(0, 4) === 'tLTC') });
    ticker.push({ name: 'BCH',  data: pairs.data.filter(p => p[0].substring(0, 4) === 'tBCH') });

    //last price 7, daily change 6, volume 8
    return (
      <div key="Home" className="wrapper">
        <div className="widgets container-fluid">
          <div className="col-md-12">
            <button className="btn btn-primary" onClick={this.stopBook} >Stop Book</button>
            <div className="ticker">
              <div className="tickerControls">
                <h5>Tickers</h5>
              </div>
              <table className="ticker-list">
                <tbody className="pair-table-header">
                  <tr>
                    <th className="symbol">Symbol</th>
                    <th className="last">Last</th>
                    <th className="percent">24H</th>
                    <th className="volume">Vol</th>
                  </tr>
                </tbody>
                { ticker.map((coin,i) =>
                  (<tbody className="pair-table-body" key={i}>
                    { coin.data.map((d,j) => {
                      const base = d[0].substring(4);
                      let percentClass = "percent positive";
                      if(parseFloat(d[6]) < 0){
                        percentClass = "percent negative";
                      }
                      return (
                        <tr key={j}>
                          {j === 0 && <td className="symbol" rowSpan={coin.data.length}>{coin.name}</td>}
                          <td className="last" >{numeral(parseFloat(d[7]).toPrecision(6)).format('0,0.00[0000]')} <span>{base}</span></td>
                          <td className={percentClass} >{ parseFloat(d[6]).toFixed(2)} %</td>
                          <td className="volume" >{numeral(parseFloat(d[8]).toPrecision(8)).format('0,0.00[0000]')}</td>
                        </tr>); } )
                    }
                  </tbody>)
                )
                }
              </table>
            </div>
            <div className="order-book">
              <div className="orderControls">
                <h5>Order Book <span className="symbol">BTC/USD</span></h5>
                <div className="orders">
                  <div className="bids">
                    <div className="order-header">
                      <div className="center10">Count</div>
                      <div className="right40">Amount</div>
                      <div className="right40">Total</div>
                      <div className="bid-spacer">&nbsp;</div>
                      <div className="right10">Price</div>
                    </div>
                    { this.getBids() }
                  </div>
                  <div className="asks">
                    <div className="order-header">
                      <div className="left10">Price</div>
                      <div className="right40">Total</div>
                      <div className="right40">Amount</div>
                      <div className="ask-spacer">&nbsp;</div>
                      <div className="center10">Count</div>
                    </div>
                    { this.getAsks() }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { ticker: state.ticker, book: state.book };
}

export default connect(mapStateToProps)(Home);

