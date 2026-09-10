import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Crown
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input, Textarea } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../components/ui/toast';
import { fallbackHomeData } from '../data/fallbackData';

const TIERS = [
  {
    id: 'signature',
    name: 'Signature Luxury',
    multiplier: 1.0,
    desc: '5-Star boutique hotels, private local chauffeur, daily artisan breakfast, all monument passes.',
    icon: Sparkles
  },
  {
    id: 'villa',
    name: 'Private Villa & Yacht',
    multiplier: 1.35,
    desc: 'Exclusive private estates/villas, private yacht day charters, dedicated personal butler.',
    icon: Crown
  },
  {
    id: 'imperial',
    name: 'Imperial VIP Access',
    multiplier: 1.75,
    desc: 'Private helicopter transfers, after-hours museum visits, 3-Michelin star dining tables.',
    icon: ShieldCheck
  }
];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToast } = useToast();

  const preselectedTour = location.state?.selectedTour;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    place: preselectedTour?.place || "Amalfi Coast & Capri Yacht Odyssey",
    date: "",
    travelers: location.state?.travelers || 2,
    tier: "signature",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    promoCode: ""
  });

  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Calculate pricing
  const basePricePerPerson = preselectedTour?.price || 185000;
  const currentTier = TIERS.find(t => t.id === formData.tier) || TIERS[0];
  const adjustedPerPerson = Math.round(basePricePerPerson * currentTier.multiplier);
  const rawSubtotal = adjustedPerPerson * formData.travelers;
  const discount = isPromoApplied ? Math.round(rawSubtotal * 0.1) : 0; // 10% promo
  const taxes = Math.round((rawSubtotal - discount) * 0.05); // 5% GST/Taxes
  const finalTotal = rawSubtotal - discount + taxes;

  const handlePromoApply = (e) => {
    e.preventDefault();
    if (formData.promoCode.trim().toUpperCase() === "ODYSSEY10" || formData.promoCode.trim().toUpperCase() === "VIP2026") {
      setIsPromoApplied(true);
      addToast({
        title: "Voucher Applied",
        message: "10% VIP Curator Discount applied to your journey.",
        type: "success"
      });
    } else {
      addToast({
        title: "Invalid Code",
        message: "Try code 'ODYSSEY10' or 'VIP2026' for guest privilege.",
        type: "error"
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refId = "ODY-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setBookingRef(refId);

    const payload = {
      ...formData,
      bookingRef: refId,
      totalAmount: finalTotal,
      createdAt: new Date().toISOString()
    };

    try {
      await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {
      // Offline fallback: Still succeeds locally
    }

    setIsSubmitting(false);
    setBookingSuccess(true);
    addToast({
      title: "Expedition Reserved!",
      message: `Booking Reference ${refId} confirmed. Our private concierge will call you within 2 hours.`,
      type: "success"
    });
  };

  if (bookingSuccess) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl border border-slate-200 p-8 md:p-14 shadow-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={44} />
          </div>

          <Badge variant="gold" className="mb-4">Confirmed VIP Reservation</Badge>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Bon Voyage, {formData.name}!</h2>
          <p className="text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
            Your voyage to <strong>{formData.place}</strong> has been secured under reference code:
          </p>

          <div className="inline-block p-4 rounded-2xl bg-slate-900 text-amber-400 font-mono text-xl font-bold tracking-widest mb-8 border border-amber-400/30">
            {bookingRef}
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Expedition:</span>
              <span className="font-bold text-slate-900">{formData.place}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Travel Date:</span>
              <span className="font-bold text-slate-900">{formData.date || 'Flexible 2026'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Party Size:</span>
              <span className="font-bold text-slate-900">{formData.travelers} Guests ({currentTier.name})</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-base">
              <span className="text-slate-900">Total Investment:</span>
              <span className="text-amber-600">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="luxury" onClick={() => navigate('/')}>
              Return to Expeditions
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              Print Voucher
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="booking-page-container max-w-7xl">
      <div className="booking-header">
        <Badge variant="gold" className="mb-2">Curated Reservation</Badge>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">
          Plan Your Bespoke Expedition
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Customize every parameter of your trip. No payment is required until your private itinerary is finalized with our master curator.
        </p>
      </div>

      {/* Stepper */}
      <div className="booking-stepper">
        {[
          { num: 1, label: "Journey & Dates" },
          { num: 2, label: "Party & Luxury Tier" },
          { num: 3, label: "Guest Information" }
        ].map((s) => (
          <div key={s.num} className={`step-item ${step === s.num ? 'active' : ''}`}>
            <span className="step-num">{s.num}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="booking-layout">
        {/* Main Step Form */}
        <div className="booking-card">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">Step 1: Choose Your Journey & Travel Window</h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Select Expedition Destination
                  </label>
                  <select
                    value={formData.place}
                    onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold text-sm outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    {fallbackHomeData.featuredTours.map((t) => (
                      <option key={t.id} value={t.place}>
                        {t.place} ({t.duration})
                      </option>
                    ))}
                    <option value="Custom Private Expedition">Custom Private Charter / Multi-Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Preferred Departure Date
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <span className="text-xs text-slate-400 mt-1 block">
                    Dates are 100% flexible up to 21 days before departure.
                  </span>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    variant="luxury"
                    size="lg"
                    onClick={() => {
                      if (!formData.date) {
                        addToast({ title: "Select a Date", message: "Please choose your intended travel date.", type: "error" });
                        return;
                      }
                      setStep(2);
                    }}
                  >
                    Continue to Experience Tier <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">Step 2: Guests & Experience Tier</h3>

                {/* Travelers Counter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Total Travelers in Your Party
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                      className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 text-xl font-bold border-none cursor-pointer hover:bg-slate-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-black text-slate-900 w-12 text-center">
                      {formData.travelers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
                      className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 text-xl font-bold border-none cursor-pointer hover:bg-slate-200 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-slate-500 font-medium">
                      {formData.travelers === 1 ? 'Solo Adventurer' : formData.travelers === 2 ? 'Couple' : 'Private Group'}
                    </span>
                  </div>
                </div>

                {/* Tiers */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Choose Your Luxury Curation Tier
                  </label>
                  <div className="space-y-3">
                    {TIERS.map((tier) => {
                      const Icon = tier.icon;
                      const isSelected = formData.tier === tier.id;
                      return (
                        <div
                          key={tier.id}
                          onClick={() => setFormData({ ...formData, tier: tier.id })}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/40 shadow-md'
                              : 'border-slate-100 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                            <Icon size={22} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-base font-bold text-slate-900 m-0">{tier.name}</h4>
                              {isSelected && <Badge variant="gold">Selected</Badge>}
                            </div>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tier.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft size={16} /> Back
                  </Button>
                  <Button variant="luxury" size="lg" onClick={() => setStep(3)}>
                    Continue to Guest Details <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">Step 3: Primary Guest Information</h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Legal Name
                      </label>
                      <Input
                        placeholder="Lord / Lady / Mr / Ms..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Private Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="alex@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Direct Telephone / WhatsApp
                    </label>
                    <Input
                      placeholder="+91 98765 43210 or +1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Special Requests, Anniversaries or Dietary Nuances
                    </label>
                    <Textarea
                      placeholder="e.g. Honeymoon sunset champagne, vegetarian Michelin tasting, private helicopter transfer..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <Button variant="ghost" onClick={() => setStep(2)}>
                      <ArrowLeft size={16} /> Back
                    </Button>
                    <Button
                      variant="luxury"
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                      className="font-bold shadow-glow"
                    >
                      {isSubmitting ? "Dispatching..." : "Confirm & Reserve Expedition"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Summary Card */}
        <div className="summary-card">
          <h3 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
            Voyage Investment
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Destination:</span>
              <span className="font-bold text-slate-900 text-right max-w-[160px] truncate">{formData.place}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Travel Window:</span>
              <span className="font-semibold text-slate-800">{formData.date || 'To be scheduled'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Travelers:</span>
              <span className="font-semibold text-slate-800">{formData.travelers} Persons</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Tier:</span>
              <span className="font-semibold text-amber-600">{currentTier.name}</span>
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Base ({formData.travelers} × {formatPrice(adjustedPerPerson)}):</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>

              {isPromoApplied && (
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span>VIP Curator Promo (10%):</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-slate-500">
                <span>Heritage & Habitat Conservation (5%):</span>
                <span>{formatPrice(taxes)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-3 border-t border-slate-200">
              <form onSubmit={handlePromoApply} className="flex gap-2">
                <Input
                  placeholder="Promo Code (ODYSSEY10)"
                  value={formData.promoCode}
                  onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                  className="text-xs h-9"
                />
                <Button variant="outline" size="sm" type="submit">
                  Apply
                </Button>
              </form>
            </div>

            <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-baseline">
              <span className="font-black text-slate-900 text-base">Estimated Total:</span>
              <span className="font-black text-2xl text-slate-900 font-heading">
                {formatPrice(finalTotal)}
              </span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 text-xs flex items-start gap-2 mt-4">
              <ShieldCheck size={16} className="shrink-0 text-emerald-600 mt-0.5" />
              <span>Zero cancellation penalties up to 21 days prior to departure.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;