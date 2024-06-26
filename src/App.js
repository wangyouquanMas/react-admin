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
import ResultsProvider from './scenes/landing/resultsContext.jsx';
import Products from './scenes/products/index.jsx';
import SWOT from './scenes/swot/index.jsx';
import SWOT_bilibili from './scenes/swot_bilibili/index.jsx';
// import MindMap from "./scenes/painpoint1/index.jsx"; // Adjust the import path as necessary
import Painpoints from './scenes/painpoint/index.jsx';
import Psychologys from './scenes/psychology/index.jsx';
import PsychologyAnalysis from './scenes/psychology_analysis/index.jsx';
import WorldCloud from './scenes/word_cloud/index.jsx';
import DynamicLifeStagesTimeline from './scenes/context/index.jsx';
import { useState } from "react";



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
        <ResultsProvider>
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
                <Route path="/products" element={<Products />} />
                <Route path="/swot" element={<SWOT />} />
                <Route path="/swot_bilibili" element={<SWOT_bilibili />} />
                {/* <Route path="/mindMap" element={<MindMap />} /> */}
                <Route path="/painpoint" element={<Painpoints />} />
                <Route path="/psychology" element={<Psychologys />} />
                <Route path="/psychology_analysis" element={<PsychologyAnalysis />} />
                <Route path="/wordcloud" element={<WorldCloud />} />
                <Route path="/context" element={<DynamicLifeStagesTimeline />} />
              </Routes>
            </main>
          </div>
        </ResultsProvider>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
