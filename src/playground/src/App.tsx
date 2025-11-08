import "./App.css";
import { AppShell } from "../../package/src/AppShell";

function App() {
  return (
    <AppShell
      pages={[
        {
          route: "/",
          component: <div>Home Page</div>,
        },
        {
          route: "/about",
          component: <div>About Page</div>,
        },
      ]}
      appName={"React Kit"}
      navigationPosition={"top"}
    />
  );
}

export default App;
