import { ValidationError } from "@/lib/exceptions/errors";
import { JournalEntryInput, JournalEntryUpdateInput } from "@/types/entry.type";

export class EntryValidator {
  static validateEntryInput(entry: JournalEntryInput): void {
    if (!entry || typeof entry !== "object") {
      throw new ValidationError("Entry must be an object");
    }

    if (typeof entry.answer !== "string" || entry.answer.trim() === "") {
      throw new ValidationError("Answer must be a non-empty string");
    }

    if (typeof entry.question !== "string" || entry.question.trim() === "") {
      throw new ValidationError("Question must be a non-empty string");
    }

    if (entry.category && typeof entry.category !== "string") {
      throw new ValidationError("Category must be a string if provided");
    }
  }

  static validateEntryArray(entries: JournalEntryInput[]): void {
    if (!Array.isArray(entries)) {
      throw new ValidationError("Entries must be an array");
    }

    if (entries.length === 0) {
      throw new ValidationError("At least one entry is required");
    }
  }

  static validateUpdateRequest(data: JournalEntryUpdateInput): void {
    if (!data || typeof data !== "object") {
      throw new ValidationError("Update data must be an object");
    }

    if (typeof data.id !== "string" || data.id.trim() === "") {
      throw new ValidationError("ID must be a non-empty string");
    }

    if (typeof data.answer !== "string" || data.answer.trim() === "") {
      throw new ValidationError("Answer must be a non-empty string");
    }
  }

  static validateId(id: string): void {
    if (typeof id !== "string" || id.trim() === "") {
      throw new ValidationError("ID must be a non-empty string");
    }
  }
}
