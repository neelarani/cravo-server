// controllers/webhook.controller.ts
import Stripe from 'stripe';
import * as service from './service';

export const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      await service.Webhook.completeCheckout(session);
      break;
    }

    default:
      console.log('Unhandled event', event.type);
  }
};
