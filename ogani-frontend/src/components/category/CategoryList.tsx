import { type ICategory } from "../../services/category";

type Props = {
  categories: ICategory[];
  onSelect?: (id: number) => void;
};

export default function CategoryList({ categories, onSelect }: Props) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {categories.map((c) => (
        <li
          key={c.id}
          style={{
            padding: "8px 0",
            cursor: "pointer",
          }}
          onClick={() => onSelect?.(c.id)}
        >
          {c.name}
        </li>
      ))}
    </ul>
  );
}
