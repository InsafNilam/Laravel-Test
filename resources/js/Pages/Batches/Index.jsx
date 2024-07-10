import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Badge } from "@/Components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import Pagination from "@/Components/Pagination";
import { BATCH_STATUS_CLASS_MAP, BATCH_STATUS_TEXT_MAP } from "@/constants";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function Index({
  auth,
  batch: initialBatches,
  deletedBatches: initialDeletedBatches,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [batches, setBatches] = useState(initialBatches);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [deletedBatches, setDeletedBatches] = useState(initialDeletedBatches);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openForceDeleteModal, setOpenForceDeleteModal] = useState(false);
  const [openRestoreModal, setOpenRestoreModal] = useState(false);
  const [batchToRestore, setBatchToRestore] = useState(null);
  const [batchToForceDelete, setBatchToForceDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBatches(initialBatches);
    setDeletedBatches(deletedBatches);
  }, [initialBatches, initialDeletedBatches]);

  // Delete Batch Modal
  const closeModal = () => {
    setOpenModal(false);
    setBatchToDelete(null);
  };

  //Getting Confirmation before deleting the batch
  const confirmDeleteBatch = (batch) => {
    setBatchToDelete(batch);
    setOpenModal(true);
  };

  //Deleting the batch
  const deleteBatch = () => {
    if (batchToDelete) {
      const promise = new Promise((resolve, reject) => {
        axios.delete(route("batches.destroy", batchToDelete.id));
        resolve();
      });

      promise.then(() => {
        setBatches({
          ...batches,
          data: batches.data.filter((batch) => batch.id !== batchToDelete.id),
        });
        setDeletedBatches({
          ...deletedBatches,
          data: [...deletedBatches.data, batchToDelete],
        });
        closeModal();
      });
    }
  };

  //Restoring Batch Modal
  const closeRestoreModal = () => {
    setOpenRestoreModal(false);
    setBatchToRestore(null);
  };

  //Getting Confirmation before restoring the batch
  const confirmRestoreBatch = (deletedBatch) => {
    setBatchToRestore(deletedBatch);
    setOpenRestoreModal(true);
  };

  //Restoring the batch
  const restoreBatch = () => {
    if (batchToRestore) {
      const promise = new Promise((resolve, reject) => {
        axios.post(route("batches.restore", { batch: batchToRestore.id }));
        resolve();
      });
      promise.then(() => {
        setDeletedBatches({
          ...deletedBatches,
          data: deletedBatches.data.filter(
            (batch) => batch.id !== batchToRestore.id
          ),
        });
        setBatches({
          ...batches,
          data: [...batches.data, batchToRestore],
        });
        closeRestoreModal();
      });
    }
  };

  // Force Delete Batch Modal
  const closeForceDeleteModal = () => {
    setOpenForceDeleteModal(false);
    setBatchToForceDelete(null);
  };

  // Getting Confirmation before force deleting the batch
  const confirmForceDeleteBatch = (deletedBatch) => {
    setBatchToForceDelete(deletedBatch);
    setOpenForceDeleteModal(true);
  };

  // Force Deleting the batch
  const forceDeleteBatch = () => {
    if (batchToForceDelete) {
      const promise = new Promise((resolve, reject) => {
        axios.delete(
          route("batches.forceDelete", {
            batch: batchToForceDelete.id,
          })
        );
        resolve();
      });
      promise.then(() => {
        setDeletedBatches({
          ...deletedBatches,
          data: deletedBatches.data.filter(
            (batch) => batch.id !== batchToForceDelete.id
          ),
        });
        closeForceDeleteModal();
      });
    }
  };

  const generatePDF = () => {
    setLoading(true);
    axios
      .get(route("api.download-pdf"), {
        params: { template: "template" },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Accept: "application/pdf",
        },
        responseType: "blob",
      })
      .then((response) => {
        console.log("DATA = " + response);
        var blob = new Blob([response.data], {
          type: "application/pdf",
        });
        var url = window.URL.createObjectURL(blob);
        const timeout = setTimeout(() => {
          setLoading(false);
          clearTimeout(timeout); // Clear the timeout to prevent memory leaks
       }, 500);
        window.open(url, target="_blank");
      })
      .catch((error) => {
        console.log(error);
      });
    // router.get(
    //   route("api.generate-pdf"),
    //   { data: null, template: "template" },
    //   {
    //     onSuccess: () => {
    //       console.log("PDF generated successfully");
    //     },
    //     onError: (error) => {
    //       console.log(error);
    //     },
    //   }
    // );
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Batch
        </h2>
      }
    >
      <Head title="Batch" />
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            {auth.user.role === "super_admin" && (
              <TabsTrigger value="deleted">Deleted</TabsTrigger>
            )}
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Admins</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Center Admins
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Learners</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" asChild>
              <Link href={route("batches.create")}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Batch
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Batches</CardTitle>
              <CardDescription>
                Manage your batches and view batch details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-1/10 sm:table-cell">
                      Batch Name
                    </TableHead>
                    <TableHead>Purchase Order No</TableHead>
                    {/* <TableHead>Learner Count</TableHead> */}
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.data.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="py-1 font-medium hover:underline">
                        <Link href={route("batches.show", batch.id)}>
                          {batch.name}
                        </Link>
                      </TableCell>
                      <TableCell className="py-1 font-medium">
                        {batch.purchase_order_no}
                      </TableCell>
                      {/* <TableCell className="py-1 font-medium">
                                                {20}
                                            </TableCell> */}
                      <TableCell
                        className={`py-1 font-medium ${
                          BATCH_STATUS_CLASS_MAP[batch.status]
                        }`}
                      >
                        <Badge
                          className="w-[100px] block text-center"
                          variant={BATCH_STATUS_CLASS_MAP[batch.status]}
                        >
                          {BATCH_STATUS_TEXT_MAP[batch.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2">
                        {batch.description}
                      </TableCell>
                      <TableCell className="py-2">{batch.created_at}</TableCell>

                      <TableCell className="py-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link
                                className="w-full"
                                href={route("batches.show", batch.id)}
                              >
                                Show
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <div className="w-full" onClick={generatePDF}>
                                Download
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link
                                className="w-full"
                                href={route("batches.edit", batch.id)}
                              >
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                confirmDeleteBatch(batch);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <div>
                <Pagination links={batches.links} />
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="deleted">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Deleted Batches</CardTitle>
              <CardDescription>
                Manage your Batches and view their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-1/10 sm:table-cell">
                      Batch Name
                    </TableHead>
                    <TableHead>Purchase Order No</TableHead>
                    {/* <TableHead>Learner Count</TableHead> */}
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deletedBatches.data.map((deletedBatch) => (
                    <TableRow key={deletedBatch.id}>
                      <TableCell className="py-1 font-medium">
                        {deletedBatch.name}
                      </TableCell>
                      <TableCell className="py-1 font-medium">
                        {deletedBatch.purchase_order_no}
                      </TableCell>
                      {/* <TableCell className="py-1 font-medium">
                                                {20}
                                            </TableCell> */}
                      <TableCell
                        className={`py-1 font-medium ${
                          BATCH_STATUS_CLASS_MAP[deletedBatch.status]
                        }`}
                      >
                        <Badge
                          className="w-[100px] block text-center"
                          variant={BATCH_STATUS_CLASS_MAP[deletedBatch.status]}
                        >
                          {BATCH_STATUS_TEXT_MAP[deletedBatch.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2">
                        {deletedBatch.description}
                      </TableCell>
                      <TableCell className="py-2">
                        {deletedBatch.created_at}
                      </TableCell>

                      <TableCell className="py-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link>Show</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => confirmRestoreBatch(deletedBatch)}
                            >
                              Restore
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                confirmForceDeleteBatch(deletedBatch)
                              }
                            >
                              Delete Permanently
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <div>
                <Pagination links={batches.links} />
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal for Delete Batch  */}
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              batch and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteBatch}>
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/*  Modal for restore Batch */}
      <AlertDialog open={openRestoreModal} onOpenChange={setOpenRestoreModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will restore the batch that has already deleted batch.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeRestoreModal}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={restoreBatch}>
              Confirm Restore
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Modal for force delete batch */}
      <AlertDialog
        open={openForceDeleteModal}
        onOpenChange={setOpenForceDeleteModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              batch and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeForceDeleteModal}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={forceDeleteBatch}>
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {loading && (
        <div className="loading-screen">

          <ClipLoader />

        </div>
      )}
    </AuthenticatedLayout>
  );
}
