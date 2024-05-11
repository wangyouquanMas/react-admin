import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import { Routes, Route } from "react-router-dom";
// import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/index.jsx";
import Questions from "./scenes/questions/index.jsx";
import Answers from "./scenes/answers/index.jsx";
import Emotion from "./scenes/emotion/index.jsx";

function App() {
  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/answers" element={<Answers />} />
              <Route path="/emotion" element={<Emotion />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
