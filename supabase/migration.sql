-- ============================================================
-- Schema Migration — First-Principles Redesign
-- ============================================================
-- Run this FIRST, then run rls_policies.sql.
--
-- This migration:
--  1. Drops redundant tables (users = duplicate of profiles)
--  2. Adds missing columns to appointments (patient_id, patient_name, doctor_name, etc.)
--  3. Adds missing columns to prescriptions (doctor_id, patient_id)
--  4. Adds foreign key constraints so data integrity is enforced at the DB level
--  5. Adds missing columns to payments (description)
-- ============================================================


-- ────────────────────────────────────────────────
-- 1. DROP REDUNDANT TABLES
--    "users" is a duplicate of "profiles" — profiles is the real one
-- ────────────────────────────────────────────────
DROP TABLE IF EXISTS users;


-- ────────────────────────────────────────────────
-- 2. FIX APPOINTMENTS TABLE
--    Current:  id, doctor_id, name, appointment_date, concern,
--              appointment_time, status, booked_at
--    Target:   id, doctor_id, patient_id, doctor_name, patient_name,
--              appointment_date, appointment_time, concern, status,
--              booked_at, notes
-- ────────────────────────────────────────────────

-- Add the missing columns
ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS patient_id    uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS patient_name  text,
  ADD COLUMN IF NOT EXISTS doctor_name   text,
  ADD COLUMN IF NOT EXISTS notes         text;

-- Rename the old "name" column to avoid confusion (it was storing patient name)
-- Copy existing "name" data into patient_name first, then drop it
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'name'
  ) THEN
    UPDATE appointments SET patient_name = name WHERE patient_name IS NULL;
    ALTER TABLE appointments DROP COLUMN name;
  END IF;
END $$;

-- Add FK for doctor_id if not already referencing
-- (doctor_id already exists but may not have a FK constraint)
-- We skip this if doctors.id is not uuid-linked to auth.users


-- ────────────────────────────────────────────────
-- 3. FIX PRESCRIPTIONS TABLE
--    Current:  id, appointment_id, medicine, notes, created_at
--    Target:   id, appointment_id, doctor_id, patient_id,
--              medicine, notes, created_at
-- ────────────────────────────────────────────────

ALTER TABLE prescriptions
  ADD COLUMN IF NOT EXISTS doctor_id   uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS patient_id  uuid REFERENCES auth.users(id);


-- ────────────────────────────────────────────────
-- 4. FIX PAYMENTS TABLE
--    Current:  id, patient_id, amount, payment_date, status
--    Target:   id, patient_id, amount, description, payment_date, status
-- ────────────────────────────────────────────────

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS description text;


-- ────────────────────────────────────────────────
-- 5. FIX PATIENTS TABLE
--    Current:  id, name, age, gender, phone, email, created_at
--    Target:   add address, blood_group, emergency_contact
-- ────────────────────────────────────────────────

ALTER TABLE patients
  ADD COLUMN IF NOT EXISTS address           text,
  ADD COLUMN IF NOT EXISTS blood_group       text,
  ADD COLUMN IF NOT EXISTS emergency_contact text;


-- ────────────────────────────────────────────────
-- 6. FIX DOCTORS TABLE
--    Current:  id, name, specialization, phone, email, created_at
--    Target:   add department, qualification, experience,
--              consultation_fee, availability, status, photo_url
-- ────────────────────────────────────────────────

ALTER TABLE doctors
  ADD COLUMN IF NOT EXISTS department        text,
  ADD COLUMN IF NOT EXISTS qualification     text,
  ADD COLUMN IF NOT EXISTS experience        text,
  ADD COLUMN IF NOT EXISTS consultation_fee  numeric,
  ADD COLUMN IF NOT EXISTS availability      text DEFAULT 'Available',
  ADD COLUMN IF NOT EXISTS status            text DEFAULT 'Active',
  ADD COLUMN IF NOT EXISTS photo_url         text;


-- ────────────────────────────────────────────────
-- 7. FIX STAFF TABLE
--    Current:  id, name, role, phone, email, department, created_at
--    Target:   add assigned_doctor_id, shift, shift_time, room_number
-- ────────────────────────────────────────────────

ALTER TABLE staff
  ADD COLUMN IF NOT EXISTS assigned_doctor_id uuid,
  ADD COLUMN IF NOT EXISTS shift              text,
  ADD COLUMN IF NOT EXISTS shift_time         text,
  ADD COLUMN IF NOT EXISTS room_number        text;


-- ────────────────────────────────────────────────
-- Done. Now run rls_policies.sql.
-- ────────────────────────────────────────────────
