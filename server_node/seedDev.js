

require("dotenv").config();
const bcryptjs = require("bcryptjs");
const getDBObj = require("./APIs/DBConnection");

// Roles must match the client .env (REACT_APP_ADMIN_ROLE / REACT_APP_JURY_ROLE)
const ADMIN_ROLE = "8391";
const JURY_ROLE = "9184";

const ACCOUNTS = [
  { name: "Test Admin", email: "admin@test.local", password: "admin123", role: ADMIN_ROLE, userId: 1 },
  { name: "Test Jury",  email: "jury@test.local",  password: "jury123",  role: JURY_ROLE,  userId: 2 },
  { name: "Test User",  email: "user@test.local",  password: "user123",  role: "member",   userId: 3 },
];

const now = Date.now();
const day = 24 * 60 * 60 * 1000;
const iso = (offsetDays) => new Date(now + offsetDays * day).toISOString();

const genAiRow = (name, email, mentor, badges, arcade) => ({
  "User Name": name,
  "User Email": email,
  "Google Cloud Skills Boost Profile URL": `https://www.cloudskillsboost.google/public_profiles/${email}`,
  "Profile URL Status": "All Good",
  "Access Code Redemption Status": "Yes",
  "All Skill Badges & Games Completed": badges >= 15 ? "Yes" : "No",
  "# of Skill Badges Completed": badges,
  "# of Arcade Games Completed": arcade,
  Year: 2025,
  " Mentor": mentor, 
});

async function seedSequences() {
  const seq = await getDBObj("sequenceCollection");
  for (const [id, min] of [["userIdSequence", 10], ["teamIdSequence", 10]]) {
    await seq.updateOne({ _id: id }, { $setOnInsert: { sequence_value: min } }, { upsert: true });
  }
}

async function seedUsers() {
  const users = await getDBObj("userCollectionObject");
  for (const a of ACCOUNTS) {
    const password = await bcryptjs.hash(a.password, 6);
    await users.updateOne(
      { email: a.email },
      { $set: { name: a.name, email: a.email, password, role: a.role, access: true, userId: a.userId } },
      { upsert: true }
    );
  }
}

async function seedGenAi() {
  const genAi = await getDBObj("genAiCollectionObject");
  await genAi.deleteMany({ Year: 2025 });
  await genAi.insertMany([
    genAiRow("Asha Rao",  "asha@test.local",   "Team Alpha", 14, 1),
    genAiRow("Bhuvan K",  "bhuvan@test.local", "Team Alpha", 9,  1),
    genAiRow("Chetan P",  "chetan@test.local", "Team Alpha", 6,  0),
    genAiRow("Divya S",   "divya@test.local",  "Team Beta",  15, 1),
    genAiRow("Esha M",    "esha@test.local",   "Team Beta",  11, 1),
    genAiRow("Farhan A",  "farhan@test.local", "Team Gamma", 4,  0),
  ]);
}

async function seedEvents() {
  const events = await getDBObj("eventCollectionObject");
  await events.deleteMany({ _seed: true });
  await events.insertMany([
    { _seed: true, isPast: 1, title: "Intro to GDGC", description: "Kickoff session.", image: "https://placehold.co/600x400", venue: "Auditorium", startDate: iso(-30), endDate: iso(-30) },
    { _seed: true, isPast: 1, title: "Git Workshop",  description: "Hands-on Git.",    image: "https://placehold.co/600x400", venue: "Lab 1",      startDate: iso(-10), endDate: iso(-10) },
    { _seed: true, isPast: 0, title: "GenAI Study Jam", description: "Cloud skill badges.", image: "https://placehold.co/600x400", venue: "Seminar Hall", startDate: iso(14), endDate: iso(15) },
    { _seed: true, isPast: 0, title: "Hackathon 2026",  description: "24h build.",      image: "https://placehold.co/600x400", venue: "Main Block",   startDate: iso(30), endDate: iso(31) },
  ]);
}

async function seedQuestions() {
  const questions = await getDBObj("questionCollectionObject");
  await questions.deleteMany({ _seed: true });
  await questions.insertMany([
    { _seed: true, questionId: 1, question: "How do I join GDGC?", answer: "Sign up on the events page.", isAnswered: true,  isApproved: true,  userName: "Test User", userEmail: "user@test.local" },
    { _seed: true, questionId: 2, question: "When is the next workshop?", answer: "", isAnswered: false, isApproved: true, userName: "Test User", userEmail: "user@test.local" },
  ]);
}

async function seedTeams() {
  const teams = await getDBObj("teamCollectionObject");
  await teams.deleteMany({ _seed: true });
  await teams.insertMany([
    { _seed: true, teamId: 1, teamName: "Team Alpha", teamLead: "Asha Rao",  problemStatement: "Campus navigation app", juries: [2] },
    { _seed: true, teamId: 2, teamName: "Team Beta",  teamLead: "Divya S",   problemStatement: "Smart attendance",      juries: [2] },
  ]);
}

async function seedScores() {
  const scores = await getDBObj("scoreCollectionObject");
  await scores.deleteMany({ _seed: true });
  await scores.insertMany([
    { _seed: true, juryId: 2, teamId: 1, scores: { innovation: 8, execution: 7 }, totalScore: 15 },
    { _seed: true, juryId: 2, teamId: 2, scores: { innovation: 9, execution: 8 }, totalScore: 17 },
  ]);
}

async function seedCampus() {
  const campus = await getDBObj("campusCollectionObject");
  await campus.deleteMany({ _seed: true });
  await campus.insertMany([
    { _seed: true, teamID: 1, teamName: "Team Alpha", panel: 1, score: 42, evaluated: 1, final: false, members: ["Asha Rao", "Bhuvan K"] },
    { _seed: true, teamID: 2, teamName: "Team Beta",  panel: 1, score: 38, evaluated: 1, final: false, members: ["Divya S", "Esha M"] },
    { _seed: true, teamID: 3, teamName: "Team Gamma", panel: 2, score: 30, evaluated: 1, final: false, members: ["Farhan A"] },
  ]);
}

async function seedBlogs() {
  const blogs = await getDBObj("blogCollectionObject");
  await blogs.deleteMany({ _seed: true });
  await blogs.insertMany([
    { _seed: true, title: "Welcome to GDGC", content: "Our first blog post.", author: "Test Admin", createdAt: iso(-5) },
  ]);
}

(async () => {
  if ((process.env.dbUrl || "").includes("mongodb.net")) {
    console.error("Refusing to seed: dbUrl points at an Atlas cluster. Point it at a local MongoDB first.");
    process.exit(1);
  }

  await seedSequences();
  await seedUsers();
  await seedGenAi();
  await seedEvents();
  await seedQuestions();
  await seedTeams();
  await seedScores();
  await seedCampus();
  await seedBlogs();

  console.log("Seed complete. Logins:");
  for (const a of ACCOUNTS) console.log(`  ${a.role.padEnd(6)}  ${a.email} / ${a.password}`);
  console.log("Sample data: genAi(6), events(4), questions(2), teams(2), scores(2), campus(3), blogs(1).");
  process.exit(0);
})().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
