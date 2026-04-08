export const initialJobs = [
  {
    id: 1,
    title: 'Senior React Developer Needed',
    company: 'TechFlow Solutions',
    type: 'Full-time',
    budget: '$3,000 - $5,000 / month',
    description: 'We are looking for an experienced React developer to help build our next-generation web client.',
    skills: ['React', 'Tailwind', 'Redux'],
    postedAt: '2 days ago',
    category: 'Web Development',
    status: 'open',
    applicants: 12
  },
  {
    id: 2,
    title: 'UI/UX Designer for Mobile App',
    company: 'Creative Apps',
    type: 'Project',
    budget: '$1,500 fixed',
    description: 'Need a stunning design for our new fitness tracking mobile application. Must be proficient in Figma.',
    skills: ['Figma', 'Prototyping', 'UI Design'],
    postedAt: '5 hours ago',
    category: 'Design',
    status: 'open',
    applicants: 5
  },
  {
    id: 3,
    title: 'Backend Node.js Engineer',
    company: 'Serverless Inc',
    type: 'Contract',
    budget: '$50 - $80 / hr',
    description: 'Looking for a Node.js expert with experience in building scalable microservices using AWS Lambda.',
    skills: ['Node.js', 'AWS', 'Microservices'],
    postedAt: '1 week ago',
    category: 'Backend',
    status: 'open',
    applicants: 28
  },
  {
    id: 4,
    title: 'Logo and Brand Identity',
    company: 'StartupX',
    type: 'Project',
    budget: '$500 fixed',
    description: 'We are an AI startup in need of a modern, minimalist logo and complete brand identity.',
    skills: ['Illustrator', 'Branding', 'Graphic Design'],
    postedAt: '3 days ago',
    category: 'Design',
    status: 'open',
    applicants: 42
  }
];

export const initialUsers = [
  {
    id: 1,
    name: 'Akshay Mundra',
    role: 'Freelancer',
    email: 'akshay@example.com',
    skills: ['React', 'Node.js', 'Tailwind', 'Figma'],
    bio: 'Full-stack developer with a passion for building beautiful and scalable web applications.',
    earnings: 12500,
    rating: 4.9,
    completedJobs: 24,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Akshay'
  },
  {
    id: 2,
    name: 'TechFlow Solutions',
    role: 'Client',
    email: 'client@techflow.com',
    company: 'TechFlow Solutions',
    bio: 'We are a fast-growing tech startup looking for top talent around the world.',
    totalSpent: 45000,
    rating: 4.7,
    jobsPosted: 15,
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TF'
  }
];

export const initialBids = [
  {
    id: 1,
    jobId: 1,
    freelancerId: 1,
    amount: "$4000",
    coverLetter: "I have 4 years of experience with React and Redux. I can start immediately and deliver high-quality code.",
    status: "pending"
  }
];

export const initialMessages = [
  {
    id: 1,
    senderId: 2,
    receiverId: 1,
    text: "Hi Akshay, we received your bid and we love your portfolio. Are you available for a quick chat?",
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 2,
    senderId: 1,
    receiverId: 2,
    text: "Hello! Yes, I am available right now. Let's discuss the project details.",
    timestamp: new Date(Date.now() - 1800000).toISOString()
  }
];

export const initialNotifications = [
  {
    id: 1,
    userId: 1,
    text: "Your bid on 'Senior React Developer Needed' was viewed.",
    read: false,
    timestamp: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 2,
    userId: 1,
    text: "New message from TechFlow Solutions",
    read: true,
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];
