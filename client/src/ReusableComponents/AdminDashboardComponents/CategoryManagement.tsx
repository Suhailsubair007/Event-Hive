import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { uploadImageToCloudinary } from "@/utils/imageUpload";
import { AddCategoryAnimation } from "../LoadingAnimations/AddingCategoryAnimation";
import {
  type CategoryData,
  categoryService,
} from "../../services/Admin/categoryService";
import { validateCategoryForm } from "../../utils/validations/categoryValidation";

export default function CategoryManagement() {
  const [categories, setCategories] = React.useState<CategoryData[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] =
    React.useState<CategoryData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>(
    {}
  );
  const limit = 5;

  const [formData, setFormData] = React.useState<CategoryData>({
    name: "",
    description: "",
    imageUrl: "",
  });

  React.useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories(
        currentPage,
        limit
      );
      setCategories(response.categories);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateCategoryForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    try {
      if (editingCategory) {
        await categoryService.editCategory(editingCategory._id!, formData);
      } else {
        await categoryService.addCategory(formData);
      }
      fetchCategories();
      setIsAddModalOpen(false);
      setEditingCategory(null);
      setFormData({ name: "", description: "", imageUrl: "" });
      setFormErrors({});
      toast.success(editingCategory ? "Category updated!" : "Category added!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error saving category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await categoryService.toggleCategoryStatus(id, !currentStatus);
      fetchCategories();
      toast.success("Category status updated!");
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const handleEdit = (category: CategoryData) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, imageUrl: imageUrl || "" }));
    } catch (error) {
      toast.error("Error uploading image");
    }
    setIsLoading(false);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <AddCategoryAnimation />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-[#7848F4]">
            Category Management
          </h1>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#7848F4] hover:bg-[#6837E3] transition-all duration-200 shadow-md"
                onClick={() => {
                  setEditingCategory(null);
                  setFormData({ name: "", description: "", imageUrl: "" });
                  setFormErrors({});
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#7848F4]">
                  {editingCategory ? "Edit Category" : "Create Category"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 p-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Category name"
                    className="border-gray-200 focus:ring-[#7848F4]"
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Category description"
                    className="border-gray-200 focus:ring-[#7848F4]"
                  />
                  {formErrors.description && (
                    <p className="text-sm text-red-500">
                      {formErrors.description}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-gray-700">
                    Image
                  </Label>
                  <div className="flex items-center gap-4">
                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                      />
                    )}
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="border-gray-200"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                    className="border-gray-200 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#7848F4] hover:bg-[#6837E3] transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Saving..."
                      : editingCategory
                      ? "Update"
                      : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table Section */}
        <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Image
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <TableCell className="font-medium text-gray-900">
                    {category.name}
                  </TableCell>
                  <TableCell>
                    <img
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      className="h-12 w-12 rounded-lg object-cover shadow-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={category.isListed}
                      onCheckedChange={() =>
                        handleToggleStatus(category._id!, category.isListed!)
                      }
                      className="data-[state=checked]:bg-[#7848F4]"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                      className="hover:bg-[#7848F4]/10"
                    >
                      <Pencil className="h-4 w-4 text-[#7848F4]" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination className="mt-6">
          <PaginationContent className="bg-white rounded-lg p-2 shadow-md">
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={`${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#7848F4]/10"
                } text-[#7848F4]`}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={currentPage === page}
                  className={`${
                    currentPage === page
                      ? "bg-[#7848F4] text-white hover:bg-[#6837E3]"
                      : "text-[#7848F4] hover:bg-[#7848F4]/10"
                  } rounded-md`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={`${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#7848F4]/10"
                } text-[#7848F4]`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
