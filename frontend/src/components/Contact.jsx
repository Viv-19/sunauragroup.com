import { useState } from "react";
import { Phone, MapPin, MessageSquare, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Contact({ settings }) {
  const [formData, setFormData] = useState({ name: "", phone: "", city: "Ranchi", message: "" });

  const getCleanWhatsAppNumber = () => {
    let num = settings?.whatsapp_number || "9204418515";
    num = num.replace(/\D/g, "");
    if (num.length === 10) {
      num = "91" + num;
    }
    return num;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    const whatsappNumber = getCleanWhatsAppNumber();
    const text = `*New Inquiry from SunAura.co.in*
• *Name:* ${formData.name}
• *Phone:* ${formData.phone}
• *Area:* ${formData.city || 'Ranchi'}
• *Requirement:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp...");
    setFormData({ name: "", phone: "", city: "Ranchi", message: "" });
  };

  return (
    <section id="contact" className="py-16 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Store & Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Visit Store or Order Online
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Same-day home delivery across Ranchi and express dispatch throughout Jharkhand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Store & Warehouse</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="bg-red-50 p-2.5 rounded-xl text-red-600 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                    <p className="text-base font-bold text-gray-900">{settings?.phone || "+91-9204418515"}</p>
                    <p className="text-[11px] text-gray-500">Mon - Sat: 9:30 AM – 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600 flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">WhatsApp</p>
                    <a
                      href={`https://wa.me/${getCleanWhatsAppNumber()}?text=${encodeURIComponent('Hello SunAura, I need assistance with an order.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1 text-sm"
                    >
                      <span>+91 9204418515</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">Active</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Address</p>
                    <p className="text-xs font-semibold text-gray-900 leading-relaxed">
                      {settings?.address || "8th Lane, Sarweshwari Nagar, Bajra, Itki Road, Ranchi - 834005"}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">GSTIN: {settings?.gstin || "20DZZPS7438M1ZB"}</p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                  <Truck className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span className="text-[11px]">Ranchi Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="text-[11px]">Genuine Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Quick WhatsApp Inquiry</h3>
              <p className="text-gray-500 text-xs mb-5">
                Send your requirement to receive pricing, stock confirmation, and delivery estimate.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full rounded-xl text-xs py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full rounded-xl text-xs py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Location in Ranchi / Jharkhand
                  </label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Bariatu / Kanke / Morabadi / Jamshedpur"
                    className="w-full rounded-xl text-xs py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Requirement / Model Needed *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Need 25L Racold Omnis DG geyser with doorstep delivery to Ranchi."
                    rows={3}
                    className="w-full rounded-xl text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-xl text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Send via WhatsApp</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
