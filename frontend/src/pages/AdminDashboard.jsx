import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Package, FolderOpen, MessageSquare, Settings, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const cards = [
    {
      title: "Products",
      description: "Manage your product catalog",
      icon: Package,
      link: "/admin/products",
      color: "bg-blue-500"
    },
    {
      title: "Projects",
      description: "Showcase completed projects",
      icon: FolderOpen,
      link: "/admin/projects",
      color: "bg-green-500"
    },
    {
      title: "Messages",
      description: "View customer inquiries",
      icon: MessageSquare,
      link: "/admin/messages",
      color: "bg-purple-500"
    },
    {
      title: "Settings",
      description: "Update contact information",
      icon: Settings,
      link: "/admin/settings",
      color: "bg-red-500"
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Manage your website content here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.link)}
            className="bg-white p-6 rounded-2xl shadow-lg hover-lift cursor-pointer group"
            data-testid={`dashboard-card-${card.title.toLowerCase()}`}
          >
            <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
        <div className="flex items-center space-x-4">
          <TrendingUp className="w-12 h-12 text-red-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Quick Tip</h2>
            <p className="text-gray-700">Keep your products and projects updated to showcase your latest work to potential customers.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
