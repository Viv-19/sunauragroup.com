import { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Contact({ settings }) {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    const whatsappNumber = settings?.whatsapp_number || "9204418515";
    const text = `*New Inquiry from SunAura Website*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${text}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Redirecting to WhatsApp...");
    setFormData({ name: "", phone: "", message: "" });
  };


  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600">We're here to help with all your solar and heat pump needs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Phone / WhatsApp</p>
                    <p className="text-gray-700">{settings?.phone || "+91-9204418515"}</p>
                    <p className="text-sm text-gray-500 mt-1">Order product by calling this number</p>
                    <a
                      href={settings?.whatsapp_number ? `https://wa.me/91${settings.whatsapp_number}` : "https://wa.me/919204418515"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 mt-2 text-green-600 hover:text-green-700 font-medium"
                      data-testid="whatsapp-link"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp: +91-{settings?.whatsapp_number || "9204418515"}</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <p className="text-gray-700">{settings?.email || "sunauratec@gmail.com"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Office Address</p>
                    <p className="text-gray-700">{settings?.address || "8th Lane, Sarweshwari Nagar, Bajra, Itki Road, Ranchi"}</p>
                    <p className="text-sm text-gray-500 mt-2">State: Jharkhand, Code: 20</p>
                    <p className="text-sm text-gray-500 mt-1">GSTIN/UIN: 20DZZPS7438M1ZB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full"
                  data-testid="contact-form-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Your phone number"
                  className="w-full"
                  data-testid="contact-form-phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full"
                  data-testid="contact-form-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 rounded-full"
                data-testid="contact-form-submit"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
