"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const components = [
    { title: "Início", href: "/", description: "Volte ao início da página." },
    { title: "Gerenciar categorias", href: "/categories", description: "Veja, exclua e edite as categorias." },
    { title: "Gráficos", href: "/graphics", description: "Acompanhe como tem sido seus gastos em gráficos." },
]

export const NavigationMenuMain = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Mobile Menu */}
            <div className="flex items-center justify-between px-4 py-2 bg-white lg:hidden">
                <Link href="/" className="text-xl font-bold text-gray-900">
                    Budget App
                </Link>
                <Sheet>
                    <SheetTrigger>
                        <span className="p-3">
                            <Menu size={24} className="text-gray-900" />
                        </span>
                    </SheetTrigger>
                    <SheetContent className="max-h-screen overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4 space-y-4">
                            {components.map((component) => (
                                <Link
                                    key={component.title}
                                    href={component.href}
                                    className="block p-3 text-lg font-semibold text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    {component.title}
                                    <p className="text-sm text-gray-500">{component.description}</p>
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-between mb-8 px-6">
                <div className="flex-shrink-0">
                    <span className="font-semibold text-2xl">Budget App</span>
                </div>
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-4 mt-4 px-10 xl:px-0">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-lg">Categorias</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:grid-cols-2 lg:w-[600px]">
                                    {components.map((component) => (
                                        <ListItem className="hover:bg-gray-100"
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}

const ListItem = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium">{title}</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        )
    }
)
ListItem.displayName = "ListItem"