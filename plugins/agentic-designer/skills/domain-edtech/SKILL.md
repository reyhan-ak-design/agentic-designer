---
name: domain-edtech
description: Domain Pack for education and edtech — learning apps, courses, LMS, school and campus apps, tutoring, exam prep, and corporate learning. Use whenever a brief mentions education, pendidikan, edtech, learning, belajar, course, kelas, LMS, school, sekolah, student, siswa, teacher, guru, quiz, exam, ujian, or certification.
---

# Domain Pack — Education & Edtech
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Learners (children, teens, university, adults), teachers, parents, and admins — each with different needs.
- Motivation is fragile; progress and clarity keep people going.

## Principles
1. Always show "where am I and what's next".
2. Progress is visible and honest (completed, remaining, time estimate).
3. Content first: video, reading, and practice are readable and distraction-free.
4. Age-appropriate design: younger users → bigger, simpler, more guidance; adults → efficient.

## Patterns
- Course card: title, instructor, duration, level, progress.
- Lesson player: content, progress, next/previous, notes, offline download.
- Quiz: one question per screen, clear selection state, feedback with explanation, results summary.
- Schedule/timetable, assignments with due dates, grades.
- Parent view: child's progress and attendance.

## Regulatory UI implications
- Children's data: parental consent and minimal data collection (`[copy: legal]`).
- Certificates show issuer and verification.

## Data guide
- Courses: "Matematika Kelas 9 — Persamaan Kuadrat", "UI/UX Design Fundamental". Durations `12 materi · 3 jam 40 menit`.
- Names of students and teachers varied across Indonesia.

## Recommended styles
`style-playful` (kids/teens), `style-modern-minimal` (adult/pro), `style-public-service-accessible` (public schools).

## Checks
- EDU-01 [J][Blocker] — Current position and next step visible in any learning flow.
- EDU-02 [J][Major] — Progress shows completed vs remaining with time estimate.
- EDU-03 [J][Major] — Quiz feedback explains why, not only right/wrong.
- EDU-04 [J][Major] — Age-appropriate sizing and copy for the stated audience.
- EDU-05 [J][Major] — Offline/poor-connection states for content.

## Anti-patterns
Leaderboards that shame; streak anxiety; cluttered lesson screens; tiny tap targets for kids.

## Notes for Desi
Playful brands: higher radius and brighter secondary; adult/pro: modern-minimal values.
