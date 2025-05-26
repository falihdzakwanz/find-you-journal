"use client";

import { motion } from "framer-motion";
import { Mail, Twitter, Facebook } from "lucide-react";

const contactMethods = [
  {
    icon: <Mail className="w-5 h-5" />,
    name: "Email",
    value: "findyourjournal@gmail.com",
    href: "mailto:findyourjournal@gmail.com",
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    name: "Twitter",
    value: "twitter.com/findyoujournal",
    href: "https://twitter.com/findyoujournal",
  },
  {
    icon: <Facebook className="w-5 h-5" />,
    name: "Facebook",
    value: "facebook.com/findyoujournal",
    href: "https://facebook.com/findyoujournal",
  },
];

export default function ContactMethods() {
  return (
    <div className="space-y-6">
      {contactMethods.map((method, index) => (
        <motion.a
          key={index}
          href={method.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ x: 5 }}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-accent mr-4">
            {method.icon}
          </div>
          <div>
            <h3 className="font-medium text-dark-brown">{method.name}</h3>
            <p className="text-primary">{method.value}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
