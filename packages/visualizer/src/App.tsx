import { CodeMapProvider } from "./data/context.js";
import { Layout } from "./ui/Layout.js";
import { SystemOverview } from "./views/SystemOverview.js";

export function App() {
  return (
    <CodeMapProvider>
      <Layout>
        <SystemOverview />
      </Layout>
    </CodeMapProvider>
  );
}
