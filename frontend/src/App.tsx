import Sidebar from './components/layout/Sidebar';
import MainPanel from './components/layout/MainPanel';
import RightPanel from './components/layout/RightPanel';
import './index.css';

function App() {
  return (
    <div className="flex w-full h-screen bg-slate-50 text-foreground overflow-hidden font-sans">
      <Sidebar />
      <MainPanel />
      <RightPanel />
    </div>
  );
}

export default App;
