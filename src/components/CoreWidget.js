/** Do not rename this file **/
import React from 'react';

export default class WorldPoolChampionshipsWidget extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    settings: React.PropTypes.object.isRequired,
  };

  static id = 'WorldPoolChampionships';
  static widgetName = 'world-pool-championships';
  static sizes = [[1, 1]];

  constructor(...args) {
    super(...args);
    this.state = {
      scoreData: undefined,
      loadError: undefined,
      liveText: undefined
    };
  }

  componentDidMount() {
    self = this;

    fetch('https://wpc.theserver.lol', {
      headers: {
        'X-API-Key': 'd4392dce2842ad1e4afd552a5e220b39'
      }
    })
    .then(data => data.json())
    .then(jsonResponse => {
      // Make the data accessible in to render()
    	self.setState({scoreData: jsonResponse});

      // Set the "live" text/url for below
      if ( jsonResponse.link ) {
        self.setState({liveText: ['<a href="', jsonResponse.link, '" target="_blank">', jsonResponse.text || jsonResponse.link, '</a>'].join("")});
      } else {
        self.setState({liveText: jsonResponse.text});
      }
    }).catch(err => {
      console.log(err);
    	self.setState({loadError: true});
    });
  }

  render() {
    if ( this.state.loadError ) {
      return (
        <div className="championshipsWorldwide">
          <p>Error retreiving score data.</p>
        </div>
      );
    } else if ( this.state.scoreData ) {
      return (
        <div className="championshipsWorldwide">
          <h1>World Pool Championships</h1>
          <p className="description">See the latest pool results of highly respected <em>snooker-ers</em> <a href="https://twitter.com/marshallofsound" target="_blank">@marshallofsound</a> and <a href="https://twitter.com/adammcarth" target="_blank">@adammcarth</a> playing against each other.</p>

          <div className="left">
            <div className="scoreBox">{this.state.scoreData.sam.wins}</div>
            <h4 className="competitor">SAM</h4>
          </div>

          <div className="right">
            <div className="scoreBox">{this.state.scoreData.adam.wins}</div>
            <h4 className="competitor">ADAM</h4>
          </div>

          <div className="clear"></div>

          <div className="moreInfo">
            <span className={this.state.liveText ? "" : " hide"}>
              <div className="uk-badge uk-badge-danger">LIVE</div>
              <span dangerouslySetInnerHTML={{__html: this.state.liveText}}></span>
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="championshipsWorldwide">
          <p>Loading...</p>
        </div>
      );
    }
  }
}
