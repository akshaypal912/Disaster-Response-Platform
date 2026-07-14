-- AI Disaster Response Assistant Database Schema
-- Migration: 20260714000000_init.sql
-- Target: Supabase (PostgreSQL)

-- Enable PostGIS extension for spatial queries (necessary for Leaflet mapping and coordinates proximity)
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. PROFILES / COMMANDERS TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'responder' CHECK (role IN ('coordinator', 'responder', 'viewer')),
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. DISASTERS / INCIDENTS TABLE
CREATE TABLE IF NOT EXISTS public.disasters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'EXTREME')),
    status TEXT NOT NULL DEFAULT 'reported' CHECK (status IN ('reported', 'active', 'contained', 'resolved')),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geog GEOGRAPHY(Point, 4326), -- For postgis geographic index queries
    reported_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. LOGISTICAL RESOURCES TABLE
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL, -- e.g. 'medical', 'food', 'rescue_team', 'vehicle'
    title TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    available_quantity INTEGER NOT NULL DEFAULT 1,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geog GEOGRAPHY(Point, 4326),
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'dispatched', 'depleted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EMERGENCY ALERTS / BROADCASTS TABLE
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'SEVERE' CHECK (severity IN ('MODERATE', 'SEVERE', 'EXTREME')),
    target_area TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    published_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SHELTERS TABLE
CREATE TABLE IF NOT EXISTS public.shelters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    occupancy INTEGER NOT NULL DEFAULT 0,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geog GEOGRAPHY(Point, 4326),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'full', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Automatically sync PostGIS geometry points from lat/lng values
CREATE OR REPLACE FUNCTION public.sync_geography_point()
RETURNS TRIGGER AS $$
BEGIN
    NEW.geog := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326)::geography;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Set up triggers for spatial synchronization
CREATE TRIGGER trigger_sync_disasters_geog BEFORE INSERT OR UPDATE ON public.disasters
FOR EACH ROW EXECUTE FUNCTION public.sync_geography_point();

CREATE TRIGGER trigger_sync_resources_geog BEFORE INSERT OR UPDATE ON public.resources
FOR EACH ROW EXECUTE FUNCTION public.sync_geography_point();

CREATE TRIGGER trigger_sync_shelters_geog BEFORE INSERT OR UPDATE ON public.shelters
FOR EACH ROW EXECUTE FUNCTION public.sync_geography_point();

-- Enable Row Level Security (RLS) on all core tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disasters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shelters ENABLE ROW LEVEL SECURITY;

-- Set up accessible RLS policies
-- Profiles: Users can edit their own profiles; everyone can read profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Disasters: Responders/Coordinators can create and write; everyone can view
CREATE POLICY "Disasters are readable by everyone" ON public.disasters
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can report disasters" ON public.disasters
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Only responders and coordinators can update disasters" ON public.disasters
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role IN ('coordinator', 'responder')
        )
    );

-- Logistical Resources: Only coordinators and responders can manage
CREATE POLICY "Resources are readable by everyone" ON public.resources
    FOR SELECT USING (true);
CREATE POLICY "Authorized agents can update resource logistics" ON public.resources
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role IN ('coordinator', 'responder')
        )
    );

-- Alerts & Broadcasts: Only coordinators can create; everyone can read
CREATE POLICY "Alerts are viewable by everyone" ON public.alerts
    FOR SELECT USING (true);
CREATE POLICY "Coordinators can manage broadcasts" ON public.alerts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'coordinator'
        )
    );

-- Shelters: Anyone can view; responders/coordinators can manage capacity
CREATE POLICY "Shelters are readable by everyone" ON public.shelters
    FOR SELECT USING (true);
CREATE POLICY "Responders can update shelter occupancy" ON public.shelters
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role IN ('coordinator', 'responder')
        )
    );
