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

// Define PageOne, PageTwo, and PageThree outside the main component
const PageOne = ({ data, setData }) => (
  <div className="flex-1 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
    </div>
  </div>
);

// Placeholder for PageTwo and PageThree
const PageTwo = ({ data, setData }) => (
  <div className="flex-1 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
    </div>
  </div>
);
const PageThree = ({ data, setData }) => (
  <div className="flex-1 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
    </div>
  </div>
);
const PageFour = ({ data, setData }) => (
  <div className="flex-1 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
    </div>
  </div>
);
const PageFive = ({ data, setData }) => (
  <div className="flex-1 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username" className="text-left">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
    </div>
  </div>
);
const PageSix = ({ data, setData }) => (
  <div className="flex-1 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
    </div>
  </div>
);

export default function Index({ auth }) {
  const [value, setValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({
    name: "Pedro Duarte",
    username: "@peduarte",	
  });

  const onClick = (value) => {
    setValue(parseInt(value));
  };

  const handleNext = () => {
    setValue(value + 1);
  };

  const handlePrevious = () => {
    setValue(value - 1);
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
                  <Button className="px-4 py-2 text-white bg-blue-500 rounded" variant="outline">Create Centre</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[1000px]">
                  <DialogHeader>
                    <DialogTitle>Create Centre</DialogTitle>
                    <DialogDescription>
                      Make changes to your Centre Registration here. Click Save
                      & Next when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-row gap-x-4 ">
                    <div className="h-full px-3 py-4 w-auto bg-[#020817] dark:bg-gray-800 rounded-md">
                      <ToggleGroup
                        type="single"
                        className="items-start justify-start text-nowrap"
                        defaultValue={value.toString()}
                        value={value.toString()}
                        onValueChange={(value) => onClick(value)}
                      >
                        <nav className="grid items-start gap-1 pr-2 text-sm font-medium lg:pr-4">
                          <ToggleGroupItem
                            value="1"
                            className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                          >
                            <Home className="w-4 h-4" />
                            Centre Information
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="2"
                            className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Required Approvals
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="3"
                            className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                          >
                            <Package className="w-4 h-4" />
                            Resources
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="4"
                            className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                          >
                            <Users className="w-4 h-4" />
                            Staffing
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="5"
                            className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                          >
                            <LineChart className="w-4 h-4" />
                            Policies and Procedures
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="6"
                            className="flex items-start justify-start gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
                          >
                            <LineChart className="w-4 h-4" />
                            Applicant Declaration
                          </ToggleGroupItem>
                        </nav>
                      </ToggleGroup>
                    </div>
                    <div className="flex-1 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                      {value === 1 && <PageOne data={data} setData={setData} />}
                      {value === 2 && <PageTwo data={data} setData={setData} />}
                      {value === 3 && (
                        <PageThree data={data} setData={setData} />
                      )}
                      {value === 4 && (
                        <PageFour data={data} setData={setData} />
                      )}
                      {value === 5 && (
                        <PageFive data={data} setData={setData} />
                      )}
                      {value === 6 && (
                        <PageSix data={data} setData={setData} />
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={() => {
                        if (value > 1) {
                          handlePrevious();
                        }
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        if (value < 6) {
                          handleNext();
                        }
                      }}
                    >
                      Save & Next
                    </Button>
                    {value === 6 && (
                      <Button type="submit" disabled={false}>
                        Register
                      </Button>
                    )}
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
