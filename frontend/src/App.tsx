import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Backtest from "@/components/pages/backtest.tsx"
import Backtest2 from "@/components/pages/backtest.tsx"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Backtest2/>}/>
            </Routes>
        </Router>
    )
}

export default App
