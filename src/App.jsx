import React, { useState } from 'react';
import './App.css'

function App() {
  const [productId, setProductId] = useState('');
  const [planId, setPlanId] = useState('');
  const [agreementId, setAgreementId] = useState('');
  const [status, setStatus] = useState('');

  async function createProduct() {
    const res = await fetch('/api/create-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sample Product',
        description: 'Demo product for PayPal Billing',
        type: 'SERVICE',
        category: 'SOFTWARE',
      })
    });
    const data = await res.json();
    setProductId(data.id);
    setStatus('Product created!');
  }

  async function createPlan() {
    if (!productId) {
      setStatus('Create a product first!');
      return;
    }
    const res = await fetch('/api/create-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: productId,
        name: 'Split Payment Plan',
        billing_cycles: [
          {
            frequency: { interval_unit: 'DAY', interval_count: 1 },
            tenure_type: 'TRIAL',
            sequence: 1,
            total_cycles: 1,
            pricing_scheme: { fixed_price: { value: '5', currency_code: 'USD' } }
          },
          {
            frequency: { interval_unit: 'DAY', interval_count: 20 },
            tenure_type: 'REGULAR',
            sequence: 2,
            total_cycles: 1,
            pricing_scheme: { fixed_price: { value: '5', currency_code: 'USD' } }
          }
        ],
        payment_preferences: { auto_bill_outstanding: true }
      })
    });
    const data = await res.json();
    setPlanId(data.id);
    setStatus('Plan created!');
  }

  async function createAgreement() {
    const res = await fetch('/api/create-agreement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan_id: planId })
    });
    const data = await res.json();
    setAgreementId(data.id);
    setStatus('Agreement created! Approve in PayPal.');
    window.open(data.links.find(l => l.rel === 'approve').href, '_blank');
  }

  async function executeAgreement() {
    const res = await fetch('/api/execute-agreement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agreementId })
    });
    const data = await res.json();
    setStatus('Agreement executed!');
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>PayPal Billing Agreement Sample</h2>
      <button onClick={createProduct}>Create Product</button>
      <br /><br />
      <button onClick={createPlan} disabled={!productId}>Create Plan</button>
      <br /><br />
      <button onClick={createAgreement} disabled={!planId}>Create Agreement</button>
      <br /><br />
      <button onClick={executeAgreement} disabled={!agreementId}>Execute Agreement</button>
      <br /><br />
      <div>Status: {status}</div>
    </div>
  );
}

export default App;
