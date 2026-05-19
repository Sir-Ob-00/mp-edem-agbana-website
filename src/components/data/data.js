// Mock Data Objects
const issuesData = {
  issues: [],
  statistics: {
    pendingAssessment: 0,
    underAssessment: 0,
    assessedThisMonth: 0,
    totalAssessed: 0,
    totalIssues: 0,
    approvedIssues: 0,
    rejectedIssues: 0,
    lastUpdated: new Date().toISOString(),
  },
};

const teamData = {
  assessors: [],
  currentUser: {
    id: "user-1",
    name: "Test User",
    email: "test@example.com",
    role: "admin",
    avatar: "/avatars/default.png",
    permissions: [],
    preferences: {
      theme: "light",
      language: "en",
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
    },
  },
};

const metadataData = {
  statuses: [
    { value: "submitted", label: "Submitted", color: "blue" },
    {
      value: "under_officer_review",
      label: "Under Officer Review",
      color: "yellow",
    },
    {
      value: "forwarded_to_admin",
      label: "Forwarded To Admin",
      color: "purple",
    },
    {
      value: "assigned_to_task_force",
      label: "Assigned To Task Force",
      color: "blue",
    },
    {
      value: "pending_assessment",
      label: "Pending Assessment",
      color: "blue",
    },
    {
      value: "assessment_in_progress",
      label: "Assessment In Progress",
      color: "orange",
    },
    {
      value: "assessment_submitted",
      label: "Assessment Submitted",
      color: "indigo",
    },
    {
      value: "needs_revision",
      label: "Needs Revision",
      color: "orange",
    },
    {
      value: "resources_allocated",
      label: "Resources Allocated",
      color: "cyan",
    },
    {
      value: "resolution_in_progress",
      label: "Resolution In Progress",
      color: "orange",
    },
    {
      value: "resolution_submitted",
      label: "Resolution Submitted",
      color: "indigo",
    },
    { value: "resolved", label: "Resolved", color: "green" },
    { value: "closed", label: "Closed", color: "green" },
    { value: "rejected", label: "Rejected", color: "red" },
  ],

  priorities: [
    { level: "low", label: "Low", color: "green" },
    { level: "medium", label: "Medium", color: "yellow" },
    { level: "high", label: "High", color: "red" },
    { level: "urgent", label: "Urgent", color: "red" },
  ],

  categories: [
    { name: "Infrastructure" },
    { name: "Health" },
    { name: "Education" },
    { name: "Environment" },
  ],

  timelines: [
    { value: "immediate", label: "Immediate (< 1 month)" },
    { value: "short_term", label: "Short Term (1-3 months)" },
    { value: "medium_term", label: "Medium Term (3-6 months)" },
    { value: "long_term", label: "Long Term (> 6 months)" },
  ],
};

// Data access functions
export const getIssues = () => {
  return issuesData.issues;
};

export const getIssueById = (id) => {
  const issue = issuesData.issues.find((issue) => issue.id === id);
  return issue || null;
};

export const getIssuesByStatus = (status) => {
  return issuesData.issues.filter((issue) => issue.status === status);
};

export const getIssuesByPriority = (priority) => {
  return issuesData.issues.filter((issue) => issue.priority === priority);
};

export const getIssuesByCategory = (category) => {
  return issuesData.issues.filter((issue) => issue.category === category);
};

export const getIssuesByAssessor = (assessorId) => {
  return issuesData.issues.filter((issue) =>
    issue.assignedTo.includes(assessorId)
  );
};

export const searchIssues = (query) => {
  const lowercaseQuery = query.toLowerCase();

  return issuesData.issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(lowercaseQuery) ||
      issue.community.toLowerCase().includes(lowercaseQuery) ||
      issue.description.toLowerCase().includes(lowercaseQuery) ||
      issue.submitter.name.toLowerCase().includes(lowercaseQuery) ||
      issue.tags.some((tag) =>
        tag.toLowerCase().includes(lowercaseQuery)
      )
  );
};

export const getStatistics = () => {
  return issuesData.statistics;
};

export const getAssessors = () => {
  return teamData.assessors;
};

export const getCurrentUser = () => {
  return teamData.currentUser;
};

