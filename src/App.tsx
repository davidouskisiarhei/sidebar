import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import classNames from "classnames"

import { Sidebar } from "./components/headless/Sidebar"
import {
  ExpandIcon,
  MenuItem1Icon,
  MenuItem2Icon,
  MenuItem3Icon,
} from "./assets/icons"

import "./App.css"
import { AppMenu } from "./components/AppMenu"

function App() {
  // const { menuId, submenuId } = useParams()

  const [subItemsIsOpen, setSubItemsIsOpen] = useState(false)

  // useEffect(() => {
  //   setSubItemsIsOpen(false)
  // }, [menuId, submenuId])

  return (
    <div>
      <AppMenu basename={"/sidebar"}>
        {/*<Sidebar.ItemWrapper className={"group/item-wrapper relative"}>*/}
        {/*  <Sidebar.Item*/}
        {/*    isActive={menuId === "menu-item-1"}*/}
        {/*    className={*/}
        {/*      "peer w-full p-3 hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"*/}
        {/*    }*/}
        {/*    onClick={() => setSubItemsIsOpen((prev) => !prev)}*/}
        {/*  >*/}
        {/*    <div*/}
        {/*      className={*/}
        {/*        "group/item flex flex-col items-center gap-1 md:flex-row md:gap-3"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <MenuItem1Icon className={"size-6"} />*/}
        {/*      <p*/}
        {/*        className={*/}
        {/*          "block whitespace-nowrap md:hidden md:group-aria-expanded:block md:group-aria-[expanded=false]:hidden"*/}
        {/*        }*/}
        {/*      >*/}
        {/*        Menu item 1*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </Sidebar.Item>*/}

        {/*  <Sidebar.SubItems*/}
        {/*    className={classNames(*/}
        {/*      "fixed bottom-[93px] left-0 z-10 flex w-screen flex-col items-start gap-1 border-t bg-white p-2 peer-data-[active=false]:hidden md:relative md:bottom-auto md:w-auto md:border-t-0 md:p-0 md:group-aria-[expanded=false]:absolute md:group-aria-[expanded=false]:left-12 md:group-aria-[expanded=false]:top-0 md:group-aria-[expanded=false]:hidden md:group-aria-[expanded=false]:rounded-lg md:group-aria-[expanded=false]:border md:group-aria-[expanded=false]:p-2 md:group-aria-[expanded=true]:pl-4 md:group-aria-[expanded=true]:pt-2 md:group-aria-[expanded=false]:group-hover/item-wrapper:flex",*/}
        {/*      { "!flex": subItemsIsOpen },*/}
        {/*    )}*/}
        {/*  >*/}
        {/*    <p*/}
        {/*      className={*/}
        {/*        "hidden whitespace-nowrap p-2 font-bold md:group-aria-[expanded=false]:block"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      Menu item 1*/}
        {/*    </p>*/}
        {/*    <Sidebar.SubItem*/}
        {/*      isActive={*/}
        {/*        menuId === "menu-item-1" && submenuId === "sub-menu-item-1"*/}
        {/*      }*/}
        {/*      className={*/}
        {/*        "flex w-full text-left hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <Link*/}
        {/*        to={"/menu-item-1/sub-menu-item-1"}*/}
        {/*        className={"whitespace-nowrap p-2"}*/}
        {/*      >*/}
        {/*        Sub item 1*/}
        {/*      </Link>*/}
        {/*    </Sidebar.SubItem>*/}

        {/*    <Sidebar.SubItem*/}
        {/*      isActive={*/}
        {/*        menuId === "menu-item-1" && submenuId === "sub-menu-item-2"*/}
        {/*      }*/}
        {/*      className={*/}
        {/*        "flex w-full text-left hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <Link*/}
        {/*        to={"/menu-item-1/sub-menu-item-2"}*/}
        {/*        className={"whitespace-nowrap p-2"}*/}
        {/*      >*/}
        {/*        Sub item 2*/}
        {/*      </Link>*/}
        {/*    </Sidebar.SubItem>*/}

        {/*    <Sidebar.SubItem*/}
        {/*      isActive={*/}
        {/*        menuId === "menu-item-1" && submenuId === "sub-menu-item-3"*/}
        {/*      }*/}
        {/*      className={*/}
        {/*        "flex w-full text-left hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <Link*/}
        {/*        to={"/menu-item-1/sub-menu-item-3"}*/}
        {/*        className={"whitespace-nowrap p-2"}*/}
        {/*      >*/}
        {/*        Sub item 3*/}
        {/*      </Link>*/}
        {/*    </Sidebar.SubItem>*/}
        {/*  </Sidebar.SubItems>*/}
        {/*</Sidebar.ItemWrapper>*/}

        {/*<Sidebar.Item*/}
        {/*  isActive={menuId === "menu-item-2"}*/}
        {/*  className={*/}
        {/*    "relative hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Link*/}
        {/*    to={"/menu-item-2"}*/}
        {/*    className={*/}
        {/*      "group/item flex flex-col items-center gap-1 p-3 md:flex-row md:gap-3"*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <MenuItem2Icon className={"size-6"} />*/}
        {/*    <p*/}
        {/*      className={*/}
        {/*        "block whitespace-nowrap md:hidden md:group-aria-expanded:block md:group-aria-[expanded=false]:group-hover/item:absolute md:group-aria-[expanded=false]:group-hover/item:left-16 md:group-aria-[expanded=false]:group-hover/item:block md:group-aria-[expanded=false]:group-hover/item:rounded-md md:group-aria-[expanded=false]:group-hover/item:bg-gray-100 md:group-aria-[expanded=false]:group-hover/item:p-2 md:group-aria-[expanded=false]:group-hover/item:text-black"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      Menu item 2*/}
        {/*    </p>*/}
        {/*  </Link>*/}
        {/*</Sidebar.Item>*/}

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
