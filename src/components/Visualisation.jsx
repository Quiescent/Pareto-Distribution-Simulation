import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { ResponsiveBar } from '@nivo/bar';

import './Visualisation.scss';

const mapStateToProps = ({ simulation }) => {
  return {
    currentTick: simulation.currentTick,
    maxTick: simulation.maxTicks,
    data: simulation.graphData,
    running: simulation.running,
    display: simulation.display
  };
};

const MAX_CATEGORIES_TO_RENDER = 200;

export const Visualisation =  connect(mapStateToProps)(({ data, currentTick, maxTick, running, display }) => {
  const containerRef = useRef();

  const width = containerRef.current ? containerRef.current.parentNode.offsetWidth : 500;

  return (
    <div className="graphContainer" ref={ containerRef } style={{ width }}>
      {
        running ? (
          <div>
            <h4>
              Progress: { currentTick } / { maxTick }
            </h4>
          </div>): null
      }
      {
        data && data.length > MAX_CATEGORIES_TO_RENDER ?
          (
            <h3>
              Too many categories to render...
            </h3>
          ): null
      }
      {
        display && data && data.length <= MAX_CATEGORIES_TO_RENDER ?
          (
            <ResponsiveBar
              data={ data }
              indexBy="category"
              keys={ ['value'] }
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={ 0.3 }
              colors={{ scheme: 'category10' }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
              fill={[
                {
                  match: {
                    id: 'fries'
                  },
                  id: 'dots'
                },
                {
                  match: {
                    id: 'sandwich'
                  },
                  id: 'lines'
                }
              ]}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'groups',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendPosition: 'middle',
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          ): null
      }
    </div>
  );
});
