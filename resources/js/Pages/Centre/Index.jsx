import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { Copy } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";

export default function Index({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Centre
        </h2>
      }
    >
      <Head title="Centre" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Create Centre</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[1000px]">
                  <DialogHeader>
                    <DialogTitle>Create Centre</DialogTitle>
                    <DialogDescription>
                      Make changes to your Centre Registration here. Click Next
                      when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex">
                    <div className="w-10 h-auto gap-4">
                      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                          href="#"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <Home className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Orders
                          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            6
                          </Badge>
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                          <Package className="h-4 w-4" />
                          Products{" "}
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <Users className="h-4 w-4" />
                          Customers
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <LineChart className="h-4 w-4" />
                          Analytics
                        </Link>
                      </nav>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-20 px-40 ">
                      <div className="grid grid-cols-4 items-centre gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save & Next</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
