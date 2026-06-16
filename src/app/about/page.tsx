import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Scarlett Hawkins | Research-Grade Peptides, Curated by a Medspa Founder",
  description:
    "Learn how Scarlett Hawkins — founder of Scarlett Hawkins Medspa in Charleston, SC — built a boutique catalog of ≥99% purity research peptides, exclusively fulfilled through 99 Purity Peptides. Radical transparency. Medspa standards.",
};

export default function About() {
  return <AboutClient />;
}
