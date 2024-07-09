import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import FileDialog from "@/Components/upload/FileDialog";
import { useState } from "react";
import FileInput from "@/Components/upload/FileInput";
import { Textarea } from "@/Components/ui/textarea";
import { BATCH_STATUS_TEXT_MAP } from "@/constants";

export default function Edit({ batch, auth, documents }) {
  const { data, setData, put, processing, errors, reset } = useForm({
      name: batch.name || "",
      purchase_order_no: batch.purchase_order_no || "",
      status: batch.status || "",
      description: batch.description || "",
  });

  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onSubmit = (e) => {
      e.preventDefault();
      put(route("batches.update", batch.id), {
          preserveScroll: true,
          onSuccess: () => {
              reset();
          },
          onError: () => {
              console.log("Error updating batch");
          },
      });
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
          <Card className="max-w-full">
              <CardHeader>
                  <CardTitle className="text-xl">Update Batch</CardTitle>
                  <CardDescription>
                      Enter batch details to update a batch
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <form onSubmit={onSubmit}>
                      <div className="grid gap-4 mt-4 mb-4">
                          <div className="grid gap-2">
                              <Label htmlFor="name">Batch Name</Label>
                              <Input
                                  id="name"
                                  name="name"
                                  type="text"
                                  value={data.name}
                                  placeholder="Enter Batch Name"
                                  onChange={(e) =>
                                      setData("name", e.target.value)
                                  }
                                  required
                              />
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="purchase_order_no">Purchase Order Name</Label>
                              <Input
                                  id="purchase_order_no"
                                  name="purchase_order_no"
                                  type="text"
                                  value={data.purchase_order_no}
                                  placeholder="Purchase Order Number"
                                  onChange={(e) =>
                                      setData("purchase_order_no", e.target.value)
                                  }
                                  required
                              />
                          </div>
                          {/* <div className="grid gap-2">
                              <Label htmlFor="learner_count">Learner Count</Label>
                              <Input
                                  id="learner_count"
                                  name="learner_count"
                                  type="text"
                                  value={data.learner_count}
                                  placeholder="Purchase Order Number"
                                  onChange={(e) =>
                                      setData("learner_count", e.target.value)
                                  }
                                  required
                              />
                          </div> */}
                          <div className="grid gap-2">
                                      <Label htmlFor="status">Status</Label>
                                      <Select
                                          id="status"
                                          name="status"
                                          value={data.status}
                                          onValueChange={(value) =>
                                              setData("status", value)
                                          }
                                          required
                                      >
                                          <SelectTrigger>
                                              <SelectValue placeholder="Select a Status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                              <SelectGroup>
                                                  {[
                                                      "active",
                                                      "inactive",

                                                  ].map((value) => (
                                                      <SelectItem
                                                          key={value}
                                                          value={value}
                                                      >
                                                          {
                                                              BATCH_STATUS_TEXT_MAP[
                                                                  value
                                                              ]
                                                          }
                                                      </SelectItem>
                                                  ))}
                                              </SelectGroup>
                                          </SelectContent>
                                      </Select>
                                  </div>
                              </div>

                          <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                  id="description"
                                  name="description"
                                  value={data.description}
                                  onChange={(e) =>
                                      setData("description", e.target.value)
                                  }
                                  className="flex items-end mt-4 space-x-5 "
                                  placeholder="Type your message here."
                              />
                          </div>

                      <div className="flex justify-end gap-2">
                          <Button variant="outline" className="mt-4">
                              <Link href={route("batches.index")}>
                                  Go Back
                              </Link>
                          </Button>
                          <Button
                              type="submit"
                              className="mt-4"
                              disabled={processing}
                          >
                              Update Batch
                          </Button>
                      </div>
                  </form>
              </CardContent>
          </Card>
      </AuthenticatedLayout>
  );
}
