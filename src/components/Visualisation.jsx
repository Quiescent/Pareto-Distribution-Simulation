import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { ForceGraph2D } from 'react-force-graph';

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

export const Visualisation =  connect(mapStateToProps)(({ data, currentTick, maxTick, running, display }) => {
  const containerRef = useRef();

  const width = containerRef.current ? containerRef.current.parentNode.offsetWidth : 500;

  return (
    <div className="graphContainer" ref={ containerRef }>
      {
        running ? (
          <div>
            <h4>
              Progress: { currentTick } / { maxTick }
            </h4>
          </div>): null
      }
      {
        display ?
          (
            <ForceGraph2D
              width={ width }
              height={ 750 }
              graphData={ data }
              nodeAutoColorBy="group"
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.id;
                const fontSize = 12/globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = node.color;
                ctx.fillText(label, node.x, node.y);
              }}
            />): null
      }
    </div>
  );
});
