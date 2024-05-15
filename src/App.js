import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import { Routes, Route, useLocation } from "react-router-dom";
// import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/index.jsx";
import Questions from "./scenes/questions/index.jsx";
import Answers from "./scenes/answers/index.jsx";
import Emotion from "./scenes/emotion/index.jsx";
import Triggers from "./scenes/trigger/index.jsx";
import LandingPage from "./scenes/landing/index.jsx";


function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation(); // This is where you use the hook

  // Determine if the current route is the landing page
  const isLandingPage = location.pathname === "/";
  //TODO   
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Render Sidebar and Topbar only if not on the landing page */}
          {!isLandingPage && <Sidebar />}
          <main className="content">
            {!isLandingPage && <Topbar />}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/answers" element={<Answers />} />
              <Route path="/emotion" element={<Emotion />} />
              <Route path="/trigger" element={<Triggers />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
