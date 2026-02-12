// local imports
import { ApiError } from "../utils/ApiError.js";
import {
  countStudents,
  createStudentRepo,
  deactivateStudentByIdRepo,
  fetchStudentsRepo,
  findStudentByIdRepo,
  findStudents,
  updateStudentRepo,
} from "../repository/student.repository.js";
import { buildPagination } from "../utils/pagination.js";
import { QueryBuilder } from "../utils/QueryBuilder.js";

export const createStudentService = async (data) => {
  const { name, email, rollNo, age, address, standard, subjects } = data;

  if (
    !name ||
    !email ||
    !rollNo ||
    !age ||
    !address ||
    !standard ||
    !subjects
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const student = await createStudentRepo(data);

  return student;
};

export const fetchStudentsService = async (queryParams) => {
  const pagination = buildPagination(queryParams);

  const qb = new QueryBuilder({
    baseFilters: {
      isActive: true,
      ...(queryParams.filters.standard && {
        standard: queryParams.filters.standard,
      }),
      ...(queryParams.filters.age && {
        age: queryParams.filters.age,
      }),
    },
    search: queryParams.search,
    searchFields: ["name", "email"],
  });

  const query = qb.build();

  const [students, total] = await Promise.all([
    findStudents(query, pagination),
    countStudents(query),
  ]);

  return {
    students,
    meta: {
      total,
      page: pagination.page,
      limit: pagination.limit,
      pages: Math.ceil(total / pagination.limit),
    },
  };
};

export const updateStudentService = async (id, data) => {
  if (!id) {
    throw new ApiError(400, "Student ID is required");
  }

  const existingStudent = await findStudentByIdRepo(id);

  if (!existingStudent) {
    throw new ApiError(404, "Student not found");
  }

  const updatedStudent = await updateStudentRepo(id, data);

  return updatedStudent;
};

export const deactivateStudentService = async (id) => {
  if (!id) {
    throw new ApiError(400, "Student ID is required");
  }

  const student = await findStudentByIdRepo(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  if (student.isActive === false) {
    return student; // idempotent behavior
  }

  const deactivatedStudent = await deactivateStudentByIdRepo(id);

  return deactivatedStudent;
};
