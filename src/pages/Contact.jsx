import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-[var(--font-display)] text-2xl font-bold">
            Contact Us
          </h1>
          <p className="text-sm text-muted mt-1">Get in touch with SIP</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-sm mb-4">Visit Us</h2>
              <div className="space-y-3">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "F-8/3, Islamabad",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+92 XXX XXXXXXX",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@sipcoffee.pk",
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Daily: 8:00 AM - 1:00 AM",
                  },
                ].map((info) => (
                  <div key={info.label} className="flex gap-3">
                    <div className="w-8 h-8 bg-olive/10 rounded-lg flex items-center justify-center shrink-0">
                      <info.icon size={14} className="text-olive" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">{info.label}</p>
                      <p className="text-sm font-medium whitespace-pre-line">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://www.instagram.com/sipcoffee.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Instagram size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">@sipcoffee.pk</p>
                <p className="text-xs text-muted">Follow us on Instagram</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-sm mb-4">Send a Message</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent! We'll get back to you soon.");
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-gray-300"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-gray-300"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-gray-300"
                required
              />
              <textarea
                placeholder="Your message..."
                rows={4}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-gray-300 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-brand text-white py-2.5 rounded-lg text-sm font-medium hover:bg-brand-light transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
