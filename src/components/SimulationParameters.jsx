import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import {
  pauseSimulation,
  startSimulation,
  resetSimulation
} from '../actions';


const validate = ({ maxTicks, nodeCount, stepTime }) => Object.assign(
  {},
  { maxTicks: !maxTicks ? 'Please enter a simulation length in ticks': '' },
  { nodeCount: !nodeCount ? 'Please enter the number of items in experiment': '' },
  { stepTime: !stepTime ? 'Please enter the length of each step in milliseconds': '' }
);

const wireUpRedux = component => reduxForm(
  {
    form: 'simulation',
    validate
  }
)(
  connect(null, { startSimulation, pauseSimulation, resetSimulation })(component)
);

const Input = (props) => {
  const fieldClassName = `field ${props.meta.error && props.meta.touched ? 'error': ''}`;

  return (
    <div className={ fieldClassName }>
      <label>
        { props.label }
      </label>
      <props.controlType type={ props.type } { ...props.input } />
      {
        props.meta.error && props.meta.touched ? (
          <div className="ui error message">
            { props.meta.error }
          </div>):
        null }
    </div>
  );
};

const preventingDefault = f => e => {
  e.preventDefault();
  f(e);
};

export const SimulationParameters = wireUpRedux(({ handleSubmit, startSimulation, pauseSimulation, resetSimulation }) => (
  <form className="ui error form">
    <h3>
      Simulation Parameters
    </h3>
    <div className="ui field">
      <Field
        name="maxTicks"
        component={ Input }
        type="text"
        controlType="input"
        label="Simulation length (in trials)"
      />
      <Field
        name="nodeCount"
        component={ Input }
        type="text"
        controlType="input"
        label="Number of items in simulation"
      />
      <Field
        name="stepTime"
        component={ Input }
        type="text"
        controlType="input"
        label="Time in milliseconds per step"
      />
    </div>
    <hr />
    <div className="ui padded segment">
      <button className="ui primary button" onClick={ handleSubmit(startSimulation) }>
        <i className="play icon"/>
        Start
      </button>
      <br/>
      <br/>
      <button className="ui labeled icon button" onClick={ handleSubmit(pauseSimulation) }>
        <i className="pause icon"/>
        Pause
      </button>
      <br/>
      <br/>
      <button className="ui labeled icon button" onClick={ handleSubmit(() => { alert('TODO'); }) }>
        <i className="right arrow icon"/>
        Complete
      </button>
      <br/>
      <br/>
      <button className="ui labeled icon button" onClick={ handleSubmit(resetSimulation) }>
        <i className="redo icon"/>
        Restart
      </button>
      <br/>
      <br/>
      <button className="ui labeled icon button" onClick={ preventingDefault(() => { alert('TODO'); }) }>
        <i className="download icon"/>
        Download
      </button>
    </div>
  </form>
));