export const getMetadata = () => {
  return metadataData;
};

export const getStatusColor = (status) => {
  const statusConfig = metadataData.statuses.find(
    (s) => s.value === status
  );

  if (!statusConfig) {
    return "bg-gray-100 text-gray-800 border-gray-200";
  }

  const colorMap = {
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-700 text-green-100 border-green-200",
    red: "bg-red-100 text-red-800 border-red-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    gray: "bg-gray-100 text-gray-800 border-gray-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
    cyan: "bg-cyan-700 text-cyan-100 border-cyan-200",
  };

  return (
    colorMap[statusConfig.color] ||
    "bg-gray-100 text-gray-800 border-gray-200"
  );
};

export const getPriorityColor = (priority) => {
  const priorityConfig = metadataData.priorities.find(
    (p) => p.level === priority
  );

  if (!priorityConfig) {
    return "bg-gray-100 text-gray-800";
  }

  const colorMap = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    colorMap[priorityConfig.color] ||
    "bg-gray-100 text-gray-800"
  );
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB");
};

export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("en-GB");
};

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return "Just now";
  }

  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  }

  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  }

  if (diffInSeconds < 604800) {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }

  return formatDate(dateString);
};

// Mock API functions for future backend integration
export const createAssessment = async (
  issueId,
  assessment
) => {
  // TODO: Replace with actual API call
  console.log("Creating assessment:", {
    issueId,
    assessment,
  });

  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};

export const updateIssueStatus = async (
  issueId,
  status
) => {
  // TODO: Replace with actual API call
  console.log("Updating issue status:", {
    issueId,
    status,
  });

  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};

export const uploadAttachment = async (
  issueId,
  file
) => {
  // TODO: Replace with actual API call
  console.log("Uploading attachment:", {
    issueId,
    fileName: file.name,
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`/uploads/issues/${issueId}/${file.name}`);
    }, 1000);
  });
};

export const contactDetails = {
  address: [
    "Sefwi Wiawso Municipal Assembly",
    "P.O Box 25",
    "Western North Region, Ghana",
  ],
  phone: ["(+233) 242 560 140", "054 853 1963"],
};

export const faqItems = [
  {
    id: "faq-1",
    question: "How can I submit a project idea?",
    answer:
      "Use the submit idea form on the Ideas page to share your proposal and any supporting details.",
  },
  {
    id: "faq-2",
    question: "Where can I find event information?",
    answer:
      "Visit the Events page for upcoming constituency programmes, registration details, and event status updates.",
  },
  {
    id: "faq-3",
    question: "How do I stay updated on announcements?",
    answer:
      "Check the Announcements section or subscribe to our newsletter for the latest community news.",
  },
];

export const communityStats = [
  { label: "Sanitation Upgrades", value: "12" },
  { label: "Schools Renovated", value: "8" },
  { label: "Health Clinics", value: "5" },
];

export const reportSteps = [
  "Describe the issue and your location.",
  "Attach photos or relevant details.",
  "Submit your report for the constituency team to review.",
];

export const heroSlides = [
  {
    id: "slide-1",
    title: "Strengthening community services with every visit.",
    subtitle:
      "<p>Bringing local development, youth empowerment, and public safety together.</p>",
    description:
      "<p>Our office partners with residents to deliver practical solutions that improve quality of life across Sefwi Wiawso.</p>",
    ctaLabel: "Explore initiatives",
    ctaLink: "/projects",
  },
  {
    id: "slide-2",
    title: "Transparent governance, delivered in person.",
    subtitle:
      "<p>Follow our latest events, announcements, and public consultations.</p>",
    description:
      "<p>Stay connected to community progress on education, infrastructure, and health services.</p>",
    ctaLabel: "View updates",
    ctaLink: "/announcement",
  },
  {
    id: "slide-3",
    title: "Your ideas shape our roadmap.",
    subtitle:
      "<p>Submit suggestions to help us prioritize local development projects.</p>",
    description:
      "<p>Every voice matters. Share your idea, and we’ll work to turn it into action.</p>",
    ctaLabel: "Share an idea",
    ctaLink: "/ideas",
  },
];