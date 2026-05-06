import { CodeMapProvider } from "./data/context";
import { SystemOverview } from "./views/SystemOverview";

export function App() {
  return (
    <CodeMapProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <SystemOverview />
      </div>
    </CodeMapProvider>
  );
}
