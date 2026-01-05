import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchSettings();
  }, [navigate]);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API}/settings`);
      setSettings(response.data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!settings.dealer_name || !settings.phone || !settings.email || !settings.address || !settings.whatsapp_number) {
      toast.error("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      await axios.put(`${API}/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Update your contact information and office details</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dealer Name *</label>
            <Input
              value={settings?.dealer_name || ""}
              onChange={(e) => setSettings({ ...settings, dealer_name: e.target.value })}
              placeholder="SunAura"
              data-testid="settings-dealer-name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <Input
              value={settings?.phone || ""}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              placeholder="+91-1234567890"
              data-testid="settings-phone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <Input
              type="email"
              value={settings?.email || ""}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="contact@sunaura.com"
              data-testid="settings-email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number *</label>
            <Input
              value={settings?.whatsapp_number || ""}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              placeholder="911234567890 (without +)"
              data-testid="settings-whatsapp"
            />
            <p className="text-xs text-gray-500 mt-1">Enter number without + or spaces (e.g., 911234567890)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Office Address *</label>
            <Textarea
              value={settings?.address || ""}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="Bokaro, Jharkhand, India"
              rows={3}
              data-testid="settings-address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
            <Textarea
              value={settings?.map_embed_url || ""}
              onChange={(e) => setSettings({ ...settings, map_embed_url: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
              rows={3}
              data-testid="settings-map"
            />
            <p className="text-xs text-gray-500 mt-1">Get the embed URL from Google Maps (Share → Embed a map)</p>
          </div>

          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 rounded-full"
            data-testid="settings-submit"
          >
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
