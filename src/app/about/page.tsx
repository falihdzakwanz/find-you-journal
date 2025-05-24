import Footer from "@/components/fragments/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-3xl px-4 py-10 mx-auto text-justify sm:px-6 lg:px-8 text-dark-brown">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white rounded-full bg-gradient-to-br from-indigo-800 to-amber-600">
          FY
        </div>
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">Find You</h1>
      </div>
      <p className="mb-2 italic text-center text-accent text-2xl sm:text-3xl">
        &quot;The journal that helps you discover yourself&quot;
      </p>

      <div className="mb-10 border-b border-primary/20"></div>

      <p className="mb-5 sm:text-lg">
        <strong>Find You</strong> is a reflective journal designed to guide you
        through self-discovery, emotional awareness, and personal growth through
        structured writing.
      </p>

      <p className="mb-5 sm:text-lg">
        Unlike traditional journals, we combine daily prompts with free-form
        writing space – helping you uncover patterns and insights about yourself
        over time.
      </p>

      <p className="mb-10 sm:text-lg">
        Every entry is encrypted and private. This is your safe space for
        unfiltered self-exploration.
      </p>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 mb-3 text-xl font-semibold sm:text-2xl ">
          <svg
            className="w-5 h-5 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          Our Vision
        </h2>
        <p className="mb-6 sm:text-lg">
          To become the most trusted tool for intentional self-discovery,
          helping users build deeper self-awareness through the science of
          reflective writing.
        </p>

        <h2 className="flex items-center gap-2 mb-3 text-xl font-semibold sm:text-2xl ">
          <svg
            className="w-5 h-5 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
          Our Mission
        </h2>
        <ul className="pl-5 mb-6 space-y-2 list-disc sm:text-lg">
          <li>Create tools that reveal your authentic self</li>
          <li>Protect your private thoughts with military-grade encryption</li>
          <li>Transform random notes into meaningful personal insights</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 mb-3 text-xl font-semibold sm:text-2xl">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          How It Helps You &quot;Find You&quot;
        </h2>
        <ul className="pl-5 space-y-2 list-disc sm:text-lg">
          <li>
            <span className="font-semibold">Discovery Prompts</span> -
            Thought-provoking questions tailored to your journaling history
          </li>
          <li>
            <span className="font-semibold">Insight Tracking</span> - Visualize
            emotional patterns over time
          </li>
          <li>
            <span className="font-semibold">Private Archives</span> - Encrypted
            entries only you can access
          </li>
          <li>
            <span className="font-semibold">Guided Reflections</span> - Weekly
            exercises to deepen self-awareness
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl ">
          Voices from the Journey
        </h2>
        <div className="space-y-6">
          <blockquote className="p-6 italic border-l-4 rounded-lg bg-amber-50 border-accent sm:text-lg">
            “After 3 months with Find You, I discovered career aspirations
            I&apos;d buried for years. The reflection exercises unearthed what I
            truly wanted.”
            <span className="block mt-2 text-sm text-primary">
              – Sarah, 28 • Graphic Designer
            </span>
          </blockquote>
          <blockquote className="p-6 italic border-l-4 rounded-lg bg-amber-50 border-accent sm:text-lg">
            “The privacy gave me courage to write honestly. For the first time,
            my journal feels like <em>me</em> – not who I think I should be.”
            <span className="block mt-2 text-sm text-primary">
              – David, 35 • Teacher
            </span>
          </blockquote>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl ">
          About the Creator
        </h2>
        <p className="mb-4 sm:text-lg">
          Developed by{" "}
          <a
            href="https://github.com/falihdzakwanz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Falih Dzakwan Zuhdi
          </a>
          , Find You emerged from a personal need for a journal that goes beyond
          documenting days to uncovering deeper self-knowledge.
        </p>
        <p className=" sm:text-lg">
          Built with modern tools for your peace of mind:
        </p>
        <ul className="pl-5 mt-2 space-y-1 list-disc sm:text-lg">
          <li>Next.js for seamless experience</li>
          <li>End-to-end encryption</li>
          <li>Responsive design for journaling anywhere</li>
        </ul>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/journal/today"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-all border border-transparent rounded-md shadow-sm bg-dark-brown hover:bg-accent hover:scale-105 active:scale-95"
        >
          Start Your Discovery Journey
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link>
      </div>

      <Footer />
    </main>
  );
}
