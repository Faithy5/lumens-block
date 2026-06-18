"use client"

import ReactFlow, {
  addEdge,
  Background,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useViewport,
  type Connection,
  type Node,
} from "reactflow"
import "reactflow/dist/style.css"
import { useCallback } from "react"
import Toolbar from "./Toolbar"
import DeployButton from "./DeployButton"

const NODE_COLOURS: Record<string, string> = {
  Condition: "#6366f1",
  Transfer:  "#22c55e",
  Storage:   "#f59e0b",
  Event:     "#ec4899",
  Auth:      "#3b82f6",
  default:   "#94a3b8",
}

const nodeColor = (node: Node) =>
  NODE_COLOURS[node.data?.blockType as string] ?? NODE_COLOURS.default

const initialNodes = [
  {
    id: "1",
    type: "default",
    position: { x: 250, y: 150 },
    data: { label: "Start" },
  },
]

function ZoomControls() {
  const { zoomIn, zoomOut } = useReactFlow()
  const { zoom } = useViewport()

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 shadow"
      role="toolbar"
      aria-label="Zoom controls"
    >
      <button
        onClick={() => zoomOut()}
        aria-label="Zoom out"
        className="w-7 h-7 flex items-center justify-center rounded text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold"
      >
        −
      </button>
      <span
        aria-live="polite"
        aria-label={`Zoom level ${Math.round(zoom * 100)} percent`}
        className="w-14 text-center text-sm font-medium text-slate-200 select-none"
      >
        {Math.round(zoom * 100)}%
      </span>
      <button
        onClick={() => zoomIn()}
        aria-label="Zoom in"
        className="w-7 h-7 flex items-center justify-center rounded text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold"
      >
        +
      </button>
    </div>
  )
}

function EditorInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { fitView } = useReactFlow()

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  return (
    <div className="relative h-full w-full">
      <Toolbar onFitView={() => fitView({ padding: 0.1 })} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap
          nodeColor={nodeColor}
          style={{ background: "#0f172a", border: "1px solid #334155" }}
          maskColor="rgba(15,23,42,0.6)"
        />
        <ZoomControls />
      </ReactFlow>
      <DeployButton nodes={nodes} edges={edges} />
    </div>
  )
}

export default function BlockEditor() {
  return (
    <ReactFlowProvider>
      <EditorInner />
    </ReactFlowProvider>
  )
}
