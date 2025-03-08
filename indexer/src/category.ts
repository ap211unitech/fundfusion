import {
  CreatedCategory as CreatedCategoryEvent,
  EditCategory as EditCategoryEvent,
} from "../generated/Category/Category";
import { Category } from "../generated/schema";

export function handleCreatedCategory(event: CreatedCategoryEvent): void {
  const id = event.params.categoryId.toHex();
  const categoryEntity = new Category(id); // Create new entity only if not found

  categoryEntity.owner = event.params.owner;
  categoryEntity.categoryId = event.params.categoryId;
  categoryEntity.name = event.params.name;
  categoryEntity.updatedAt = event.block.timestamp;

  categoryEntity.save();
}

export function handleEditCategory(event: EditCategoryEvent): void {
  const id = event.params.categoryId.toHex();
  const categoryEntity = Category.load(id);

  if (categoryEntity !== null) {
    // Only update if it already exists
    categoryEntity.owner = event.params.owner;
    categoryEntity.name = event.params.name;
    categoryEntity.updatedAt = event.block.timestamp;
    categoryEntity.save();
  }
}
