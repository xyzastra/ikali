interface SectionHeaderProps {
  title: string;
  description: string;
}
export const SectionHeader = ({
  title,
  description
}: SectionHeaderProps) => {
  return <div className="mb-20 max-w-3xl">
      <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">{title}</h1>
      
    </div>;
};