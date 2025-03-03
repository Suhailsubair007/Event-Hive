import type React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QyQmyQEbmBrayFW2R6XPL0s157RRkZQemdiWowp84f3X3VY2kN9K4lDFiMIWPrYpBnxpFVMcckLNzgyH1UjyBvE00w2DPwDm8"
);

const GrandHostPromo: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    if (!stripe) return;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "price_1QyXPVQEbmBrayFWKrmkdEjR", quantity: 1 }], 
      mode: "payment",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      console.error("Stripe Checkout Error:", error);
    }

    setLoading(false);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, delay: 0.5 },
    },
  };

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 min-h-screen flex items-center justify-center p-4 sm:p-8">
      <motion.div
        className="max-w-7xl w-full rounded-3xl overflow-hidden shadow-2xl bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Content Section */}
          <motion.div
            className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="mb-6 bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium inline-block rounded-full">
                Exclusive Opportunity
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-700"
            >
              Become a Grand Host!
            </motion.h1>

            <motion.p variants={itemVariants} className="text-gray-700 mb-6">
              To host events on our platform, you need to be promoted to the
              exclusive role of Grand Host.
            </motion.p>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Details:
              </h2>
              <ul className="space-y-3 mb-8">
                <motion.li
                  className="flex items-start gap-3"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="mt-1 rounded-full bg-primary/20 p-1">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Unlock the ability to create and manage your own events.
                  </span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="mt-1 rounded-full bg-primary/20 p-1">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Reach a wide audience and showcase your talents or services.
                  </span>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                How to Get Started:
              </h2>
              <p className="text-gray-700 mb-8">
                To become a Grand Host, a one-time promotion fee of $100 is
                required. This fee helps us ensure a premium hosting experience
                for you and our community.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded-lg"
              >
                {loading ? "Processing..." : "Pay Now"}
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="lg:w-1/2 relative overflow-hidden"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 rounded-full bg-primary/20 z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-12 h-12 rounded-full bg-primary/30 z-10"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
              }}
            />

            {/* Main image with overlay */}
            <div className="relative h-full min-h-[300px] lg:min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40 mix-blend-multiply z-10"></div>

              {/* Spotlight effect */}
              <motion.div
                className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-white/30 blur-2xl z-10"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              <img
                src="https://res.cloudinary.com/dupo7yv88/image/upload/v1739121646/yzbv7qtndn1tzxge3a81.svg"
                alt="Event hosting showcase"
                className="object-cover w-full h-full"
              />

              {/* Floating cards */}
              <motion.div
                className="absolute top-10 left-10 z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Card className="bg-white/90 backdrop-blur-sm p-3 shadow-lg rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    20+ Events Hosted
                  </p>
                </Card>
              </motion.div>

              <motion.div
                className="absolute bottom-10 right-10 z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <Card className="bg-white/90 backdrop-blur-sm p-3 shadow-lg rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    500+ Attendees
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GrandHostPromo;
