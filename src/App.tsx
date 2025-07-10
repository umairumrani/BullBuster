import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Router />
    </TooltipProvider>
  );
}

export default App;
