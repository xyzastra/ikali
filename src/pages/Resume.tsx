import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { FileText, Briefcase, GraduationCap, Award, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Resume = () => {
  return (
    <div className="min-h-screen bg-content">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <SectionHeader
          title="Resume"
          description="Professional experience, technical skills, and achievements in software development."
          icon={<FileText className="h-16 w-16 text-accent" />}
        />

        {/* Contact Info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>your.email@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Your Location</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Passionate developer with expertise in building modern web applications. Focused on creating 
              clean, maintainable code and delivering exceptional user experiences. Strong advocate for 
              continuous learning and knowledge sharing.
            </p>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">Software Developer</h3>
                  <p className="text-muted-foreground">Company Name</p>
                </div>
                <span className="text-sm text-muted-foreground">2022 - Present</span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Developed and maintained full-stack web applications</li>
                <li>Collaborated with cross-functional teams to deliver features</li>
                <li>Improved application performance by 40%</li>
              </ul>
            </div>
            
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">Junior Developer</h3>
                  <p className="text-muted-foreground">Previous Company</p>
                </div>
                <span className="text-sm text-muted-foreground">2020 - 2022</span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Built responsive user interfaces with React</li>
                <li>Integrated RESTful APIs and third-party services</li>
                <li>Participated in code reviews and agile ceremonies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Bachelor of Science in Computer Science</h3>
                <p className="text-muted-foreground">University Name</p>
              </div>
              <span className="text-sm text-muted-foreground">2016 - 2020</span>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "TypeScript", "Python", "HTML", "CSS"].map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Frameworks & Libraries</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "Express", "Tailwind CSS", "Next.js"].map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {["Git", "Docker", "AWS", "PostgreSQL", "MongoDB"].map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Resume;
