import CategorySidebar from "../components/category/CategorySidebar";

export default function Dashboard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "270px 1fr",
        gap: 50,
        padding: "0 60px 0 60px",
      }}
    >
      {/* LEFT: All Departments */}
      <CategorySidebar />

      {/* RIGHT: Main content */}
      <div>
        <h1>Dashboard</h1>
        <p>Main content area</p>
      </div>
    </div>
  );
}
