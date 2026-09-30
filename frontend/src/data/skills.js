// Tech stack grouped by category. Each entry maps to a lucide-react icon name.
// See https://lucide.dev/icons for the full icon set if you want to swap one.

export const skillGroups = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: "FileCode2" },
      { name: "CSS", icon: "Palette" },
      { name: "JavaScript", icon: "Braces" },
      { name: "React.js", icon: "Atom" },
      { name: "Tailwind CSS", icon: "Wind" },
      { name: "Vite", icon: "Zap" },
      { name: "Redux Toolkit", icon: "Boxes" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "Server" },
      { name: "Express.js", icon: "Route" },
      { name: "REST APIs", icon: "Cable" },
      { name: "JWT Authentication", icon: "KeyRound" },
      { name: "bcrypt", icon: "Lock" },
      { name: "Cookie Parser", icon: "Cookie" },
      { name: "Multer", icon: "UploadCloud" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: "Leaf" },
      { name: "Mongoose", icon: "Waypoints" },
      { name: "MongoDB Atlas", icon: "Database" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "GitBranch" },
      { name: "GitHub", icon: "Github" },
      { name: "Postman", icon: "Send" },
      { name: "VS Code", icon: "Code2" },
      { name: "Cloudinary", icon: "Cloud" },
      { name: "Vercel", icon: "Triangle" },
    ],
  },
];
