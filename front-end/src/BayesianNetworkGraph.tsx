import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { CPTs } from './cptData';

export default function BayesianNetworkGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const initialNodes: Node[] = [
    { id: 'CompanyCulture', data: { label: 'Company Culture' }, position: { x: 0, y: 50 } },
    { id: 'WorkLifeBalance', data: { label: 'Work Life Balance' }, position: { x: 150, y: 150 } },
    { id: 'Salary', data: { label: 'Salary' }, position: { x: 300, y: 150 } },
    { id: 'InterestFit', data: { label: 'Interest Fit' }, position: { x: 450, y: 150 } },
    { id: 'CompanyReputation', data: { label: 'Company Reputation' }, position: { x: 600, y: 50 } },
    { id: 'GrowthPotential', data: { label: 'Growth Potential' }, position: { x: 600, y: 150 } },
    { id: 'JobSatisfaction', data: { label: 'Job Satisfaction' }, position: { x: 350, y: 300 } },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1', source: 'CompanyCulture', target: 'WorkLifeBalance', animated: true },
    { id: 'e2', source: 'CompanyReputation', target: 'GrowthPotential', animated: true },
    { id: 'e3', source: 'WorkLifeBalance', target: 'JobSatisfaction', animated: true },
    { id: 'e4', source: 'Salary', target: 'JobSatisfaction', animated: true },
    { id: 'e5', source: 'InterestFit', target: 'JobSatisfaction', animated: true },
    { id: 'e6', source: 'GrowthPotential', target: 'JobSatisfaction', animated: true },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ display: 'flex', height: 600, width: '100%' }}>
      {/* Graph area */}
      <div style={{ flex: 2 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => setSelectedNode(node.id)}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* CPT panel */}
      <div style={{ flex: 1, padding: '1rem', borderLeft: '1px solid #ccc', overflowY: 'auto', background: '#f8f9fa' }}>
        {selectedNode ? (
          <>
            <h6>{selectedNode}</h6>
            <CPTDisplay nodeId={selectedNode} />
          </>
        ) : (
          <p className="text-muted">Click a node to view its CPT.</p>
        )}
      </div>
    </div>
  );
}

// Helper component to display CPTs
function CPTDisplay({ nodeId }: { nodeId: string }) {
  const cpt = CPTs[nodeId as keyof typeof CPTs];

  if (!cpt) {
    return <p className="text-muted">No CPT available for this node.</p>;
  }

  // Complex CPT (array of rows), e.g., JobSatisfaction
  if (Array.isArray(cpt)) {
    return (
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              {Object.keys(cpt[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cpt.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Simple CPT (object of values)
  if (typeof cpt === 'object') {
    return (
      <ul className="list-group list-group-flush">
        {Object.entries(cpt).map(([key, val]) => {
          if (typeof val === 'object') {
            return (
              <li key={key} className="list-group-item">
                <strong>{key}</strong>
                <ul className="list-group mt-1">
                  {Object.entries(val as Record<string, number>).map(([cond, prob]) => (
                    <li key={cond} className="list-group-item d-flex justify-content-between">
                      <span>{cond}</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={key} className="list-group-item d-flex justify-content-between">
              <span>{key}</span>
              <span>{val}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return <p>{String(cpt)}</p>;
}
