import { Metadata } from "next";
import ContactMethods from "@/components/ContactMethods";
import Footer from "@/components/fragments/Footer";

export const metadata: Metadata = {
  title: "Contact Us - Pomofocus",
  description: "Get in touch with Pomofocus support team",
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen px-4 py-10 mx-auto bg-neutral md:max-w-2xl">
      <main>
        <h1 className="mb-2 text-3xl font-bold text-center text-dark-brown">
          Contact
        </h1>
        <p className="mb-10 text-lg text-center text-primary">
          If you have any questions, please contact us on either of the
          following methods.
        </p>

        <ContactMethods />
      </main>
      <Footer />
    </div>
  );
}
