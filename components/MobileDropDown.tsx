
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Logs, Menu, ShoppingBag } from "lucide-react"
import Link from "next/link"
import{ cn }from "@/lib/utils"

export function MobileDropdown({className}: {className?: string}) {
  return (
    <div  className={cn("text-center" , className)}>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu className="h-5 w-5 text-lightColor hover:text-lightColor/80 cursor-pointer hoverEffect" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" sideOffset={12} >
       <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <Link href={"/cart"}>
          <DropdownMenuItem className="text-xs font-semibold">
            My Cart
            <DropdownMenuShortcut>
              <ShoppingBag className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
          <Link href={"/wishlist"}>
          <DropdownMenuItem className="text-xs font-semibold">
            My Wish
            <DropdownMenuShortcut>
              <Heart className="w-4 h-4"/>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
          <Link href={"/orders"}>
          <DropdownMenuItem className="text-xs font-semibold">
           My Orders
            <DropdownMenuShortcut>
              <Logs className="w-4 h-4"/>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

