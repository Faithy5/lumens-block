"use client"

const BLOCK_TYPES = ["Condition", "Transfer", "Storage", "Event", "Auth"]

interface ToolbarProps {
  onFitView: () => void
}

export default function Toolbar({ onFitView }: ToolbarProps) {
  const onDragStart = (event: React.DragEvent, blockType: string) => {
    event.dataTransfer.setData("application/blocktype", blockType)
  }

  return (
    <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-md">
      <p className="text-xs font-semibold text-slate-400 uppercase">Blocks</p>
      {BLOCK_TYPES.map((type) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => onDragStart(e, type)}
          className="cursor-grab rounded border border-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800 active:cursor-grabbing"
        >
          {type}
        </div>
      ))}
      <hr className="border-slate-700" />
      <button
        onClick={onFitView}
        className="rounded border border-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Fit view (Ctrl+Shift+H)"
      >
        Fit View
      </button>
    </div>
  )
}
