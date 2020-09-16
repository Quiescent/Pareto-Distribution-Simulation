import React from 'react';

import { ForceGraph2D } from 'react-force-graph';


export const Visualisation = ({ data }) => (
  <ForceGraph2D
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
  />
);
