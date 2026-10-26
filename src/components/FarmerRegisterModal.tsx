import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EthiopianBankProvider } from '../types';
import {
  X,
  Tractor,
  ShieldCheck,
  Building,
  Sparkles,
  MapPin,
  CheckCircle2,
  Heart,
  Upload,
  ArrowLeft,
  Smartphone,
} from 'lucide-react';

export const FarmerRegisterModal: React.FC = () => {
  const {
    isFarmerRegisterModalOpen,
    setIsFarmerRegisterModalOpen,
    registerFarmer,
    setActiveTab,
  } = useApp();

  const [farmName, setFarmName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('Central Oromia & Rift Valley Basin');
  const [acres, setAcres] = useState<number>(18);
  const [establishedYear, setEstablishedYear] = useState<number>(2016);
  const [bio, setBio] = useState('');
  const [story, setStory] = useState('');

  // Ethiopian Bank Direct Payout Details
  const [bankProvider, setBankProvider] = useState<EthiopianBankProvider>('telebirr');
  const [bankName, setBankName] = useState('Telebirr Mobile Wallet');
  const [accountNumber, setAccountNumber] = useState('0911 •••• 9201');
  const [accountHolder, setAccountHolder] = useState('');

  // Certifications
  const [certs, setCerts] = useState<string[]>([
    'Certified Organic',
    'Pesticide-Free Certified',
  ]);

  const availableCerts = [
    'Certified Organic',
    'Pesticide-Free Certified',
    'Regenerative Soil Alliance',
    'Naturally Grown Verified',
    'Non-GMO Heirloom Seed',
    'Ethical Free-Range Pasture',
  ];

  if (!isFarmerRegisterModalOpen) return null;

  const toggleCert = (cert: string) => {
    if (certs.includes(cert)) {
      setCerts(certs.filter((c) => c !== cert));
    } else {
      setCerts([...certs, cert]);
    }
  };

  const handleBankProviderChange = (provider: EthiopianBankProvider) => {
    setBankProvider(provider);
    if (provider === 'telebirr') {
      setBankName('Telebirr Mobile Wallet');
      setAccountNumber('0911 •••• 4421');
    } else if (provider === 'commercial_bank_of_ethiopia') {
      setBankName('Commercial Bank of Ethiopia (CBE)');
      setAccountNumber('1000 •••• 8820');
    } else if (provider === 'bank_of_abyssinia') {
      setBankName('Bank of Abyssinia (BOA)');
      setAccountNumber('1829 •••• 3310');
    } else if (provider === 'awash_bank') {
      setBankName('Awash Bank Direct');
      setAccountNumber('0132 •••• 9920');
    }
  };

  const handleFillDemo = () => {
    setFarmName('Debre Zeit Highland Fruit & Crop Farm');
    setName('Solomon Desta & Tigist Haile');
    setPhone('+251 91 144 8821');
    setEmail('solomon@debrezeitcrops.et');
    setLocation('Bishoftu Slopes, Sector 2');
    setAcres(26);
    setEstablishedYear(2013);
    setBio('Family farm producing sweet heirloom carrots, fresh strawberries, and pasture eggs on rich volcanic loam.');
    setStory('Middlemen in city wholesale markets cut our margin to nearly nothing. With Lucy Agriculture Corp and Telebirr direct payments, our family receives 100% of our listing price instantly.');
    setAccountHolder('Solomon Desta Agricultural Enterprise');
  };

  const handleBackToWebsite = () => {
    setIsFarmerRegisterModalOpen(false);
    setActiveTab('marketplace');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName || !name) return;

    registerFarmer({
      farmName,
      name,
      phone: phone || '+251 91 100 0000',
      email: email || 'farmer@lucyagriculture.corp',
      location: location || 'Bishoftu Slopes',
      region,
      distanceKm: Number((4 + Math.random() * 12).toFixed(1)),
      establishedYear: Number(establishedYear) || 2018,
      acres: Number(acres) || 15,
      bio: bio || 'Family owned organic direct producer.',
      story: story || 'Committed to organic agriculture and direct consumer deliveries without middleman cuts.',
      avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=300&q=80',
      coverImage: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80',
      certifications: certs,
      bankAccount: {
        provider: bankProvider,
        bankName,
        accountNumberMasked: accountNumber.includes('•') ? accountNumber : `•••• •••• ${accountNumber.slice(-4)}`,
        accountHolder: accountHolder || name,
        payoutRouting: `Direct ${bankName} Instant Settlement (0% Platform Cut)`,
      },
    });

    setIsFarmerRegisterModalOpen(false);
    setActiveTab('marketplace'); // cleanly navigate back to website / marketplace
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-8">
        {/* Navigation Bar inside Modal with "Back to Website" Button */}
        <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-white">
          <button
            type="button"
            onClick={handleBackToWebsite}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-200 hover:text-white transition-all border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Website / Marketplace</span>
          </button>

          <span className="text-xs font-semibold text-stone-400 hidden sm:inline">
            Direct Producer Onboarding
          </span>

          <button
            type="button"
            onClick={handleBackToWebsite}
            className="p-1 rounded-lg text-stone-400 hover:text-white transition-colors"
            title="Close and return to website"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Banner */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Tractor className="w-5 h-5 text-amber-300" />
              <h2 className="text-xl font-bold font-display">
                Register Your Farm with Lucy Agriculture Corp
              </h2>
            </div>
            <p className="text-xs text-emerald-200">
              Direct Payouts via Telebirr, CBE &amp; Bank of Abyssinia • Keep 100% of your prices.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          {/* Quick Demo Fill Helper */}
          <div className="flex items-center justify-between bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs">
            <span className="text-amber-900 font-semibold">
              Want to test registration quickly?
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-[11px] shadow-xs"
            >
              Fill Sample Farm
            </button>
          </div>

          {/* Section 1: Farm Identification */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              1. Farm Identification &amp; Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Farm Name *
                </label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. Bishoftu Slopes Organic Farm"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Farmer / Family Lead Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Solomon Desta &amp; Tigist Haile"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Direct Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 91 000 0000"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Farm Region &amp; Location *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bishoftu, Hawassa, Sululta, Arsi"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Land Acreage (Acres / Hectares)
                </label>
                <input
                  type="number"
                  value={acres}
                  onChange={(e) => setAcres(Number(e.target.value))}
                  placeholder="e.g. 25"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Established Year
                </label>
                <input
                  type="number"
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(Number(e.target.value))}
                  placeholder="e.g. 2014"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Ethiopian Bank Direct Payout Account */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                2. Direct Ethiopian Settlement Account (0% Fee, 100% Payout)
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Instant Direct Wire
              </span>
            </div>

            {/* Provider Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleBankProviderChange('telebirr')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  bankProvider === 'telebirr'
                    ? 'border-cyan-600 bg-cyan-50 text-cyan-950 font-bold ring-2 ring-cyan-500'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Smartphone className="w-4 h-4 text-cyan-700" />
                <span>Telebirr</span>
              </button>

              <button
                type="button"
                onClick={() => handleBankProviderChange('commercial_bank_of_ethiopia')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  bankProvider === 'commercial_bank_of_ethiopia'
                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-500'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Building className="w-4 h-4 text-purple-700" />
                <span>CBE (Commercial Bank)</span>
              </button>

              <button
                type="button"
                onClick={() => handleBankProviderChange('bank_of_abyssinia')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  bankProvider === 'bank_of_abyssinia'
                    ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Building className="w-4 h-4 text-amber-700" />
                <span>Bank of Abyssinia</span>
              </button>

              <button
                type="button"
                onClick={() => handleBankProviderChange('awash_bank')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  bankProvider === 'awash_bank'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Building className="w-4 h-4 text-emerald-700" />
                <span>Awash / Other</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {bankProvider === 'telebirr' ? 'Telebirr Mobile Number' : 'Bank Account Number'} *
                </label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={bankProvider === 'telebirr' ? '0911 000 000' : '1000 0000 0000'}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Account Holder / Business Name
                </label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="e.g. Solomon Desta Farm Enterprise"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Story & Bio */}
          <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              3. Your Story for Consumers
            </h3>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Farm Bio &amp; Crops Grown
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Briefly describe what your family farm grows..."
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Footer Actions with Clear "Back to Website" and "Submit" */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBackToWebsite}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website / Marketplace</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Complete Registration &amp; Return to Website</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
