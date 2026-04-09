export const initialJobs = [
  // JOBS
  {
    id: 1,
    title: 'Senior React Developer Needed',
    company: 'TechFlow Solutions',
    type: 'Full-time',
    budget: '$3,000 - $5,000 / month',
    description: 'We are looking for an experienced React developer to help build our next-generation web client.',
    skills: ['React', 'Tailwind', 'Redux', 'TypeScript'],
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
  },
  {
    id: 5,
    title: 'Full Stack MERN Developer',
    company: 'CodeWizards',
    type: 'Full-time',
    budget: '$4,000 - $6,000 / month',
    description: 'Join our dynamic team building e-commerce solutions. Expert knowledge of MongoDB, Express, React, and Node is mandatory.',
    skills: ['MongoDB', 'Express', 'React', 'Node.js'],
    postedAt: '1 day ago',
    category: 'Web Development',
    status: 'open',
    applicants: 18
  },
  {
    id: 6,
    title: 'Python Data Scientist',
    company: 'DataLens AI',
    type: 'Contract',
    budget: '$60 - $100 / hr',
    description: 'Analyze large datasets and build predictive models for our fintech platform.',
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'TensorFlow'],
    postedAt: '6 hours ago',
    category: 'Data Science',
    status: 'open',
    applicants: 15
  },

  // INTERNSHIPS
  {
    id: 7,
    title: 'Frontend Development Intern',
    company: 'GlobeTech',
    type: 'Internship',
    stipend: '$800 / month',
    duration: '6 Months',
    description: 'Perfect for students! Learn modern frontend development with React and Next.js under senior mentorship.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    postedAt: 'Just now',
    category: 'Web Development',
    status: 'open',
    applicants: 30
  },
  {
    id: 8,
    title: 'Digital Marketing Intern',
    company: 'SocialPulse',
    type: 'Internship',
    stipend: '$500 / month',
    duration: '3 Months',
    description: 'Learn SEO, SEM, and social media management in a fast-paced agency environment.',
    skills: ['SEO', 'Content Writing', 'Social Media'],
    postedAt: '1 day ago',
    category: 'Marketing',
    status: 'open',
    applicants: 22
  },
  {
    id: 9,
    title: 'Product Management Intern',
    company: 'Innovate AI',
    type: 'Internship',
    stipend: '$1,200 / month',
    duration: '4 Months',
    description: 'Assist in drafting product requirements and conducting market research for our new AI products.',
    skills: ['Product Research', 'Agile', 'Communication'],
    postedAt: '1 week ago',
    category: 'Management',
    status: 'open',
    applicants: 14
  },
  {
    id: 10,
    title: 'Cybersecurity Intern',
    company: 'SecureNet',
    type: 'Internship',
    stipend: '$1,000 / month',
    duration: '6 Months',
    description: 'Work with the security team to perform vulnerability assessments and monitoring.',
    skills: ['Networking', 'Security+', 'Linux'],
    postedAt: '2 days ago',
    category: 'Security',
    status: 'open',
    applicants: 9
  },
  {
    id: 11,
    title: 'Content Creator (Freelance)',
    company: 'Vlogly',
    type: 'Project',
    budget: '$50 - $150 / video',
    description: 'Edit and produce short-form video content for TikTok and Instagram Reels.',
    skills: ['Premiere Pro', 'After Effects', 'Short-form Video'],
    postedAt: '3 hours ago',
    category: 'Content Creation',
    status: 'open',
    applicants: 7
  },
  {
    id: 12,
    title: 'Blockchain Smart Contract Dev',
    company: 'DeFi Labs',
    type: 'Contract',
    budget: '$100 - $180 / hr',
    description: 'Develop and audit Solidity smart contracts for decentralized finance protocols.',
    skills: ['Solidity', 'Ethereum', 'Smart Contracts'],
    postedAt: '12 hours ago',
    category: 'Web3',
    status: 'open',
    applicants: 11
  }
];

export const initialUsers = [
  {
    id: 1,
    name: 'Akshay Mundra',
    role: 'Freelancer',
    email: 'akshay@example.com',
    skills: ['React', 'Node.js', 'Tailwind', 'Figma', 'Three.js'],
    bio: 'Full-stack developer with a passion for building beautiful and scalable web applications. Specialist in 3D Web & Interactive UI.',
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

