import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 bg-white rounded-[3rem] shadow-sm my-10">
      <h1 className="text-4xl font-black tracking-tighter mb-8 text-blue-600">Terms of Service</h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-black mb-2">Usage Agreement</h2>
          <p>By accessing Swift Shop, you agree to follow our community guidelines and fair-use policies.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-black mb-2">Returns & Replacements</h2>
          <p>Items can be returned within 30 days of delivery. Replacements are subject to inventory availability.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;