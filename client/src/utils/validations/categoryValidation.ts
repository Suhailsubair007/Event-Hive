export interface CategoryFormData {
    name: string;
    description: string;
    imageUrl: string;
  }
  
  export const validateCategoryForm = (formData: CategoryFormData): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    // Name validation: only alphabets and spaces
    if (!formData.name) {
      errors.name = "Category name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Category name must contain only letters and spaces";
    }
  
    // Description validation: only alphabets and spaces, max 200 words
    if (!formData.description) {
      errors.description = "Description is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.description)) {
      errors.description = "Description must contain only letters and spaces";
    } else {
      const wordCount = formData.description.trim().split(/\s+/).length;
      if (wordCount > 200) {
        errors.description = "Description must not exceed 200 words";
      }
    }
  
    return errors;
  };