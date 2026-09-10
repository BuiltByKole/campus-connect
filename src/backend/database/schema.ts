// Database schema types and initialization
// This file documents the expected database structure

export interface DatabaseSchema {
  // Users Table
  users: {
    id: string
    email: string
    password_hash: string
    name: string
    role: 'student' | 'company' | 'admin'
    avatar?: string
    email_verified: boolean
    created_at: Date
    updated_at: Date
  }

  // Student Profiles
  student_profiles: {
    id: string
    user_id: string
    university: string
    level: string
    field: string
    course: string
    specialization: string
    bio?: string
    phone?: string
    linkedin?: string
    created_at: Date
    updated_at: Date
  }

  // Company Profiles
  company_profiles: {
    id: string
    user_id: string
    name: string
    description: string
    industry: string
    email: string
    phone: string
    whatsapp?: string
    website?: string
    address: string
    city: string
    state: string
    country: string
    logo?: string
    verified: boolean
    verification_status: 'unverified' | 'pending' | 'verified' | 'rejected'
    created_at: Date
    updated_at: Date
  }

  // Opportunities
  opportunities: {
    id: string
    company_id: string
    title: string
    description: string
    type: 'siwes' | 'internship' | 'industrial_training' | 'externship' | 'placement'
    field: string
    course: string
    specialization: string
    requirements: string
    location: string
    city: string
    state: string
    country: string
    work_arrangement: 'on_site' | 'remote' | 'hybrid'
    deadline: Date
    cv_required: boolean
    stipend?: string
    duration?: string
    contact_email?: string
    contact_phone?: string
    application_url?: string
    verified: boolean
    verification_status: 'unverified' | 'pending' | 'verified' | 'rejected'
    created_at: Date
    updated_at: Date
  }

  // Applications
  applications: {
    id: string
    student_id: string
    opportunity_id: string
    status: 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'withdrawn'
    cover_letter?: string
    cv_url?: string
    applied_at: Date
    updated_at: Date
  }

  // Saved Opportunities
  saved_opportunities: {
    id: string
    student_id: string
    opportunity_id: string
    saved_at: Date
  }

  // Universities
  universities: {
    id: string
    name: string
    state: string
    country: string
    abbreviation: string
    created_at: Date
    updated_at: Date
  }

  // Fields
  fields: {
    id: string
    name: string
    description?: string
    created_at: Date
    updated_at: Date
  }

  // Courses
  courses: {
    id: string
    field_id: string
    name: string
    code: string
    created_at: Date
    updated_at: Date
  }

  // Specializations
  specializations: {
    id: string
    course_id: string
    name: string
    description?: string
    created_at: Date
    updated_at: Date
  }

  // Admin Users
  admin_users: {
    id: string
    user_id: string
    permissions: string[]
    created_at: Date
    updated_at: Date
  }
}

// SQL Initialization Scripts (PostgreSQL)
export const SQL_INIT_SCRIPTS = {
  createTables: `
    -- Users
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'company', 'admin')),
      avatar TEXT,
      email_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Student Profiles
    CREATE TABLE IF NOT EXISTS student_profiles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      university VARCHAR(255),
      level VARCHAR(10),
      field VARCHAR(255),
      course VARCHAR(255),
      specialization VARCHAR(255),
      bio TEXT,
      phone VARCHAR(20),
      linkedin VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Company Profiles
    CREATE TABLE IF NOT EXISTS company_profiles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      industry VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(20),
      whatsapp VARCHAR(20),
      website VARCHAR(255),
      address TEXT,
      city VARCHAR(255),
      state VARCHAR(255),
      country VARCHAR(255),
      logo TEXT,
      verified BOOLEAN DEFAULT FALSE,
      verification_status VARCHAR(50) DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Opportunities
    CREATE TABLE IF NOT EXISTS opportunities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      type VARCHAR(50) NOT NULL CHECK (type IN ('siwes', 'internship', 'industrial_training', 'externship', 'placement')),
      field VARCHAR(255),
      course VARCHAR(255),
      specialization VARCHAR(255),
      requirements TEXT,
      location VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(255),
      country VARCHAR(255),
      work_arrangement VARCHAR(50) DEFAULT 'on_site' CHECK (work_arrangement IN ('on_site', 'remote', 'hybrid')),
      deadline TIMESTAMP,
      cv_required BOOLEAN DEFAULT FALSE,
      stipend VARCHAR(255),
      duration VARCHAR(255),
      contact_email VARCHAR(255),
      contact_phone VARCHAR(20),
      application_url TEXT,
      verified BOOLEAN DEFAULT FALSE,
      verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Applications
    CREATE TABLE IF NOT EXISTS applications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
      opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
      status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'accepted', 'rejected', 'withdrawn')),
      cover_letter TEXT,
      cv_url TEXT,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Saved Opportunities
    CREATE TABLE IF NOT EXISTS saved_opportunities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
      opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
      saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, opportunity_id)
    );

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON student_profiles(user_id);
    CREATE INDEX IF NOT EXISTS idx_company_profiles_user_id ON company_profiles(user_id);
    CREATE INDEX IF NOT EXISTS idx_opportunities_company_id ON opportunities(company_id);
    CREATE INDEX IF NOT EXISTS idx_opportunities_state ON opportunities(state);
    CREATE INDEX IF NOT EXISTS idx_opportunities_field ON opportunities(field);
    CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications(student_id);
    CREATE INDEX IF NOT EXISTS idx_applications_opportunity_id ON applications(opportunity_id);
    CREATE INDEX IF NOT EXISTS idx_saved_opportunities_student_id ON saved_opportunities(student_id);
  `,
}
