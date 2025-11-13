interface SectionHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const SectionHeader = ({ title, description, icon }: SectionHeaderProps) => {
  return (
    <div className="mb-12 text-center max-w-2xl mx-auto">
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};
