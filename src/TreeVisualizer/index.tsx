import { useState } from "react";

class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

class BinarySearchTree {
  root: TreeNode | null = null;

  insert(value: number) {
    this.root = this._insertRec(this.root, value);
  }

  private _insertRec(node: TreeNode | null, value: number): TreeNode {
    if (node === null) return new TreeNode(value);
    if (value < node.value) node.left = this._insertRec(node.left, value);
    else if (value > node.value)
      node.right = this._insertRec(node.right, value);
    return node;
  }

  reset() {
    this.root = null;
  }
}

const TreeNodeComponent = ({ node }: { node: TreeNode | null }) => {
  if (!node) return null;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        {/* Node */}
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full border-2 border-black">
          {node.value}
        </div>

        {/* Branches */}
        {node.right && (
          <div
            className="absolute w-[2px] h-16 bg-black origin-top"
            style={{
              top: "100%",
              left: "24px",
              transform: "translateX(-50%) rotate(-45deg)",
            }}
          />
        )}
        {node.left && (
          <div
            className="absolute w-[2px] h-16 bg-black origin-top"
            style={{
              top: "100%",
              left: "24px",
              transform: "translateX(-50%) rotate(45deg)",
            }}
          />
        )}
      </div>

      {/* Child nodes */}
      <div className="flex mt-12 gap-16">
        {node.left && <TreeNodeComponent node={node.left} />}
        {node.right && <TreeNodeComponent node={node.right} />}
      </div>
    </div>
  );
};

const TreeVisualizer = () => {
  const [tree] = useState(new BinarySearchTree());
  const [values, setValues] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      tree.insert(value);
      setValues([...values, value]);
    }
    setInputValue("");
  };

  const handleReset = () => {
    tree.reset();
    setValues([]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInsert();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Visualizador de Árvore Binária
      </h1>
      <div className="mb-4 flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Insira um número"
        />
        <button
          onClick={handleInsert}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Adicionar
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Resetar
        </button>
      </div>
      <div className="w-full h-[600px] bg-white rounded-lg shadow-lg p-8 overflow-auto">
        <div className="flex justify-center">
          <TreeNodeComponent node={tree.root} />
        </div>
      </div>
      {values.length > 0 && (
        <div className="mt-4 text-gray-600">
          Valores inseridos: {values.join(", ")}
        </div>
      )}
    </div>
  );
};

export default TreeVisualizer;
