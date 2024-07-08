"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type LIST_OF_BAGES_TYPE =
  | "Informant"
  | "Jr. Operator"
  | "Sr. Operator"
  | "Lead Operator"
  | "Jr. Technician"
  | "Sr. Technician"
  | "Lead Technician"
  | "Jr. Agent"
  | "Sr. Agent"
  | "Special Agent"
  | "2nd Navigator"
  | "1st Navigator"
  | "Cheif Navigator"
  | "2nd Officer"
  | "1st Officer"
  | "Cheif Officer"
  | "General Admiral";

const LIST_OF_BAGES: LIST_OF_BAGES_TYPE[] = [
  "Informant",
  "Jr. Operator",
  "Sr. Operator",
  "Lead Operator",
  "Jr. Technician",
  "Sr. Technician",
  "Lead Technician",
  "Jr. Agent",
  "Sr. Agent",
  "Special Agent",
  "2nd Navigator",
  "1st Navigator",
  "Cheif Navigator",
  "2nd Officer",
  "1st Officer",
  "Cheif Officer",
  "General Admiral",
];

function StackOfCounters({
  badge,
  idx,
  selected = false,
}: {
  badge: LIST_OF_BAGES_TYPE;
  idx: number;
  selected?: boolean;
}) {
  return (
    <motion.span
      animate={{ y: selected ? 0 : -((LIST_OF_BAGES.length - idx) * 24) }}
      initial={{ y: idx * 24 }}
      transition={{ duration: 0.5 }}
      className="absolute text-agwhite"
    >
      {badge}
    </motion.span>
  );
}

export default function BadgeIncrementalCounter({
  badge,
}: {
  badge: LIST_OF_BAGES_TYPE;
}) {
  return (
    <span className="relative flex flex-col justify-start items-start h-[16px] overflow-hidden">
      {LIST_OF_BAGES.map((badgeDB, idx) => {
        return (
          <StackOfCounters
            badge={badgeDB}
            key={idx}
            idx={idx}
            selected={badge === badgeDB}
          />
        );
      })}
    </span>
  );
}
