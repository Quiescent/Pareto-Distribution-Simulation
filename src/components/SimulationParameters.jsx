import React from 'react';

export const SimulationParameters = () => (
  <form className="ui form">
    <div className="ui field">
      <label>
        TODO
      </label>
    </div>
    <hr />
    <button className="ui primary button">
      Start
    </button>
    <button className="ui secondary button">
      <i className="ui pause icon"/>
      Pause
    </button>
    <button className="ui secondary button">
      <i className="ui right arrow icon"/>
      Advance to completion
    </button>
    <button className="ui secondary button">
      <i className="ui retry icon"/>
      Restart
    </button>
    <button className="ui primary button">
      <i className="ui download icon"/>
      Download
    </button>
  </form>
);
