// Add, remove, or edit projects here — the Projects section renders whatever is in this array.
// Set liveUrl / githubUrl to "" to hide that button until a real link exists.

export const projects = [
  {
    id: "medicare",
    name: "MediCare",
    category: "Full Stack Web Application",
    description:
      "A healthcare-focused web application designed to simplify digital healthcare interactions through a modern interface and backend functionality.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Modern responsive interface",
      "Authentication system",
      "Backend API integration",
      "Database management",
      "Secure user workflows",
    ],
    // TODO: add the real deployed URL and repository URL when ready.
    liveUrl: "https://medicare-frontend-zp4l.onrender.com/",
    githubUrl: "https://github.com/Veerkunwar/Medicare-health-app",
    // Drop a screenshot at /public/assets/projects/medicare.png and set this path.
    image: "/assets/projects/medicare.png",
  },
  {
    id: "rideit",
    name: "RideIt",
    category: "Bike Rental Platform",
    description:
      "RideIt is a full-stack bike rental platform designed to make bike booking and rental management simple, accessible, and efficient.",
    techStack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
      "Redux Toolkit",
    ],
    features: [
      "User-facing bike rental platform",
      "Separate admin dashboard",
      "Bike listing and management",
      "Booking functionality",
      "Authentication and authorization",
      "Image uploads using Cloudinary",
      "Shared backend API",
      "MongoDB Atlas integration",
    ],
    liveUrl: "https://ride-it-veer.vercel.app/",
    githubUrl: "https://github.com/Veerkunwar/bike-rental-platform.git",
    image: "/assets/projects/rideit.png",
  },
];
