import { motion } from "framer-motion";
import { cn } from "../utils/cn"; // We'll create this utility

interface AppleSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export function AppleSection({ children, className, id, title, subtitle, dark = false }: AppleSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 sm:py-32",
        dark ? "bg-black text-white" : "bg-white text-zinc-900",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto max-w-2xl text-center mb-16">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-4xl font-semibold tracking-tight sm:text-6xl"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className={cn(
                  "mt-6 text-lg leading-8",
                  dark ? "text-zinc-400" : "text-zinc-600"
                )}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
