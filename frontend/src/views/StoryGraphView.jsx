import React, { useState } from 'react';
import { 
  Network, 
  Sparkles, 
  Clock, 
  Play, 
  ShieldCheck, 
  Users, 
  Tag, 
  Calendar, 
  Info,
  Maximize2,
  X
} from 'lucide-react';

export default function StoryGraphView({ 
  graphData, 
  onSeekTimestamp, 
  onNavigate 
}) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all | technology | person | claim | framework | forecast

  const nodes = graphData?.nodes || [];
  const edges = graphData?.edges || [];
  const center = graphData?.center || { id: 'root', label: 'The Future of AI & Digital Media' };

  // Calculate geometric layout coordinates for the graph nodes
  const totalNodes = nodes.length;
  const radius = 220; // radius of circle in SVG
  const centerX = 340;
  const centerY = 280;

  const nodePositions = nodes.reduce((acc, node, index) => {
    const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
    acc[node.id] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
    return acc;
  }, { root: { x: centerX, y: centerY } });

  const filteredNodes = filterType === 'all' 
    ? nodes 
    : nodes.filter(n => n.type === filterType || (filterType === 'claim' && n.type === 'claim'));

  const getNodeColor = (type) => {
    switch (type) {
      case 'root': return 'from-emerald-500 to-teal-400 text-slate-950 border-emerald-300';
      case 'claim': return 'from-emerald-950/80 to-slate-900 text-emerald-300 border-emerald-500/50';
      case 'person': return 'from-cyan-950/80 to-slate-900 text-cyan-300 border-cyan-500/50';
      case 'technology': return 'from-indigo-950/80 to-slate-900 text-indigo-300 border-indigo-500/50';
      case 'framework': return 'from-amber-950/80 to-slate-900 text-amber-300 border-amber-500/50';
      default: return 'from-slate-900 to-slate-950 text-slate-200 border-white/20';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Story Graph
            </h1>
            <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
              Interactive Canvas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            A structured map of what the source is saying. Click any node to explore evidence & timestamps.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs">
          {['all', 'claim', 'person', 'technology', 'framework'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`capitalize px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === type
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All Nodes' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-2 relative rounded-3xl border border-white/10 bg-slate-950/80 overflow-hidden shadow-2xl p-4 sm:p-6 min-h-[580px] flex items-center justify-center">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          <svg className="w-full h-[540px] max-w-[680px]">
            {/* Edges / Connecting Lines */}
            {edges.map((edge, i) => {
              const fromPos = nodePositions[edge.from] || { x: centerX, y: centerY };
              const toPos = nodePositions[edge.to] || { x: centerX, y: centerY };
              const isHighlighted = selectedNode && (selectedNode.id === edge.from || selectedNode.id === edge.to);

              return (
                <g key={`edge-${i}`}>
                  <line
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke={isHighlighted ? "#10B981" : "rgba(255,255,255,0.12)"}
                    strokeWidth={isHighlighted ? 2.5 : 1.2}
                    strokeDasharray={edge.label.includes('[') ? "4 4" : "none"}
                    className="transition-all duration-300"
                  />
                  {/* Midpoint Label */}
                  <text
                    x={(fromPos.x + toPos.x) / 2}
                    y={(fromPos.y + toPos.y) / 2 - 4}
                    fill={isHighlighted ? "#34D399" : "#64748B"}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Center Node (Core Thesis) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedNode({ ...center, details: "The overarching keynote thesis exploring multimodal AI production, TruthTrace timestamp anchors, and 3.2x audience divergence." })}
            >
              <circle
                cx={centerX}
                cy={centerY}
                r={48}
                fill="#064E3B"
                stroke="#10B981"
                strokeWidth={selectedNode?.id === 'root' ? 3.5 : 2}
                className="transition-all group-hover:scale-105"
              />
              <text
                x={centerX}
                y={centerY - 8}
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                className="select-none pointer-events-none"
              >
                Core Thesis
              </text>
              <text
                x={centerX}
                y={centerY + 10}
                fill="#A7F3D0"
                fontSize="9"
                textAnchor="middle"
                className="select-none pointer-events-none font-mono"
              >
                EchoLens AI
              </text>
            </g>

            {/* Outer Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions[node.id] || { x: centerX, y: centerY };
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Node Circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 32 : 26}
                    fill={node.type === 'claim' ? '#064E3B' : node.type === 'person' ? '#164E63' : '#1E1B4B'}
                    stroke={isSelected ? '#34D399' : '#6EE7B7'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-200 group-hover:scale-110"
                  />
                  {/* Category icon / text */}
                  <text
                    x={pos.x}
                    y={pos.y - 2}
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="600"
                    textAnchor="middle"
                    className="select-none pointer-events-none"
                  >
                    {node.type.toUpperCase().slice(0, 4)}
                  </text>
                  {node.timestamp && (
                    <text
                      x={pos.x}
                      y={pos.y + 11}
                      fill="#A7F3D0"
                      fontSize="8"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {node.timestamp}
                    </text>
                  )}
                  {/* Label under node */}
                  <text
                    x={pos.x}
                    y={pos.y + 38}
                    fill={isSelected ? '#34D399' : '#E2E8F0'}
                    fontSize="10"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                    className="select-none pointer-events-none max-w-xs"
                  >
                    {node.label.length > 18 ? node.label.slice(0, 16) + '...' : node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Canvas Help Badge */}
          <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 text-[11px] text-slate-400 pointer-events-none">
            <Info className="h-3.5 w-3.5 text-emerald-400" />
            <span>Click any node to inspect claims and jump to raw video timestamp</span>
          </div>
        </div>

        {/* Node Inspector Drawer */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 space-y-5 shadow-2xl backdrop-blur-xl">
          {selectedNode ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    {selectedNode.category || selectedNode.type}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {selectedNode.label}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="rounded-lg p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <p className="leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                  {selectedNode.details || "No additional context recorded for this node."}
                </p>

                {selectedNode.timestamp && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    <div className="flex items-center space-x-2 text-emerald-300">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono font-bold text-sm">
                        {selectedNode.timestamp}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400">
                      Ground Truth Timestamp
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {selectedNode.timestamp_seconds !== undefined && (
                  <button
                    onClick={() => {
                      onSeekTimestamp(selectedNode.timestamp_seconds, selectedNode.label);
                      onNavigate('truthtrace');
                    }}
                    className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 text-xs transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>View Ground Truth at {selectedNode.timestamp}</span>
                  </button>
                )}

                <button
                  onClick={() => onNavigate('truthtrace')}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 text-xs font-semibold border border-white/5 transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Verify in TruthTrace</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
                <Network className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Select a Graph Node</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Click any topic, claim, person, or event in the graph canvas to inspect its source grounding.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
