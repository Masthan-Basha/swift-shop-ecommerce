import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 bg-white rounded-[3rem] shadow-sm my-10 border border-gray-50">
      <h1 className="text-4xl font-black tracking-tighter mb-8 text-blue-600">Shipping Policy</h1>
      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-black mb-2">Delivery Timelines</h2>
          <p>We process all orders within 24 hours. Domestic shipping takes 3-5 business days.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-black mb-2">Real-Time Tracking</h2>
          <p>Once shipped, you can track your package directly from your Profile dashboard.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-black mb-2"> Important Note</h2>
          <p>Please ensure your address is correct at checkout. We cannot change the destination once the order is "Shipped".</p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;