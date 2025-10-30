import React, {
  createContext,
  useState,
  useContext,
  Children,
  isValidElement,
  cloneElement,
  useEffect,
} from "react"
import type {
  Dispatch,
  JSX,
  ReactNode,
  SVGProps,
  SetStateAction,
  MouseEventHandler,
} from "react"
import { BrowserRouter, NavLink, useLocation } from "react-router"
import classNames from "classnames"

import { ExpandIcon } from "../assets/icons"

import { Sidebar } from "./headless/Sidebar"

// контекст, который будет хранить возмодные состояния AppMenu
const AppMenuContext = createContext<{
  openSubItems: SubItems
  setOpenSubItems: Dispatch<SetStateAction<SubItems>>
  pathname: string
} | null>(null)

type SubItems = { [key: string]: boolean }

// компонент предоставляет удобный апи для создания меню приложения с использовнием роутинга и headless компонента Sidebar,
// минимизирует использование кода в компоненте потребителе
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

// компонент создан отдельно для того, чтобы можно было использовать хуки библиотеки react-router
// без обертки BrowserRouter использовать хуки не получилось бы
function AppMenuContent({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  // объект, который хранит состояния открытых/закрытых сабкомпонентов меню
  const [openSubItems, setOpenSubItems] = useState<SubItems>({})

  useEffect(() => {
    setOpenSubItems({})
  }, [pathname])

  return (
    <AppMenuContext value={{ openSubItems, setOpenSubItems, pathname }}>
      <Sidebar
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

// компонент обертка, с момощью которого в меню добавляется сабменю
AppMenu.Group = function AppMenuGroup({
  path, // часть пути, которая дополняет вложенный путь компонента AppMenu.Item
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

  // ограничение возможности использования дочерних компонентов элемента AppMenu
  if (context === null)
    throw new Error(
      "Для компонента <AppMenu.Group /> отсутствует родительский компонент <AppMenu />",
    )

  const { openSubItems, setOpenSubItems, pathname } = context

  // проверка на то, является ли передаваемый путь компонента частью текущего урла
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
            hidden: !openSubItems[path],
            "md:group-aria-expanded:flex": openSubItems[path] || isActivePath,
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
        {/* для того, чтобы можно было дополнить пути вложенных AppMenu.Item, нужно перебрать вложенные элементы */}
        {Children.map(children, (child) => {
          // проверка на то, является ли вложенный элемент компонентом AppMenu.Item, если нет, вернется ошибка,
          // т.к. в данный компонент можно передавать только компоненты AppMenu.Item
          if (isValidElement(child) && child.type === AppMenu.Item) {
            // копируем пропсы вложенного элемента, чтобы можно было их изменить
            const props = { ...(child.props as AppMenuItemProps) }

            props.isSubItem = true // от этого флага зависит список классов, который будет присвоен элементу AppMenu.Item
            props.to = `${path}/${props.to}` // дополняем путь вложенного элемента частью роута AppMenu.Group

            return cloneElement(child, { ...props }) // клонируем элемент с дополненными и измененными пропсами
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

// компонент пункта меню
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
