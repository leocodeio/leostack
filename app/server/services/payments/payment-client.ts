import { authClient } from "../auth/auth-client";
import { PrismaClient } from "@prisma/client";

import { WebhookSubscriptionCanceledPayload } from "@polar-sh/sdk/models/components/webhooksubscriptioncanceledpayload.js";
import { WebhookOrderPaidPayload } from "@polar-sh/sdk/models/components/webhookorderpaidpayload.js";
import { WebhookSubscriptionRevokedPayload } from "@polar-sh/sdk/models/components/webhooksubscriptionrevokedpayload.js";

const prisma = new PrismaClient();

/*
 * checkout
 *  products - the products to checkout
 *  slug - the slug of the product
 *  returns the checkout response
 */
export const checkout = async () => {
  const response = await authClient.checkout({
    products: ["d6fd3bbd-8fae-4302-b4a6-240497c03626"],
    slug: "benificial",
  });
  return response;
};

/**
 * Handles the 'order.paid' webhook event.
 * @param payload - The payload from the webhook.
 * Here data is the order object
 */
export const handleOrderPaid = async (payload: WebhookOrderPaidPayload) => {
  console.log("handleOrderPaid", payload);
  const { data } = payload;
  const { customer, subscription, product } = data;

  try {
    await prisma
      .$transaction(async (tx) => {
        // Create payment record
        await tx.payment.create({
          data: {
            // userId: data.userId,
            // amount: data.amount,
            userId: customer.externalId!,
            amount: data.totalAmount,
            currency: data.currency,
            status: data.status,
            polarOrderId: data.id,
            checkoutId: data.checkoutId,
          },
        });

        // If this is a subscription, create or update the subscription record
        if (subscription) {
          await tx.subscription.upsert({
            where: {
              polarCheckoutId: subscription.checkoutId!,
            },
            create: {
              userId: customer.externalId!,
              planId: product.id,
              planSlug: product.name,
              status: subscription.status,
              startDate: new Date(subscription.startedAt!),
              endDate: new Date(subscription.endedAt!),
              polarCheckoutId: subscription.checkoutId!,
            },
            update: {
              status: subscription.status,
              endDate: new Date(subscription.endedAt!),
            },
          });
        }
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
        throw error;
      })
      .finally(() => {
        console.log("Transaction completed");
      });
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
};

/*
 * handleSubscriptionCanceled
 *  payload - the payload from the webhook
 *  returns the subscription canceled
 *  here data is the subscription object
 */
export const handleSubscriptionCanceled = async (
  payload: WebhookSubscriptionCanceledPayload
) => {
  const { data } = payload;

  await prisma.subscription.update({
    where: { polarCheckoutId: data.checkoutId! },
    data: {
      status: data.status,
      canceledAt: new Date(),
    },
  });
};

/*
 * handleSubscriptionExpired
 *  payload - the payload from the webhook
 *  returns the subscription expired response
 */
export const handleSubscriptionRevoked = async (
  payload: WebhookSubscriptionRevokedPayload
) => {
  const { data } = payload;

  await prisma.subscription.update({
    where: { polarCheckoutId: data.checkoutId! },
    data: {
      status: "expired",
      endDate: new Date(),
    },
  });
};
