import Sidebar from './components/layout/Sidebar';
import MainPanel from './components/layout/MainPanel';
import RightPanel from './components/layout/RightPanel';
import './index.css';

export default function App() {
  return (
    <div className="flex h-screen bg-muted/30 text-foreground overflow-hidden font-sans selection:bg-primary/20">
      <Sidebar />
      <MainPanel />
      <RightPanel />
    </div>
  );
}
