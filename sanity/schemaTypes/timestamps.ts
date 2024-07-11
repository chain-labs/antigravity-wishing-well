import { defineField, defineType } from "sanity";

export const timestampType = defineType({
  name: "timestamps",
  title: "Timestamps",
  type: "document",
  fields: [
    defineField({
      name: "era_1_phase_1_start",
      title: "Era 1 Phase 1 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_1_phase_1_end",
      title: "Era 1 Phase 1 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_1_phase_2_start",
      title: "Era 1 Phase 2 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_1_phase_2_end",
      title: "Era 1 Phase 2 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_1_phase_3_start",
      title: "Era 1 Phase 3 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_1_phase_3_end",
      title: "Era 1 Phase 3 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_2_phase_1_start",
      title: "Era 2 Phase 1 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_2_phase_1_end",
      title: "Era 2 Phase 1 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_2_phase_2_start",
      title: "Era 2 Phase 2 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_2_phase_2_end",
      title: "Era 2 Phase 2 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_2_phase_3_start",
      title: "Era 2 Phase 3 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_2_phase_3_end",
      title: "Era 2 Phase 3 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_3_phase_1_start",
      title: "Era 3 Phase 1 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_3_phase_1_end",
      title: "Era 3 Phase 1 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_3_phase_2_start",
      title: "Era 3 Phase 2 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_3_phase_2_end",
      title: "Era 3 Phase 2 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_3_phase_3_start",
      title: "Era 3 Phase 3 Start Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
    defineField({
      name: "era_3_phase_3_end",
      title: "Era 3 Phase 3 End Time",
      type: "datetime",
      options: {
        timeFormat: "HH:mm:ss",
      },
    }),
  ],
});
