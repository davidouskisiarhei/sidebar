import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import classNames from "classnames"

import { Sidebar } from "./components/Sidebar"
import {
  ExpandIcon,
  MenuItem1Icon,
  MenuItem2Icon,
  MenuItem3Icon,
} from "./assets/icons"

import "./App.css"

function App() {
  const { menuId, submenuId } = useParams()

  const [subItemsIsOpen, setSubItemsIsOpen] = useState(false)

  useEffect(() => {
    setSubItemsIsOpen(false)
  }, [menuId, submenuId])

  return (
    <div>
      <Sidebar
        defaultExpanded
        className={
          "group fixed bottom-0 flex w-screen justify-center border-t p-5 md:relative md:h-screen md:w-fit md:flex-col md:justify-between md:gap-2 md:border-r md:aria-expanded:w-52"
        }
      >
        <Sidebar.Items className={"flex gap-5 md:flex-col"}>
          <Sidebar.ItemWrapper className={"group/item-wrapper relative"}>
            <Sidebar.Item
              isActive={menuId === "menu-item-1"}
              className={"peer data-[active=true]:text-cyan-600"}
              onClick={() => setSubItemsIsOpen((prev) => !prev)}
            >
              <div
                className={
                  "flex flex-col items-center gap-1 md:h-7 md:flex-row md:gap-2"
                }
              >
                <MenuItem1Icon className={"size-6"} />
                <p className={"hidden group-aria-expanded:block"}>
                  Menu item 1
                </p>
              </div>
            </Sidebar.Item>

            <Sidebar.SubItems
              className={classNames(
                "flex flex-col items-start gap-2 group-aria-[expanded=false]:absolute group-aria-[expanded=false]:hidden group-aria-[expanded=false]:rounded-lg group-aria-[expanded=false]:border group-aria-[expanded=false]:bg-white group-aria-[expanded=false]:p-2 group-aria-[expanded=true]:pl-8 group-aria-[expanded=true]:pt-3 group-aria-[expanded=false]:group-hover/item-wrapper:flex peer-data-[active=false]:hidden",
                { "!flex": subItemsIsOpen },
              )}
            >
              <Sidebar.SubItem
                isActive={
                  menuId === "menu-item-1" && submenuId === "sub-menu-item-1"
                }
                className={"data-[active=true]:text-cyan-600"}
              >
                <Link
                  to={"/menu-item-1/sub-menu-item-1"}
                  className={"whitespace-nowrap"}
                >
                  Sub item 1
                </Link>
              </Sidebar.SubItem>

              <Sidebar.SubItem
                isActive={
                  menuId === "menu-item-1" && submenuId === "sub-menu-item-2"
                }
                className={"data-[active=true]:text-cyan-600"}
              >
                <Link
                  to={"/menu-item-1/sub-menu-item-2"}
                  className={"whitespace-nowrap"}
                >
                  Sub item 2
                </Link>
              </Sidebar.SubItem>

              <Sidebar.SubItem
                isActive={
                  menuId === "menu-item-1" && submenuId === "sub-menu-item-3"
                }
                className={"data-[active=true]:text-cyan-600"}
              >
                <Link
                  to={"/menu-item-1/sub-menu-item-3"}
                  className={"whitespace-nowrap"}
                >
                  Sub item 3
                </Link>
              </Sidebar.SubItem>
            </Sidebar.SubItems>
          </Sidebar.ItemWrapper>

          <Sidebar.Item
            isActive={menuId === "menu-item-2"}
            className={"data-[active=true]:text-cyan-600"}
          >
            <Link
              to={"/menu-item-2"}
              className={
                "flex flex-col items-center gap-1 md:h-7 md:flex-row md:gap-2"
              }
            >
              <MenuItem2Icon className={"size-6"} />
              <p className={"hidden group-aria-expanded:block"}>Menu item 2</p>
            </Link>
          </Sidebar.Item>

          <Sidebar.Item
            isActive={menuId === "menu-item-3"}
            className={"data-[active=true]:text-cyan-600"}
          >
            <Link
              to={"/menu-item-3"}
              className={
                "flex flex-col items-center gap-1 md:h-7 md:flex-row md:gap-2"
              }
            >
              <MenuItem3Icon className={"size-6"} />
              <p className={"hidden group-aria-expanded:block"}>Menu item 3</p>
            </Link>
          </Sidebar.Item>
        </Sidebar.Items>

        <Sidebar.ToggleItem
          className={"hidden w-fit md:block"}
          onClick={() => setSubItemsIsOpen(false)}
        >
          <ExpandIcon className={"h-5 w-5"} />
        </Sidebar.ToggleItem>
      </Sidebar>
    </div>
  )
}

export default App
