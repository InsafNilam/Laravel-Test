import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
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
import { ToggleGroup, ToggleGroupItem } from "@/Components/ui/toggle-group";

export default function Index({ auth }) {
  const [selectedValue, setSelectedValue] = useState('a');

  const handleValueChange = (value) => {
    setSelectedValue(value);
    console.log('Value' , selectedValue);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Centre
        </h2>
      }
    >
      <Head title="Centre" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
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
                  <div className="flex flex-row">
                    <ToggleGroup
                    value={selectedValue} onValueChange={handleValueChange}
                      type="single"
                      className="items-start justify-start"
                    >
                      <nav className="grid items-start pr-2 text-sm font-medium lg:pr-4">
                        <ToggleGroupItem
                          value="a"
                          className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                        >
                          <Home className="w-4 h-4" />
                          Centre Information
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="b"
                          className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Required Approval
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="c"
                          className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                        >
                          <Package className="w-4 h-4" />
                          Resources
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="d"
                          className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                        >
                          <Users className="w-4 h-4" />
                          Staffing
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="e"
                          className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                        >
                          <LineChart className="w-4 h-4" />
                          Policies and Procedures
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="e"
                          className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                        >
                          <Package className="w-4 h-4" />
                          Applicant Declaration
                        </ToggleGroupItem>
                      </nav>
                    </ToggleGroup>
                    <div className="grid flex-1 grid-cols-2 gap-4">
                      <div className="">
                        <Label htmlFor="name" className="text-left">
                          Name
                        </Label>
                        <Input
                          id="name"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="username" className="text-left">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="username" className="text-left">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="username" className="text-left">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="username" className="text-left">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="username" className="text-left">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="username" className="text-left">
                          Username
                        </Label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="username" className="text-left">
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
