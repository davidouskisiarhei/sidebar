import React from "react"

import { MenuItem1Icon, MenuItem2Icon, MenuItem3Icon } from "./assets/icons"

import { AppMenu } from "./components/AppMenu"

import "./App.css"

function App() {
  return (
    <div>
      <AppMenu basename={"/sidebar"}>
        <AppMenu.Group
          path={"menu-item-1"}
          icon={MenuItem1Icon}
          label={"Menu item 1"}
        >
          <AppMenu.Item to={"sub-menu-item-1"} label={"Sub item 1"} />
          <AppMenu.Item to={"sub-menu-item-2"} label={"Sub item 2"} />
          <AppMenu.Item to={"sub-menu-item-3"} label={"Sub item 3"} />
        </AppMenu.Group>

        <AppMenu.Item
          to={"menu-item-2"}
          icon={MenuItem2Icon}
          label={"Menu item 2"}
        />

        <AppMenu.Item
          to={"menu-item-3"}
          icon={MenuItem3Icon}
          label={"Menu item 3"}
        />
      </AppMenu>
    </div>
  )
}

export default App
