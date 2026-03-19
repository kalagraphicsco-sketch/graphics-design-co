import { motion } from "motion/react";
import { SAMPLE_TEAM } from "../data/sampleData";
import { useGetTeamMembers } from "../hooks/useQueries";

export default function TeamSection() {
  const { data: backendTeam } = useGetTeamMembers();
  const team =
    backendTeam && backendTeam.length > 0
      ? backendTeam.map((m) => ({ ...m, imageUrl: m.imageUrl.getDirectURL() }))
      : SAMPLE_TEAM;

  return (
    <section id="team" className="bg-charcoal py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-sm font-semibold uppercase tracking-widest">
            The People
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mt-2">
            Meet Our Creative Team
          </h2>
          <p className="text-muted-dark mt-4 max-w-xl mx-auto">
            Talented designers, thinkers, and makers united by a passion for
            craft.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center"
              data-ocid={`team.item.${i + 1}`}
            >
              <div className="relative mb-4 mx-auto w-36 h-36 lg:w-40 lg:h-40">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange/40 to-teal/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="relative w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                {member.name}
              </h3>
              <p className="text-orange text-sm font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-muted-dark text-xs leading-relaxed px-2">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
