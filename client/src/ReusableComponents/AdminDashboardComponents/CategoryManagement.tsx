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
import { validateCategoryForm } from "../../utils/validations/categoryValidation"; // Import the validation function

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

    if (Object.keys(errors).length > 0) {
      return;
    }

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
    } catch (error: any) {
      // Handle specific backend errors
      if (error.response) {
        const { status, data } = error.response;
        if (
          status === 400 &&
          data.message === "Category with this name already exists"
        ) {
          toast.error("Category with this name already exists");
        } else if (
          status === 400 &&
          data.message === "Category ID is required"
        ) {
          toast.error("Category ID is required");
        } else {
          toast.error(
            data.message || "Error saving category. Please try again."
          );
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await categoryService.toggleCategoryStatus(id, !currentStatus);
      fetchCategories();
    } catch (error) {
      console.error("Error toggling category status:", error);
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
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  if (isLoading) {
    return <AddCategoryAnimation />;
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#7848F4]">
            Category Management
          </h1>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#7848F4] hover:bg-[#6837E3]"
                onClick={() => {
                  setEditingCategory(null);
                  setFormData({ name: "", description: "", imageUrl: "" });
                  setFormErrors({});
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter category name"
                    required
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter category description"
                    required
                  />
                  {formErrors.description && (
                    <p className="text-sm text-red-500">
                      {formErrors.description}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Category Image</Label>
                  <div className="flex items-center gap-4">
                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="Category preview"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    )}
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#7848F4] hover:bg-[#6837E3]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Category"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Category Image</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id} className="hover:bg-muted/50">
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <img
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      className="h-12 w-12 rounded-full object-cover"
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
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="h-4 w-4 text-[#7848F4]" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
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
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
