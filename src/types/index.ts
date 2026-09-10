// User and Authentication Types
export enum UserRole {
  STUDENT = 'student',
  COMPANY = 'company',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Student Types
export interface StudentProfile {
  id: string;
  userId: string;
  university: string;
  level: string; // 100, 200, 300, 400, 500, 600, 700
  field: string;
  course: string;
  specialization: string;
  bio?: string;
  phone?: string;
  linkedin?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Company Types
export interface CompanyProfile {
  id: string;
  userId: string;
  name: string;
  description: string;
  industry: string;
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  logo?: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Opportunity Types
export enum OpportunityType {
  SIWES = 'siwes',
  INTERNSHIP = 'internship',
  INDUSTRIAL_TRAINING = 'industrial_training',
  EXTERNSHIP = 'externship',
  PLACEMENT = 'placement',
}

export enum WorkArrangement {
  ON_SITE = 'on_site',
  REMOTE = 'remote',
  HYBRID = 'hybrid',
}

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export interface Opportunity {
  id: string;
  companyId: string;
  company?: CompanyProfile;
  title: string;
  description: string;
  type: OpportunityType;
  field: string;
  course: string;
  specialization: string;
  requirements: string;
  location: string;
  city: string;
  state: string;
  country: string;
  workArrangement: WorkArrangement;
  deadline: Date;
  cvRequired: boolean;
  stipend?: string;
  duration?: string;
  contactEmail?: string;
  contactPhone?: string;
  applicationUrl?: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Application Types
export enum ApplicationStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export interface Application {
  id: string;
  studentId: string;
  opportunityId: string;
  opportunity?: Opportunity;
  status: ApplicationStatus;
  coverLetter?: string;
  cvUrl?: string;
  appliedAt: Date;
  updatedAt: Date;
}

// Saved Opportunity Types
export interface SavedOpportunity {
  id: string;
  studentId: string;
  opportunityId: string;
  opportunity?: Opportunity;
  savedAt: Date;
}

// University and Academic Structure Types
export interface University {
  id: string;
  name: string;
  state: string;
  country: string;
  abbreviation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Field {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  fieldId: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Specialization {
  id: string;
  courseId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Form Types
export interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface StudentProfileFormData {
  university: string;
  level: string;
  field: string;
  course: string;
  specialization: string;
  phone?: string;
  bio?: string;
  linkedin?: string;
}

export interface CompanyProfileFormData {
  name: string;
  description: string;
  industry: string;
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface CreateOpportunityFormData {
  title: string;
  description: string;
  type: OpportunityType;
  field: string;
  course: string;
  specialization: string;
  requirements: string;
  location: string;
  city: string;
  state: string;
  country: string;
  workArrangement: WorkArrangement;
  deadline: Date;
  cvRequired: boolean;
  stipend?: string;
  duration?: string;
  contactEmail?: string;
  contactPhone?: string;
  applicationUrl?: string;
}
