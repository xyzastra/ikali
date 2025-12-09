-- Create content_projects table for portfolio projects
CREATE TABLE public.content_projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    published_date DATE,
    tags TEXT[] DEFAULT '{}',
    cover_image_url TEXT,
    reading_time INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create journal_entries table
CREATE TABLE public.journal_entries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    published_date DATE,
    tags TEXT[] DEFAULT '{}',
    reading_time INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create idea_dumps table
CREATE TABLE public.idea_dumps (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    published_date DATE,
    tags TEXT[] DEFAULT '{}',
    reading_time INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.content_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_dumps ENABLE ROW LEVEL SECURITY;

-- Create public read policies (portfolio content is public)
CREATE POLICY "Anyone can view projects" 
ON public.content_projects 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view journal entries" 
ON public.journal_entries 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view idea dumps" 
ON public.idea_dumps 
FOR SELECT 
USING (true);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_content_projects_updated_at
    BEFORE UPDATE ON public.content_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at
    BEFORE UPDATE ON public.journal_entries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_idea_dumps_updated_at
    BEFORE UPDATE ON public.idea_dumps
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial data for projects
INSERT INTO public.content_projects (title, description, content, published_date, tags, reading_time) VALUES
('Campus Energy Metering System', 'Designing and deploying real-time energy monitoring across 47 buildings, enabling data-driven sustainability decisions.', '## Overview

The Campus Energy Metering System represents a comprehensive approach to energy monitoring and management across a large university campus. This project involved deploying smart meters across 47 buildings and creating a unified dashboard for real-time energy analytics.

## Technical Implementation

- **Hardware**: Installation of 200+ IoT-enabled smart meters
- **Data Pipeline**: Real-time data streaming using MQTT protocol
- **Storage**: Time-series database for efficient energy data storage
- **Frontend**: React-based dashboard with interactive visualizations

## Key Achievements

1. 15% reduction in campus energy consumption
2. Real-time anomaly detection for equipment failures
3. Predictive maintenance scheduling based on usage patterns', '2025-05-01', ARRAY['Energy', 'IoT', 'Sustainability'], 8),

('Academic-Industry Matchmaking Platform', 'Building a two-sided marketplace connecting student researchers with industry problems, featuring skill-based matching algorithms.', '## The Challenge

Universities have untapped research potential, while industries struggle to find specialized talent for specific projects. This platform bridges that gap.

## Solution Architecture

- **Matching Algorithm**: ML-based skill matching with 89% accuracy
- **Verification System**: Academic credential verification via university APIs
- **Project Management**: Built-in milestone tracking and deliverables management

## Impact

- 150+ successful project matches in first semester
- Average project completion rate: 87%
- Student satisfaction score: 4.7/5', '2025-04-15', ARRAY['EdTech', 'Marketplace', 'AI'], 6),

('Decentralized Campus Governance Tool', 'Exploring blockchain-based voting and proposal systems for transparent student government decision-making.', '## Vision

Creating a transparent, tamper-proof system for campus governance decisions using blockchain technology.

## Technical Stack

- **Blockchain**: Ethereum L2 (Polygon) for low gas fees
- **Smart Contracts**: Solidity-based voting contracts
- **Frontend**: Web3-enabled React application
- **Identity**: University SSO integration for voter verification

## Features

1. Proposal submission and discussion
2. Quadratic voting for fair representation
3. Transparent fund allocation tracking
4. Immutable decision records', '2025-03-10', ARRAY['Blockchain', 'Governance', 'Web3'], 7);

-- Seed initial data for journal entries
INSERT INTO public.journal_entries (title, description, content, published_date, tags, reading_time) VALUES
('Strategy: Bottom-Up Energy Adoption', 'Observations on how grassroots movements within academic departments can accelerate sustainable energy adoption faster than top-down mandates.', '## The Observation

After months of observing campus energy initiatives, a clear pattern emerged: successful adoption rarely comes from administrative mandates alone.

## Key Insights

### Department Champions Matter
- Individual faculty members who champion sustainability create ripple effects
- Their influence extends beyond their immediate sphere

### Student Involvement is Critical
- Students bring fresh perspectives and energy (pun intended)
- They''re often more willing to experiment with new technologies

## Recommendations

1. Identify and support department-level sustainability champions
2. Create student ambassador programs
3. Celebrate small wins publicly to build momentum', '2025-05-20', ARRAY['Strategy', 'Energy', 'Adoption'], 6),

('Policy: Data Sharing in Academia', 'Exploring the tension between open science principles and institutional data protection requirements in cross-university collaborations.', '## The Dilemma

Open science advocates for transparent data sharing, but institutions have legitimate concerns about data protection, competitive advantage, and compliance.

## Current Landscape

### Barriers to Sharing
- FERPA compliance requirements
- Institutional liability concerns
- Lack of standardized data formats

### Opportunities
- Federated learning approaches
- Anonymization techniques
- Data use agreements that protect while enabling

## Proposed Framework

A tiered approach to data sharing based on sensitivity levels and use cases.', '2025-04-08', ARRAY['Policy', 'Data', 'Open Science'], 5),

('Reflection: What Makes Projects Succeed', 'Personal reflections on patterns observed across successful and failed campus innovation initiatives over two years.', '## Looking Back

Two years of observing campus innovation projects have revealed consistent patterns in what separates successful initiatives from failed ones.

## Success Factors

1. **Clear Problem Definition**: Projects that start with a well-defined problem outperform those chasing solutions
2. **Stakeholder Buy-in**: Early involvement of key stakeholders correlates with completion
3. **Incremental Delivery**: Small, frequent wins build momentum and trust

## Common Failure Modes

- Scope creep without corresponding resource increases
- Technology-first thinking without user validation
- Underestimating institutional inertia

## Personal Takeaways

The most important lesson: relationships matter more than technology. Building trust takes time but pays dividends.', '2025-02-28', ARRAY['Reflection', 'Leadership', 'Innovation'], 4);

-- Seed initial data for idea dumps
INSERT INTO public.idea_dumps (title, description, content, published_date, tags, reading_time) VALUES
('State-Level Energy Policy Framework', 'Exploring legislative models that incentivize universities to adopt localized energy management without federal dependency.', '## The Idea

What if state-level legislation could create incentives for universities to develop independent energy management systems?

## Key Components

### Incentive Structures
- Tax credits for on-campus renewable installations
- Reduced utility rates for institutions meeting efficiency targets
- Grants for pilot programs in energy innovation

### Regulatory Framework
- Standardized reporting requirements
- Inter-institution energy trading allowances
- Streamlined permitting for campus microgrids

## Potential Challenges

- Utility company resistance
- Budget constraints at state level
- Varying political climates across states

## Next Steps

Research existing state-level programs and identify best practices.', '2025-04-05', ARRAY['Policy', 'Energy', 'Legislation'], 4),

('Student-Powered Manufacturing', 'Scaling the academic matchmaking model to manufacturing partnerships. Credit-based work replacing traditional internships.', '## Concept

What if we could reimagine the relationship between universities and manufacturers?

## The Model

### For Students
- Earn academic credit while solving real manufacturing challenges
- Build portfolio of tangible outcomes
- Network with industry professionals

### For Manufacturers
- Access to fresh perspectives and emerging skills
- Low-risk project execution
- Pipeline for future talent recruitment

## Implementation Ideas

1. Manufacturing lab on campus with industry-donated equipment
2. Rotating faculty advisors with industry experience
3. Project-based curriculum replacing some traditional coursework

## Questions to Explore

- How to ensure quality control?
- What liability frameworks are needed?
- How to scale beyond pilot programs?', '2025-03-22', ARRAY['Education', 'Manufacturing', 'Innovation'], 3),

('Metered Hardware Standards', 'Proposing open standards for campus metering devices to enable cross-institutional data sharing without vendor lock-in.', '## The Problem

Every campus uses different metering hardware with proprietary data formats. This makes cross-institutional collaboration nearly impossible.

## Proposed Solution

An open standard for campus metering devices that includes:

### Data Format Specification
- Common JSON schema for energy data
- Standardized timestamp formats
- Unified measurement units

### Communication Protocol
- MQTT-based real-time streaming
- RESTful API for historical data
- Webhook support for alerts

### Hardware Requirements
- Minimum accuracy specifications
- Calibration standards
- Security requirements

## Benefits

1. Vendor independence
2. Cross-campus benchmarking
3. Shared research datasets
4. Reduced integration costs

## Adoption Strategy

Start with a consortium of 5-10 interested universities and build from there.', '2025-02-15', ARRAY['Hardware', 'Standards', 'Open Source'], 5);