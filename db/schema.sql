-- SuperGuest Event Management Platform
-- PostgreSQL Database Schema
-- Created: September 21, 2025

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types for better data integrity
CREATE TYPE event_status AS ENUM ('draft', 'active', 'upcoming', 'completed', 'cancelled', 'sold-out');
CREATE TYPE attendee_status AS ENUM ('registered', 'checked-in', 'cancelled', 'no-show');

-- Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status event_status NOT NULL DEFAULT 'draft',
    
    -- Date and Time Information
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    
    -- Location Information
    location VARCHAR(255) NOT NULL,
    address TEXT,
    venue_capacity INTEGER CHECK (venue_capacity > 0),
    
    -- Registration Information
    max_attendees INTEGER CHECK (max_attendees > 0),
    current_attendees INTEGER DEFAULT 0 CHECK (current_attendees >= 0),
    registration_deadline TIMESTAMP,
    
    -- Financial Information
    ticket_price DECIMAL(10, 2) DEFAULT 0.00,
    total_revenue DECIMAL(12, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Event Requirements (stored as JSONB for flexibility)
    requirements JSONB DEFAULT '{}',
    
    -- Agenda (stored as JSONB array)
    agenda JSONB DEFAULT '[]',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    
    -- Constraints
    CONSTRAINT valid_capacity CHECK (max_attendees <= venue_capacity),
    CONSTRAINT valid_attendees CHECK (current_attendees <= max_attendees)
);

-- Attendees Table
CREATE TABLE attendees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    
    -- Professional Information
    company VARCHAR(255),
    job_title VARCHAR(255),
    industry VARCHAR(100),
    
    -- Registration Information
    status attendee_status NOT NULL DEFAULT 'registered',
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    check_in_time TIMESTAMP WITH TIME ZONE,
    
    -- Event-specific Information
    interests TEXT[],
    networking_goals TEXT,
    past_events TEXT[],
    
    -- Payment Information
    payment_status VARCHAR(20) DEFAULT 'pending',
    amount_paid DECIMAL(10, 2) DEFAULT 0.00,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(event_id, email), -- Prevent duplicate registrations
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') -- Email validation
);

-- Indexes for better performance
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_location ON events(location);
CREATE INDEX idx_attendees_event_id ON attendees(event_id);
CREATE INDEX idx_attendees_email ON attendees(email);
CREATE INDEX idx_attendees_status ON attendees(status);
CREATE INDEX idx_attendees_registration_date ON attendees(registration_date);

-- Grant permissions (adjust as needed for your application)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO your_app_user;