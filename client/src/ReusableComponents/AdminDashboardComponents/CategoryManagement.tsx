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
import { Plus, Pencil, Upload } from "lucide-react";
import { uploadImageToCloudinary } from "@/utils/imageUpload";
import {
  type CategoryData,
  categoryService,
} from "../../services/Admin/categoryService";

export default function CategoryManagement() {
  const [categories, setCategories] = React.useState<CategoryData[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] =
    React.useState<CategoryData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState<CategoryData>({
    name: "",
    description: "",
    imageUrl: "",
  });

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (error) {
      console.error("Error saving category:", error);
    }
    setIsLoading(false);
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
    setIsAddModalOpen(true);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      </div>
    </div>
  );
}
