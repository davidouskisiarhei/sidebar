import React, {
  createContext,
  Dispatch,
  JSX,
  type ReactNode,
  SVGProps,
  useState,
  SetStateAction,
  useContext,
  MouseEventHandler,
} from "react"
import { BrowserRouter, Link, NavLink, Routes, useLocation } from "react-router"

import { Sidebar } from "./headless/Sidebar"
import { ExpandIcon, MenuItem1Icon, MenuItem2Icon } from "../assets/icons"
import classNames from "classnames"

const AppMenuContext = createContext<{
  openSubItems: SubItems
  setOpenSubItems: Dispatch<SetStateAction<SubItems>>
} | null>(null)

type SubItems = { [key: string]: boolean }

export function AppMenu({
  basename,
  children,
}: {
  basename?: string
  children: ReactNode
}) {
  const [openSubItems, setOpenSubItems] = useState<SubItems>({})

  return (
    <BrowserRouter basename={basename}>
      <AppMenuContext value={{ openSubItems, setOpenSubItems }}>
        <Sidebar
          defaultExpanded
          className={
            "group fixed bottom-0 flex w-screen justify-center border-t bg-white p-2 md:relative md:h-screen md:w-fit md:flex-col md:justify-between md:gap-2 md:border-r md:aria-expanded:w-52"
          }
        >
          <Sidebar.Items className={"flex gap-2 md:flex-col"}>
            {children}
          </Sidebar.Items>

          <Sidebar.ToggleItem
            className={
              "hidden w-fit p-3 hover:rounded-md hover:bg-gray-100 data-[active=true]:rounded-md md:block"
            }
            onClick={() => setOpenSubItems({})}
          >
            <ExpandIcon className={"size-6 group-aria-expanded:rotate-180"} />
          </Sidebar.ToggleItem>
        </Sidebar>
      </AppMenuContext>
    </BrowserRouter>
  )
}

AppMenu.Group = function AppMenuGroup({
  to,
  icon,
  label,
  children,
}: {
  to: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  label: string
  children: ReactNode
}) {
  const context = useContext(AppMenuContext)

  if (context === null)
    throw new Error(
      "Для компонента <AppMenu.Group /> отсутствует родительский компонент <AppMenu />",
    )

  const { openSubItems, setOpenSubItems } = context

  return (
    <Sidebar.ItemWrapper className={"group/item-wrapper relative"}>
      <AppMenu.Item
        to={to}
        icon={icon}
        label={label}
        onClick={() =>
          setOpenSubItems((prev) => ({ ...prev, [to]: !prev[to] }))
        }
        className={"group/item"}
      />

      <Sidebar.SubItems
        className={classNames(
          "fixed bottom-[93px] left-0 z-10 flex w-screen flex-col items-start gap-1 border-t bg-white p-2 peer-data-[active=false]:hidden md:relative md:bottom-auto md:w-auto md:border-t-0 md:p-0 md:group-aria-[expanded=false]:absolute md:group-aria-[expanded=false]:left-12 md:group-aria-[expanded=false]:top-0 md:group-aria-[expanded=false]:hidden md:group-aria-[expanded=false]:rounded-lg md:group-aria-[expanded=false]:border md:group-aria-[expanded=false]:p-2 md:group-aria-[expanded=true]:pl-4 md:group-aria-[expanded=true]:pt-2 md:group-aria-[expanded=false]:group-hover/item-wrapper:flex",
          { "!flex": openSubItems[to] },
        )}
      >
        <p
          className={
            "hidden whitespace-nowrap p-2 font-bold md:group-aria-[expanded=false]:block"
          }
        >
          {label}
        </p>
        {children}
      </Sidebar.SubItems>
    </Sidebar.ItemWrapper>
  )
}

AppMenu.Item = function AppMenuItem({
  to,
  label,
  icon: Icon,
  onClick,
  className,
}: {
  to: string
  label: string
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
  onClick?: MouseEventHandler<HTMLAnchorElement>
  className?: string
}) {
  return (
    <NavLink to={to} className={className} onClick={onClick}>
      {({ isActive }) => (
        <Sidebar.Item
          isActive={isActive}
          className={classNames(
            "relative w-full hover:rounded-md hover:bg-gray-100",
            { "rounded-md bg-gray-100 text-cyan-700": isActive },
          )}
        >
          <div
            className={
              "flex flex-col items-center gap-1 p-3 md:flex-row md:gap-3"
            }
          >
            {!!Icon && <Icon className={"size-6"} />}
            <p
              className={
                "block whitespace-nowrap md:hidden md:group-aria-expanded:block md:group-aria-[expanded=false]:group-hover/item:absolute md:group-aria-[expanded=false]:group-hover/item:left-16 md:group-aria-[expanded=false]:group-hover/item:block md:group-aria-[expanded=false]:group-hover/item:rounded-md md:group-aria-[expanded=false]:group-hover/item:bg-gray-100 md:group-aria-[expanded=false]:group-hover/item:p-2 md:group-aria-[expanded=false]:group-hover/item:text-black"
              }
            >
              {label}
            </p>
          </div>
        </Sidebar.Item>
      )}
    </NavLink>
  )
}
