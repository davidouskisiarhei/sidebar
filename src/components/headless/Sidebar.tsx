import { createContext, useContext, useState } from "react"
import type {
  Dispatch,
  ElementType,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from "react"

// создание контекста, который будет хранить возможные состояния сайдбара, которые удобно можно
// использовать в каждом компоненте, относящемся к сайдбару
const SidebarContext = createContext<{
  isExpand: boolean
  setIsExpand: Dispatch<SetStateAction<boolean>>
} | null>(null)

// главный компонент, в котором происходит основная логика работы
// реалиазация основана на примере bootstrap, чтобы можно было импортировать только компонент Sidebar, а
// уже с помощью его вызывать дочерние компоненты, которые могут работать только в обертке этого компонента,
// например: Sidebar.Item, Sidebar.ToggleItem
// данный подход достаточно структурирован и не запутывает пользователя в плане возможных вариантов использования
export function Sidebar({
  defaultExpanded = true, // флаг, который отвечает за начальное состояние расширения сайдбара
  className,
  children,
}: {
  defaultExpanded?: boolean
  className?: string
  children: ReactNode
}) {
  // состояние, отвечающее за то, расширен сайдбар или нет
  const [isExpand, setIsExpand] = useState(defaultExpanded)

  // aria-expanded установлен для обертки, чтобы можно было инкапсулировано взаимодействовать с состоянием сайдбара в компоненте потребителе
  return (
    <div aria-expanded={isExpand} className={className}>
      <SidebarContext value={{ isExpand, setIsExpand }}>
        {children}
      </SidebarContext>
    </div>
  )
}

// обертка, которая содержит пункты списка сайдбара (Sidebar.Item)
Sidebar.Items = function Items({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const sidebarContext = useContext(SidebarContext)

  // вот здесь происходит магия, с помощью которой ограничивается возможность использования дочерних компонентов элемента Sidebar
  if (sidebarContext === null)
    throw new Error(
      "Для компонента <Sidebar.Items /> отсутствует родительский компонент <Sidebar />",
    )

  return <div className={className}>{children}</div>
}

// основной пункт сайдбара
Sidebar.Item = function Item<T extends ElementType = "button">({
  isActive, // флаг, который указывает на то, активный пункт или нет
  className,
  onClick,
  children,
}: PropsWithChildren<{
  isActive?: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}>) {
  const sidebarContext = useContext(SidebarContext)

  if (sidebarContext === null)
    throw new Error(
      "Для компонента <Sidebar.Item /> отсутствует родительский компонент <Sidebar />",
    )

  // дата атрибут data-active установлен для удобного взаимодействия в компоненте потребителе
  return (
    <button data-active={isActive} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

// элемент, отвечающий за переключение состояния расширения сайдбара
Sidebar.ToggleItem = function ToggleItem({
  className,
  children,
  onClick,
}: PropsWithChildren<{
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}>) {
  const sidebarContext = useContext(SidebarContext)

  if (sidebarContext === null)
    throw new Error(
      "Для компонента <Sidebar.ToggleItem /> отсутствует родительский компонент <Sidebar />",
    )

  const { setIsExpand } = sidebarContext

  return (
    <button
      className={className}
      onClick={(e) => {
        setIsExpand((prev) => !prev)
        if (onClick) onClick(e)
      }}
    >
      {children}
    </button>
  )
}
