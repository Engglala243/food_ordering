import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddMenu = () => {
  const formik = useFormik({
    initialValues: {
      menu_category: "",
    },
  });
  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger className="bg-blue-800 text-white p-2 rounded-md">
            Open
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Menu Data</DialogTitle>
              <DialogDescription className="flex flex-col gap-2">
                <form className="">
                  <div className="flex gap-2 items-center">
                    <label className="text-nowrap text-lg">
                      Category Name:
                    </label>
                    <input className="p-2 bg-gray-200 rounded-md w-full" />
                  </div>
                </form>
                <Card className="text-left">
                  <CardHeader>
                    <CardTitle className="text-lg">Dish Details:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center justify-between">
                        <label className="text-nowrap text-lg">
                          Dish Name:
                        </label>
                        <input className="p-2 bg-gray-200 rounded-md" />
                      </div>
                      <div className="flex gap-2 items-center justify-between">
                        <label className="text-nowrap text-lg">
                          Dish Description:
                        </label>
                        <input className="p-2 bg-gray-200 rounded-md" />
                      </div>
                      <div className="flex gap-2 items-center justify-between">
                        <label className="text-nowrap text-lg">
                          Dish Price:
                        </label>
                        <input className="p-2 bg-gray-200 rounded-md" />
                      </div>
                      <div className="flex gap-2 items-center justify-between">
                        <label className="text-nowrap text-lg">
                          Dish Image:
                        </label>
                        <input
                          className="p-2 bg-gray-200 rounded-md"
                          type="file"
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddMenu;
