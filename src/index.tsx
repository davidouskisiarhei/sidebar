import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"

import "./index.css"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter basename={'/sidebar'}>
      <Routes>
        <Route index element={<App />} />
        <Route path={":menuId"}>
          <Route index element={<App />} />
          <Route path=":submenuId" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
