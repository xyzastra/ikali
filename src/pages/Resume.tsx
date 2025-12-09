import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Briefcase, GraduationCap, Award, Mail, MapPin, Linkedin } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const Resume = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-4xl">
        <SectionHeader title="Inga K." description="AI Governance Engineer | Federal Policy-to-Code Specialist" />

        {/* Contact Info */}
        <div className="mb-12 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:altruisticxai@gmail.com" className="hover:opacity-70 transition-opacity">
                altruisticxai@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Philadelphia, PA (Hybrid/Remote)</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                linkedin.com/in/ik11
              </a>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-4">Professional Summary</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">AI Governance Engineer with 4+ years of experience translating federal regulatory requirements (NIST AI RMF, FERPA, DoD Instructions) into deployed technical systems.<strong className="text-foreground">Pioneered the 
            "Better Consulting Liaison Service" model</strong>, a rapid deployment framework that bridges the gap 
            between institutional policy and privacy-first AI pilots. Expert in converting complex governance 
            frameworks into functional Proof-of-Concept (POC) pilots and compliance automation tools for the 
            DoD, DIA, DLA, and DOE.
          </p>
        </div>

        {/* Technical & Governance Skills */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
            <Award className="h-7 w-7" />
            Technical & Governance Skills
          </h2>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-serif font-semibold text-lg mb-3">AI Architectures</h3>
                <div className="flex flex-wrap gap-2">
                  {["SME OS (Subject Matter Expert Operating System)", "Open-Source LLMs (Llama, Mistral)", "Swarm Intelligence Protocols", "Biomimetic Networks"].map(skill => <Badge key={skill} variant="outline" className="font-mono text-xs">{skill}</Badge>)}
                </div>
              </div>
              
              <div>
                <h3 className="font-serif font-semibold text-lg mb-3">Demo & Pilot Modules</h3>
                <div className="flex flex-wrap gap-2">
                  {["@QuantumExplorer (Energy Dist.)", "@SolarSage (Swarm Opt.)", "@BioGridder (Adaptive Networks)", "@CyberGridGuru (Autonomous Communities)"].map(skill => <Badge key={skill} variant="outline" className="font-mono text-xs">{skill}</Badge>)}
                </div>
              </div>

              <div>
                <h3 className="font-serif font-semibold text-lg mb-3">Governance Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {["NIST AI Risk Management Framework (RMF)", "Title IX/FERPA Compliance", "DoD Compliance Protocols", "Algorithmic Transparency"].map(skill => <Badge key={skill} variant="outline" className="font-mono text-xs">{skill}</Badge>)}
                </div>
              </div>
              
              <div>
                <h3 className="font-serif font-semibold text-lg mb-3">Security & Cyber</h3>
                <div className="flex flex-wrap gap-2">
                  {["OSINT", "Metasploit", "Burp Suite", "Threat Modeling", "Blockchain Identity Verification"].map(skill => <Badge key={skill} variant="outline" className="font-mono text-xs">{skill}</Badge>)}
                </div>
              </div>

              <div>
                <h3 className="font-serif font-semibold text-lg mb-3">Development</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Rapid Prototyping (4-Week Pilot Sprints)", "Energy Intelligence Dashboarding"].map(skill => <Badge key={skill} variant="outline" className="font-mono text-xs">{skill}</Badge>)}
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
            <Briefcase className="h-7 w-7" />
            Professional Experience
          </h2>
          <CardContent className="space-y-10">
            {/* AltruisticXAI */}
            <div className="border-b border-border pb-8">
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-serif font-semibold text-xl">Lead AI Governance Engineer & Founder</h3>
                  <p className="text-muted-foreground">AltruisticXAI | Philadelphia, PA</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground">Oct 2023 – Present</span>
              </div>
              <p className="text-muted-foreground italic mb-4">
                Spearheading the "Better Consulting Liaison Service," a regenerative innovation platform helping 
                institutions reclaim data sovereignty through privacy-first AI pilots.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Consulting Liaison Service:</strong> Established a proprietary "Liaison" methodology that accelerates government and municipal AI adoption by translating policy constraints into deployed code within <strong className="text-foreground">4-week pilot sprints</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">SME OS Development (Demos):</strong> Architected the "Research Package Registry," a suite of AI modules demonstrating compliance and efficiency:</span>
                </li>
                <li className="ml-6 space-y-1 text-sm">
                  <div>— <strong className="text-foreground">@QuantumExplorer (v2.1.4):</strong> Implemented quantum algorithms for optimized energy distribution.</div>
                  <div>— <strong className="text-foreground">@SolarSage (v2.3.0):</strong> Deployed distributed solar panel optimization using swarm intelligence.</div>
                  <div>— <strong className="text-foreground">@BioGridder (v1.8.2):</strong> Designed nature-inspired adaptive energy networks to mitigate <strong className="text-foreground">60-80% of heat loss</strong>.</div>
                  <div>— <strong className="text-foreground">@CyberGridGuru (v2.0.5):</strong> Modeled self-regulating autonomous energy communities.</div>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">ROI & Impact:</strong> Delivered "Energy Intelligence" strategies targeting <strong className="text-foreground">$212.5k annual savings</strong> (6-8 month payback) and <strong className="text-foreground">7% reduction</strong> in transmission losses.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Compliance Automation:</strong> Automated feasibility assessments for the NIST AI Risk Management Framework, converting 100+ pages of regulation into executable technical specifications.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Infrastructure Optimization:</strong> Integrated open-source LLMs to reduce AI infrastructure costs by <strong className="text-foreground">40%</strong>, eliminating vendor lock-in for "Trust Deficit" environments.</span>
                </li>
              </ul>
            </div>

            {/* DIA & Lockheed Martin */}
            <div className="border-b border-border pb-8">
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-serif font-semibold text-xl">Penetration Tester (Contract)</h3>
                  <p className="text-muted-foreground">Defense Intelligence Agency (DIA) & Lockheed Martin | Washington, DC (Remote)</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground">Nov 2024 – May 2025</span>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Security Validation:</strong> Executed 12+ whitehat penetration tests across DIA and Lockheed Martin networks to validate the security posture of automated defense systems.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Vulnerability Remediation:</strong> Identified <strong className="text-foreground">47 critical vulnerabilities</strong> and delivered remediation roadmaps within a 48-hour SLA, directly supporting the secure deployment of classified technologies.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Risk Communication:</strong> Conducted stakeholder briefings translating technical findings (Metasploit/Burp Suite data) into risk-prioritized action plans for C-suite leadership.</span>
                </li>
              </ul>
            </div>

            {/* Accenture Federal Services */}
            <div className="border-b border-border pb-8">
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-serif font-semibold text-xl">Management Consulting Analyst - Applied Intelligence</h3>
                  <p className="text-muted-foreground">Accenture Federal Services | Washington, DC</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground">Jul 2021 – Oct 2024</span>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">DoD Portfolio Optimization:</strong> Optimized capital project portfolios for the Department of Defense (DoD), achieving a <strong className="text-foreground">30% improvement</strong> in resource utilization through algorithmic analysis and strategic planning.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">DLA Compliance Frameworks:</strong> Collaborated with the Defense Logistics Agency (DLA) to develop robust compliance frameworks, ensuring alignment with federal regulations and enhancing procurement processes.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">DOE Content Strategy:</strong> Designed user-centric interfaces and content strategies for the Department of Energy (energy.gov), significantly increasing user engagement and accessibility compliance.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Operational Cost Reduction:</strong> Conducted deep-dive analysis of CONUS/OCONUS operations, identifying optimization opportunities that resulted in a <strong className="text-foreground">15% reduction</strong> in operational costs.</span>
                </li>
              </ul>
            </div>

            {/* SAP SuccessFactors */}
            <div className="border-b border-border pb-8">
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-serif font-semibold text-xl">Business Analyst</h3>
                  <p className="text-muted-foreground">SAP SuccessFactors | Newtown Square, PA</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground">Dec 2019 – Mar 2021</span>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Data Analysis:</strong> Analyzed customer booking data to identify trends, improving strategic decision-making and operational efficiency by <strong className="text-foreground">25%</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span><strong className="text-foreground">Process Improvement:</strong> Collaborated with IT to streamline data management, achieving a <strong className="text-foreground">30% reduction</strong> in data retrieval time.</span>
                </li>
              </ul>
            </div>

            {/* Amazon */}
            <div>
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-serif font-semibold text-xl">Area Operations Manager</h3>
                  <p className="text-muted-foreground">Amazon</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground">Aug 2019 – Dec 2019</span>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Managed over 100 associates, increasing productivity by <strong className="text-foreground">20%</strong> through new training programs and performance metrics while maintaining a 95% on-time delivery rate.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="h-7 w-7" />
            Education & Certifications
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border pb-8 flex-wrap gap-2">
              <div>
                <h3 className="font-serif font-semibold text-xl">Bachelor of Science, Economics / Engineering</h3>
                <p className="text-muted-foreground">Penn State University</p>
              </div>
              <span className="text-sm font-mono text-muted-foreground">2015 – 2019</span>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {["Advanced Cyber Threat Intelligence (Cybrary)", "Open-Source Intelligence (OSINT) (Udemy)", "MicroStrategy Analyst Certification"].map(cert => <Badge key={cert} variant="outline" className="font-mono text-xs">{cert}</Badge>)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default Resume;