import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    rollNo: {
      type: Number,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    standard: {
      type: Number,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

studentSchema.index({ isActive: 1, createdAt: -1 });
studentSchema.index({ standard: 1 });
studentSchema.index({ age: 1 });

const Student = mongoose.model("Student", studentSchema);

export default Student;
