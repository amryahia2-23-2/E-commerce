// Test Webhook Script
// استخدم هذا السكريبت لاختبار الـ webhook محلياً

const testWebhook = async () => {
    const testPayload = {
        id: "evt_test_webhook",
        object: "event",
        type: "checkout.session.completed",
        data: {
            object: {
                id: "cs_test_123",
                object: "checkout.session",
                amount_total: 5000,
                currency: "usd",
                customer_email: "test@example.com",
                metadata: {
                    orderNumber: "TEST-ORDER-123",
                    customerName: "Test User",
                    customerEmail: "test@example.com",
                    clerkUserId: "user_test_123",
                    address: JSON.stringify({
                        name: "Test Address",
                        address: "123 Test St",
                        city: "Test City",
                        state: "Test State",
                        zip: "12345"
                    })
                },
                payment_intent: "pi_test_123",
                payment_status: "paid",
                status: "complete",
                total_details: {
                    amount_discount: 0,
                    amount_shipping: 0,
                    amount_tax: 0
                }
            }
        }
    };

    try {
        const response = await fetch('http://localhost:3000/api/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'stripe-signature': 'test_signature'
            },
            body: JSON.stringify(testPayload)
        });

        const result = await response.json();
        console.log('Response:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

testWebhook();
