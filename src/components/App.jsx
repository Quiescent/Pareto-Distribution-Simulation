import React from 'react';

import { SimulationParameters } from './SimulationParameters';
import { Visualisation } from './Visualisation';

export const App = () => (
  <div className="ui app container">
    <div className="ui two grid">
      <div className="ui four wide column">
        <SimulationParameters />
      </div>
      <div className="ui twelve wide column">
        <Visualisation />
      </div>
    </div>
  </div>
);
