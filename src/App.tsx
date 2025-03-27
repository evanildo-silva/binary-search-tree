import { HashRouter } from "react-router-dom";
import TreeVisualizer from "./TreeVisualizer";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <HashRouter>
        <TreeVisualizer />
      </HashRouter>
    </div>
  );
}

export default App;
