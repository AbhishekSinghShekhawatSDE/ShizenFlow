import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.display_name || "there";

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {displayName} 👋</h1>
        <p className="text-muted-foreground">Here's your financial overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Net Savings", value: "₹0", sub: "Start tracking!" },
          { label: "Monthly Income", value: "₹0", sub: "Add your income" },
          { label: "Monthly Expenses", value: "₹0", sub: "Track spending" },
        ].map((card) => (
          <div key={card.label} className="glass-card rounded-2xl p-6">
            <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">
          Start by adding your expenses and income to see your dashboard come alive! 🌱
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
