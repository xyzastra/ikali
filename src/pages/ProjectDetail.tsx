import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample project data - in a real app, this would come from a database or API
const projects = {
  "1": {
    id: "1",
    title: "Campus Energy Automation",
    description: "Deploying smart metering infrastructure across university facilities to reduce energy costs by 34% while creating student-led monitoring programs.",
    date: "2025-03-15",
    tags: ["IoT", "Energy Policy", "Education"],
    content: `
## The Challenge

Universities face a dual problem: aging energy infrastructure driving up operational costs, and students disconnected from sustainability efforts happening around them. Traditional building automation systems are expensive, proprietary, and offer zero educational value.

## Our Approach

We deployed a distributed network of open-source smart meters across three campus buildings, integrated with a student-accessible dashboard that transforms energy data into actionable insights.

### Technical Implementation

- **Hardware Layer**: Custom metering units using ESP32 microcontrollers with CT clamps for non-invasive current monitoring
- **Data Pipeline**: MQTT-based telemetry feeding into a time-series database (TimescaleDB)
- **Visualization**: React dashboard with real-time charts and historical analysis
- **Policy Integration**: Automated reporting aligned with NJ state energy disclosure requirements

### Student Engagement Model

Rather than treating students as passive observers, we structured the program around active participation:

- Engineering students calibrate and maintain hardware
- Data science students build predictive models for consumption patterns
- Policy students analyze compliance pathways and write recommendation reports
- Business students develop cost-benefit analyses for expansion

## Results

After 8 months of operation:

- **34% reduction** in energy costs across monitored buildings
- **47 students** directly involved in program operations
- **3 peer-reviewed papers** submitted by student research teams
- **$180K projected savings** if expanded campus-wide

## Policy Impact

The project data directly informed the university's 2025 Climate Action Plan and served as a model for proposed state legislation on educational institution energy transparency.

## Lessons Learned

The biggest insight wasn't technical—it was organizational. Success required breaking down silos between facilities management, academic departments, and administration. The technology was the easy part; the human coordination took real work.

## Next Steps

We're currently negotiating with two additional NJ universities to replicate the model, with a focus on creating a shared data consortium that could inform state-level policy decisions.
    `,
  },
  "2": {
    id: "2",
    title: "Academic Matchmaking Platform",
    description: "Connecting student innovators with faculty mentors and industry partners through intelligent matching algorithms and structured collaboration frameworks.",
    date: "2025-02-20",
    tags: ["EdTech", "Matching Algorithms", "Innovation"],
    content: `
## Problem Statement

Universities have untapped potential sitting in silos. A mechanical engineering student with a breakthrough idea has no systematic way to find the materials science professor who could help, or the local manufacturer who needs exactly that innovation. Traditional networking relies on chance encounters and existing relationships.

## Solution Architecture

We built a platform that treats academic collaboration like a market—matching supply (expertise, resources, problems) with demand (ideas, skills, ambition) through structured profiles and intelligent recommendations.

### Core Features

- **Multi-dimensional Profiles**: Beyond simple bios—structured data on research interests, available resources, collaboration preferences, and past project outcomes
- **Weighted Matching Algorithm**: Considers expertise alignment, availability, collaboration style compatibility, and institutional constraints
- **Structured Onboarding**: Guided workflows for initiating collaborations with clear expectations and milestones
- **Outcome Tracking**: Longitudinal data on collaboration success rates to continuously improve matching

### Technical Stack

- **Frontend**: React with TypeScript, emphasizing accessibility and mobile-first design
- **Backend**: Node.js API with PostgreSQL for structured data, Elasticsearch for semantic search
- **ML Pipeline**: Python-based recommendation engine using collaborative filtering enhanced with domain-specific features
- **Integration Layer**: Connectors to university systems (course catalogs, research databases, HR systems)

## Pilot Results

Deployed across the engineering and business schools for one semester:

- **156 active users** (89 students, 42 faculty, 25 industry partners)
- **34 new collaborations** initiated through the platform
- **8 projects** advanced to external funding applications
- **2 patent disclosures** filed from platform-facilitated teams

## User Feedback Highlights

Faculty consistently reported that the structured onboarding reduced the friction of taking on new student collaborators. Students valued the transparency—knowing upfront what a professor expected made initial conversations more productive.

Industry partners appreciated the curation. Instead of fielding random cold emails, they received targeted introductions to students whose interests genuinely aligned with their needs.

## Challenges Encountered

- **Cold Start Problem**: Early adoption required manual seeding of high-quality profiles to demonstrate value
- **Privacy Concerns**: Faculty were initially hesitant to share availability data; solved through granular privacy controls
- **Institutional Politics**: Some departments viewed cross-disciplinary matching as threatening to traditional advising relationships

## Expansion Plans

Currently working with university administration to integrate the platform into the official innovation ecosystem, with dedicated staff support and mandatory onboarding for new faculty hires in STEM departments.
    `,
  },
  "3": {
    id: "3",
    title: "NJ Energy Supplier Integration",
    description: "Building API infrastructure to connect distributed energy resources with state-level grid management systems and compliance reporting.",
    date: "2025-01-10",
    tags: ["Energy", "API Design", "Policy Tech"],
    content: `
## Context

New Jersey's energy landscape is fragmenting. Distributed solar, battery storage, and demand response programs are proliferating, but the technical infrastructure to coordinate these resources with grid operators and regulators hasn't kept pace.

## Project Scope

Designed and implemented an API layer that standardizes communication between distributed energy resources and state regulatory systems, enabling real-time compliance verification and grid coordination.

### Key Deliverables

- RESTful API specification for energy resource registration and telemetry
- Reference implementation for common inverter and battery management systems
- Compliance verification module aligned with NJ BPU requirements
- Documentation and onboarding materials for third-party developers

## Impact

The infrastructure now supports 12 energy service providers representing over 400MW of distributed capacity, with automated compliance reporting that reduced administrative burden by an estimated 60%.
    `,
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = id ? projects[id as keyof typeof projects] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-8 py-24 max-w-4xl text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-4xl">
        <Link to="/projects" className="inline-flex items-center text-sm mb-8 hover:opacity-60 transition-opacity uppercase tracking-widest">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <article>
          <header className="mb-12 pb-8 border-b border-border">
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-mono mb-4">
              <time dateTime={project.date}>
                {new Date(project.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-mono uppercase tracking-wider">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {project.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('##')) {
                return (
                  <h2 key={index} className="text-3xl font-serif font-bold mt-12 mb-4">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                );
              }
              if (paragraph.trim().startsWith('-')) {
                return (
                  <li key={index} className="ml-6 my-2">
                    {paragraph.replace('-', '').trim()}
                  </li>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-6 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </article>
      </main>
    </div>
  );
};

export default ProjectDetail;
