interface ItemProps {
  label: string;
}

interface BreadcrumbProps {
  items: ItemProps[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <ul>
      {items.map(({ label }) => (
        <li key={label}>{label}</li>
      ))}
    </ul>
  );
};
