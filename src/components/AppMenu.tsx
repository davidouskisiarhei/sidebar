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
  Children,
  isValidElement,
  cloneElement,
  useEffect,
} from "react"
import { BrowserRouter, NavLink, useLocation } from "react-router"
import classNames from "classnames"

import { Sidebar } from "./headless/Sidebar"
import { ExpandIcon } from "../assets/icons"

const AppMenuContext = createContext<{
  openSubItems: SubItems
  setOpenSubItems: Dispatch<SetStateAction<SubItems>>
  pathname: string
} | null>(null)

type SubItems = { [key: string]: boolean }

export function AppMenu({
  basename,
  children,
}: {
  basename?: string
  children: ReactNode
}) {
  return (
    <BrowserRouter basename={basename}>
      <AppMenuContent>{children}</AppMenuContent>
    </BrowserRouter>
  )
}

function AppMenuContent({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  const [openSubItems, setOpenSubItems] = useState<SubItems>({})

  useEffect(() => {
    setOpenSubItems({})
  }, [pathname])

  return (
    <AppMenuContext value={{ openSubItems, setOpenSubItems, pathname }}>
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
  )
}

AppMenu.Group = function AppMenuGroup({
  path,
  icon,
  label,
  children,
}: {
  path: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  label: string
  children: ReactNode
}) {
  const context = useContext(AppMenuContext)

  if (context === null)
    throw new Error(
      "Для компонента <AppMenu.Group /> отсутствует родительский компонент <AppMenu />",
    )

  const { openSubItems, setOpenSubItems, pathname } = context

  const isActivePath = pathname.includes(path)

  return (
    <div className={"group/item-wrapper relative"}>
      <AppMenu.Item
        to={path}
        icon={icon}
        label={label}
        onClick={(e) => {
          e.preventDefault()
          setOpenSubItems((prev) => ({ ...prev, [path]: !prev[path] }))
        }}
      />

      <div
        className={classNames(
          "fixed bottom-[93px] left-0 z-10 flex w-screen flex-col items-start gap-1 border-t bg-white p-2 md:relative md:bottom-auto md:w-auto md:border-t-0 md:p-0 md:group-aria-[expanded=false]:absolute md:group-aria-[expanded=false]:left-12 md:group-aria-[expanded=false]:top-0 md:group-aria-[expanded=false]:rounded-lg md:group-aria-[expanded=false]:border md:group-aria-[expanded=false]:p-2 md:group-aria-[expanded=true]:pl-4 md:group-aria-[expanded=true]:pt-2 md:group-aria-[expanded=false]:group-hover/item-wrapper:flex",
          {
            // hidden: !openSubItems[path] && !isActivePath,
            // "data-aria-expanded:hidden": !isActivePath,
            // flex: openSubItems[path],
            // "md:group-aria-[expanded=false]:flex": isActivePath,
          },
        )}
      >
        <p
          className={
            "hidden whitespace-nowrap p-2 font-bold md:group-aria-[expanded=false]:block"
          }
        >
          {label}
        </p>
        {Children.map(children, (child) => {
          if (isValidElement(child) && child.type === AppMenu.Item) {
            const props = { ...(child.props as AppMenuItemProps) }

            props.isSubItem = true
            props.to = `${path}/${props.to}` // !!!

            return cloneElement(child, { ...props })
          }

          throw new Error(
            "Компонент <AppMenu.Group /> принимает только компоненты <AppMenu.Item />",
          )
        })}
      </div>
    </div>
  )
}

type AppMenuItemProps = {
  to: string
  label: string
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
  onClick?: MouseEventHandler<HTMLAnchorElement>
  className?: string
  isSubItem?: boolean
}

AppMenu.Item = function AppMenuItem({
  to,
  label,
  icon: Icon,
  onClick,
  className,
  isSubItem = false,
}: AppMenuItemProps) {
  return (
    <NavLink
      to={to}
      className={classNames("group/item w-full", className)}
      onClick={onClick}
    >
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
              className={classNames("block whitespace-nowrap text-left", {
                "self-start": isSubItem,
                "md:hidden md:group-aria-expanded:block md:group-aria-[expanded=false]:group-hover/item:absolute md:group-aria-[expanded=false]:group-hover/item:left-16 md:group-aria-[expanded=false]:group-hover/item:block md:group-aria-[expanded=false]:group-hover/item:rounded-md md:group-aria-[expanded=false]:group-hover/item:bg-gray-100 md:group-aria-[expanded=false]:group-hover/item:p-2 md:group-aria-[expanded=false]:group-hover/item:text-black":
                  !isSubItem,
              })}
            >
              {label}
            </p>
          </div>
        </Sidebar.Item>
      )}
    </NavLink>
  )
}
