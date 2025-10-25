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
          "group fixed bottom-0 flex w-screen justify-center border-t bg-white p-2 md:relative md:h-screen md:w-fit md:flex-col md:justify-between md:gap-2 md:border-r md:aria-expanded:w-52"
        }
      >
        <Sidebar.Items className={"flex gap-2 md:flex-col"}>
          <Sidebar.ItemWrapper className={"group/item-wrapper relative"}>
            <Sidebar.Item
              isActive={menuId === "menu-item-1"}
              className={
                "peer w-full p-3 hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"
              }
              onClick={() => setSubItemsIsOpen((prev) => !prev)}
            >
              <div
                className={
                  "group/item flex flex-col items-center gap-1 md:flex-row md:gap-3"
                }
              >
                <MenuItem1Icon className={"size-6"} />
                <p
                  className={
                    "block whitespace-nowrap md:hidden md:group-aria-expanded:block md:group-aria-[expanded=false]:hidden"
                  }
                >
                  Menu item 1
                </p>
              </div>
            </Sidebar.Item>

            <Sidebar.SubItems
              className={classNames(
                "fixed bottom-[93px] left-0 z-10 flex w-screen flex-col items-start gap-1 border-t bg-white p-2 peer-data-[active=false]:hidden md:relative md:bottom-auto md:w-auto md:border-t-0 md:p-0 md:group-aria-[expanded=false]:absolute md:group-aria-[expanded=false]:left-12 md:group-aria-[expanded=false]:top-0 md:group-aria-[expanded=false]:hidden md:group-aria-[expanded=false]:rounded-lg md:group-aria-[expanded=false]:border md:group-aria-[expanded=false]:p-2 md:group-aria-[expanded=true]:pl-4 md:group-aria-[expanded=true]:pt-2 md:group-aria-[expanded=false]:group-hover/item-wrapper:flex",
                { "!flex": subItemsIsOpen },
              )}
            >
              <p
                className={
                  "hidden whitespace-nowrap p-2 font-bold md:group-aria-[expanded=false]:block"
                }
              >
                Menu item 1
              </p>
              <Sidebar.SubItem
                isActive={
                  menuId === "menu-item-1" && submenuId === "sub-menu-item-1"
                }
                className={
                  "flex w-full text-left hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"
                }
              >
                <Link
                  to={"/menu-item-1/sub-menu-item-1"}
                  className={"whitespace-nowrap p-2"}
                >
                  Sub item 1
                </Link>
              </Sidebar.SubItem>

              <Sidebar.SubItem
                isActive={
                  menuId === "menu-item-1" && submenuId === "sub-menu-item-2"
                }
                className={
                  "flex w-full text-left hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"
                }
              >
                <Link
                  to={"/menu-item-1/sub-menu-item-2"}
                  className={"whitespace-nowrap p-2"}
                >
                  Sub item 2
                </Link>
              </Sidebar.SubItem>

              <Sidebar.SubItem
                isActive={
                  menuId === "menu-item-1" && submenuId === "sub-menu-item-3"
                }
                className={
                  "flex w-full text-left hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"
                }
              >
                <Link
                  to={"/menu-item-1/sub-menu-item-3"}
                  className={"whitespace-nowrap p-2"}
                >
                  Sub item 3
                </Link>
              </Sidebar.SubItem>
            </Sidebar.SubItems>
          </Sidebar.ItemWrapper>

          <Sidebar.Item
            isActive={menuId === "menu-item-2"}
            className={
              "relative hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"
            }
          >
            <Link
              to={"/menu-item-2"}
              className={
                "group/item flex flex-col items-center gap-1 p-3 md:flex-row md:gap-3"
              }
            >
              <MenuItem2Icon className={"size-6"} />
              <p
                className={
                  "block whitespace-nowrap md:hidden md:group-aria-expanded:block md:group-aria-[expanded=false]:group-hover/item:absolute md:group-aria-[expanded=false]:group-hover/item:left-16 md:group-aria-[expanded=false]:group-hover/item:block md:group-aria-[expanded=false]:group-hover/item:rounded-md md:group-aria-[expanded=false]:group-hover/item:bg-gray-100 md:group-aria-[expanded=false]:group-hover/item:p-2 md:group-aria-[expanded=false]:group-hover/item:text-black"
                }
              >
                Menu item 2
              </p>
            </Link>
          </Sidebar.Item>

          <Sidebar.Item
            isActive={menuId === "menu-item-3"}
            className={
              "relative hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md data-[active=true]:bg-gray-100 data-[active=true]:text-cyan-700"
            }
          >
            <Link
              to={"/menu-item-3"}
              className={
                "group/item flex flex-col items-center gap-1 p-3 md:flex-row md:gap-3"
              }
            >
              <MenuItem3Icon className={"size-6"} />
              <p
                className={
                  "block whitespace-nowrap md:hidden md:group-aria-expanded:block md:group-aria-[expanded=false]:group-hover/item:absolute md:group-aria-[expanded=false]:group-hover/item:left-16 md:group-aria-[expanded=false]:group-hover/item:block md:group-aria-[expanded=false]:group-hover/item:rounded-md md:group-aria-[expanded=false]:group-hover/item:bg-gray-100 md:group-aria-[expanded=false]:group-hover/item:p-2 md:group-aria-[expanded=false]:group-hover/item:text-black"
                }
              >
                Menu item 3
              </p>
            </Link>
          </Sidebar.Item>
        </Sidebar.Items>

        <Sidebar.ToggleItem
          className={
            "hidden w-fit p-3 hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md md:block"
          }
          onClick={() => setSubItemsIsOpen(false)}
        >
          <ExpandIcon className={"size-6 group-aria-expanded:rotate-180"} />
        </Sidebar.ToggleItem>
      </Sidebar>
    </div>
  )
}

export default App
