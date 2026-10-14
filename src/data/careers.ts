import type { Career, Milestone, ExamDetails, CustomGoal } from '@/types';

// ─── Career Catalog (7 categories, 30+ careers) ───────────────────────────────

export const careers: Career[] = [
  // ── Government Jobs ──────────────────────────────────────────────────────────
  {
    id: 'upsc-ias',
    title: 'UPSC / IAS Officer',
    tagline: 'India\'s premier civil service examination',
    icon: 'Landmark',
    description: 'Clear the UPSC Civil Services Examination to become an IAS, IPS, IFS, or other Group A officer. Requires deep knowledge of polity, history, geography, economics, and current affairs.',
    requiredSkills: [
      { id: 'upsc-polity', name: 'Indian Polity & Governance', category: 'Core' },
      { id: 'upsc-history', name: 'Indian & World History', category: 'Core' },
      { id: 'upsc-geography', name: 'Geography', category: 'Core' },
      { id: 'upsc-economics', name: 'Economics & Budget', category: 'Core' },
      { id: 'upsc-current', name: 'Current Affairs', category: 'Core' },
      { id: 'upsc-essay', name: 'Essay Writing', category: 'Core' },
      { id: 'upsc-ethics', name: 'Ethics & Integrity', category: 'Core' },
      { id: 'upsc-optional', name: 'Optional Subject', category: 'Specialized' },
      { id: 'upsc-answer', name: 'Answer Writing', category: 'Core' },
      { id: 'upsc-interview', name: 'Personality Test Prep', category: 'Core' },
    ],
    avgSalaryRange: '₹56K – ₹2.5L/mo',
    difficulty: 'Advanced',
    totalWeeks: 52,
    category: 'Government Jobs',
    isExam: true,
  },
  {
    id: 'ssc-cgl',
    title: 'SSC CGL',
    tagline: 'Staff Selection Commission Combined Graduate Level',
    icon: 'FileText',
    description: 'Clear SSC CGL for Group B and C posts in various central government ministries and departments. Covers quantitative aptitude, reasoning, English, and general awareness.',
    requiredSkills: [
      { id: 'ssc-quant', name: 'Quantitative Aptitude', category: 'Core' },
      { id: 'ssc-reasoning', name: 'General Intelligence & Reasoning', category: 'Core' },
      { id: 'ssc-english', name: 'English Comprehension', category: 'Core' },
      { id: 'ssc-ga', name: 'General Awareness', category: 'Core' },
      { id: 'ssc-typing', name: 'Typing Test (for some posts)', category: 'Specialized' },
      { id: 'ssc-descriptive', name: 'Descriptive Writing', category: 'Core' },
    ],
    avgSalaryRange: '₹25K – ₹80K/mo',
    difficulty: 'Intermediate',
    totalWeeks: 24,
    category: 'Government Jobs',
    isExam: true,
  },
  {
    id: 'banking-po',
    title: 'Banking (IBPS PO / SBI PO)',
    tagline: 'Probationary Officer exams for public sector banks',
    icon: 'Building2',
    description: 'Clear IBPS PO or SBI PO to become a Probationary Officer. Tests reasoning, quantitative aptitude, English, banking awareness, and computer knowledge.',
    requiredSkills: [
      { id: 'bank-quant', name: 'Quantitative Aptitude', category: 'Core' },
      { id: 'bank-reasoning', name: 'Reasoning Ability', category: 'Core' },
      { id: 'bank-english', name: 'English Language', category: 'Core' },
      { id: 'bank-awareness', name: 'Banking & Financial Awareness', category: 'Core' },
      { id: 'bank-computer', name: 'Computer Knowledge', category: 'Core' },
      { id: 'bank-ga', name: 'Current Affairs', category: 'Core' },
      { id: 'bank-descriptive', name: 'Descriptive Test (Essay + Letter)', category: 'Core' },
      { id: 'bank-interview', name: 'Interview Prep', category: 'Core' },
    ],
    avgSalaryRange: '₹30K – ₹60K/mo',
    difficulty: 'Intermediate',
    totalWeeks: 20,
    category: 'Government Jobs',
    isExam: true,
  },
  {
    id: 'railways',
    title: 'Railways (RRB NTPC / JE)',
    tagline: 'Indian Railways recruitment exams',
    icon: 'Train',
    description: 'Clear RRB NTPC, JE, or Group D exams for various railway positions. Covers mathematics, reasoning, general science, and general awareness.',
    requiredSkills: [
      { id: 'rly-maths', name: 'Mathematics', category: 'Core' },
      { id: 'rly-reasoning', name: 'General Intelligence & Reasoning', category: 'Core' },
      { id: 'rly-science', name: 'General Science', category: 'Core' },
      { id: 'rly-ga', name: 'General Awareness', category: 'Core' },
      { id: 'rly-computer', name: 'Basic Computer Knowledge', category: 'Core' },
    ],
    avgSalaryRange: '₹20K – ₹70K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 18,
    category: 'Government Jobs',
    isExam: true,
  },
  {
    id: 'state-psc',
    title: 'State PSC',
    tagline: 'State Public Service Commission exams',
    icon: 'Landmark',
    description: 'Clear your state\'s PSC exam for state administrative services. Pattern varies by state but generally includes prelims, mains, and interview with state-specific topics.',
    requiredSkills: [
      { id: 'psc-state', name: 'State Specific Knowledge', category: 'Core' },
      { id: 'psc-polity', name: 'Indian Polity', category: 'Core' },
      { id: 'psc-history', name: 'History', category: 'Core' },
      { id: 'psc-geography', name: 'Geography', category: 'Core' },
      { id: 'psc-economics', name: 'Economics', category: 'Core' },
      { id: 'psc-current', name: 'Current Affairs', category: 'Core' },
      { id: 'psc-optional', name: 'Optional Subject', category: 'Specialized' },
      { id: 'psc-interview', name: 'Interview Prep', category: 'Core' },
    ],
    avgSalaryRange: '₹40K – ₹1.5L/mo',
    difficulty: 'Advanced',
    totalWeeks: 40,
    category: 'Government Jobs',
    isExam: true,
  },
  {
    id: 'police-si',
    title: 'Police (SI / Constable)',
    tagline: 'State and central police recruitment exams',
    icon: 'Shield',
    description: 'Clear police recruitment exams for Sub-Inspector or Constable posts. Includes written test, physical efficiency test, and medical examination.',
    requiredSkills: [
      { id: 'pol-reasoning', name: 'Reasoning', category: 'Core' },
      { id: 'pol-gk', name: 'General Knowledge', category: 'Core' },
      { id: 'pol-maths', name: 'Numerical Ability', category: 'Core' },
      { id: 'pol-english', name: 'Language Skills', category: 'Core' },
      { id: 'pol-physical', name: 'Physical Fitness', category: 'Specialized' },
      { id: 'pol-law', name: 'Basic Law Knowledge', category: 'Core' },
    ],
    avgSalaryRange: '₹25K – ₹50K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 16,
    category: 'Government Jobs',
    isExam: true,
  },
  {
    id: 'defence-nda',
    title: 'Defence (NDA / CDS / AFCAT)',
    tagline: 'Indian Armed Forces officer recruitment',
    icon: 'ShieldCheck',
    description: 'Clear NDA, CDS, or AFCAT to join the Army, Navy, or Air Force as an officer. Includes written exam, SSB interview, and medical test.',
    requiredSkills: [
      { id: 'def-maths', name: 'Mathematics', category: 'Core' },
      { id: 'def-english', name: 'English', category: 'Core' },
      { id: 'def-gk', name: 'General Knowledge', category: 'Core' },
      { id: 'def-physics', name: 'Physics', category: 'Core' },
      { id: 'def-ssb', name: 'SSB Interview Prep (OLQ)', category: 'Specialized' },
      { id: 'def-physical', name: 'Physical Fitness', category: 'Specialized' },
    ],
    avgSalaryRange: '₹56K – ₹2L/mo',
    difficulty: 'Intermediate',
    totalWeeks: 24,
    category: 'Government Jobs',
    isExam: true,
  },
  {
    id: 'teaching-ctet',
    title: 'Teaching (CTET / TET / KVS)',
    tagline: 'Central and state teacher eligibility tests',
    icon: 'GraduationCap',
    description: 'Clear CTET or state TET to become a government school teacher. Covers pedagogy, subject knowledge, and child development.',
    requiredSkills: [
      { id: 'tch-pedagogy', name: 'Child Development & Pedagogy', category: 'Core' },
      { id: 'tch-lang1', name: 'Language I (English/Hindi)', category: 'Core' },
      { id: 'tch-lang2', name: 'Language II', category: 'Core' },
      { id: 'tch-maths', name: 'Mathematics (for PRT/TGT)', category: 'Core' },
      { id: 'tch-evs', name: 'Environmental Studies', category: 'Core' },
      { id: 'tch-subject', name: 'Subject Specialization', category: 'Specialized' },
      { id: 'tch-diksha', name: 'DIKSHA / NEP 2020 Awareness', category: 'Core' },
    ],
    avgSalaryRange: '₹25K – ₹55K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 16,
    category: 'Government Jobs',
    isExam: true,
  },

  // ── Technology ───────────────────────────────────────────────────────────────
  {
    id: 'software-developer',
    title: 'Software Developer',
    tagline: 'Build applications that solve real-world problems',
    icon: 'Code2',
    description: 'Design, develop, and maintain software applications using programming languages, frameworks, and best engineering practices.',
    requiredSkills: [
      { id: 'prog-basics', name: 'Programming Basics', category: 'Core' },
      { id: 'data-structures', name: 'Data Structures & Algorithms', category: 'Core' },
      { id: 'git', name: 'Version Control (Git)', category: 'Tools' },
      { id: 'databases', name: 'Database Fundamentals', category: 'Core' },
      { id: 'web-framework', name: 'Web Framework', category: 'Specialized' },
      { id: 'apis', name: 'REST APIs', category: 'Core' },
      { id: 'testing', name: 'Testing Basics', category: 'Core' },
      { id: 'problem-solving', name: 'Problem Solving', category: 'Soft Skills' },
    ],
    avgSalaryRange: '$60K – $140K',
    difficulty: 'Beginner-friendly',
    totalWeeks: 24,
    category: 'Technology',
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    tagline: 'Build intelligent systems that learn from data',
    icon: 'Cpu',
    description: 'Develop machine learning models, work with neural networks, and deploy AI systems. Requires strong math foundations and programming skills.',
    requiredSkills: [
      { id: 'aiml-python', name: 'Python Programming', category: 'Core' },
      { id: 'aiml-math', name: 'Linear Algebra & Calculus', category: 'Core' },
      { id: 'aiml-stats', name: 'Statistics & Probability', category: 'Core' },
      { id: 'aiml-ml', name: 'Machine Learning Fundamentals', category: 'Core' },
      { id: 'aiml-dl', name: 'Deep Learning', category: 'Specialized' },
      { id: 'aiml-nlp', name: 'NLP / Computer Vision', category: 'Specialized' },
      { id: 'aiml-tools', name: 'TensorFlow / PyTorch', category: 'Tools' },
      { id: 'aiml-deploy', name: 'Model Deployment', category: 'Core' },
    ],
    avgSalaryRange: '$80K – $180K',
    difficulty: 'Advanced',
    totalWeeks: 30,
    category: 'Technology',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    tagline: 'Turn raw data into actionable insights',
    icon: 'BarChart3',
    description: 'Collect, clean, and analyze data to help organizations make informed decisions using statistics, SQL, and visualization tools.',
    requiredSkills: [
      { id: 'excel', name: 'Advanced Excel', category: 'Core' },
      { id: 'sql', name: 'SQL', category: 'Core' },
      { id: 'stats', name: 'Statistics', category: 'Core' },
      { id: 'python-data', name: 'Python for Data', category: 'Core' },
      { id: 'data-viz', name: 'Data Visualization', category: 'Core' },
      { id: 'tableau', name: 'Tableau / Power BI', category: 'Tools' },
      { id: 'storytelling', name: 'Data Storytelling', category: 'Soft Skills' },
      { id: 'critical-thinking', name: 'Critical Thinking', category: 'Soft Skills' },
    ],
    avgSalaryRange: '$55K – $110K',
    difficulty: 'Intermediate',
    totalWeeks: 18,
    category: 'Technology',
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    tagline: 'Protect systems from digital threats',
    icon: 'ShieldCheck',
    description: 'Monitor networks, identify vulnerabilities, respond to security incidents, and implement defensive measures to protect organizations.',
    requiredSkills: [
      { id: 'networking', name: 'Networking Fundamentals', category: 'Core' },
      { id: 'linux', name: 'Linux Basics', category: 'Core' },
      { id: 'security-concepts', name: 'Security Concepts', category: 'Core' },
      { id: 'cryptography', name: 'Cryptography Basics', category: 'Core' },
      { id: 'risk-mgmt', name: 'Risk Management', category: 'Core' },
      { id: 'siem', name: 'SIEM Tools', category: 'Tools' },
      { id: 'incident-response', name: 'Incident Response', category: 'Specialized' },
      { id: 'analytical-thinking', name: 'Analytical Thinking', category: 'Soft Skills' },
    ],
    avgSalaryRange: '$70K – $130K',
    difficulty: 'Intermediate',
    totalWeeks: 22,
    category: 'Technology',
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    tagline: 'Build fast, responsive websites and web apps',
    icon: 'Globe',
    description: 'Create websites using HTML, CSS, JavaScript, and modern frameworks. Can specialize in frontend, backend, or full-stack.',
    requiredSkills: [
      { id: 'html-css', name: 'HTML & CSS', category: 'Core' },
      { id: 'javascript', name: 'JavaScript', category: 'Core' },
      { id: 'web-react', name: 'React / Frontend Framework', category: 'Specialized' },
      { id: 'web-responsive', name: 'Responsive Design', category: 'Core' },
      { id: 'web-git', name: 'Git & Deployment', category: 'Tools' },
      { id: 'web-apis', name: 'API Integration', category: 'Core' },
      { id: 'web-seo', name: 'Basic SEO', category: 'Core' },
    ],
    avgSalaryRange: '$50K – $120K',
    difficulty: 'Beginner-friendly',
    totalWeeks: 20,
    category: 'Technology',
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    tagline: 'Craft intuitive, beautiful digital experiences',
    icon: 'PenTool',
    description: 'Research user needs, design wireframes and prototypes, and create visually compelling interfaces that are accessible and delightful.',
    requiredSkills: [
      { id: 'design-principles', name: 'Design Principles', category: 'Core' },
      { id: 'figma', name: 'Figma', category: 'Tools' },
      { id: 'user-research', name: 'User Research', category: 'Core' },
      { id: 'wireframing', name: 'Wireframing & Prototyping', category: 'Core' },
      { id: 'color-typography', name: 'Color & Typography', category: 'Core' },
      { id: 'usability-testing', name: 'Usability Testing', category: 'Core' },
      { id: 'design-systems', name: 'Design Systems', category: 'Specialized' },
      { id: 'communication', name: 'Communication', category: 'Soft Skills' },
    ],
    avgSalaryRange: '$50K – $120K',
    difficulty: 'Beginner-friendly',
    totalWeeks: 20,
    category: 'Technology',
  },
  {
    id: 'fullstack-developer',
    title: 'Full-Stack Developer',
    tagline: 'Master both frontend and backend engineering',
    icon: 'Layers',
    description: 'Build complete web applications end-to-end — from user interfaces to server logic, databases, and deployment.',
    requiredSkills: [
      { id: 'html-css-fs', name: 'HTML & CSS', category: 'Core' },
      { id: 'javascript-fs', name: 'JavaScript', category: 'Core' },
      { id: 'react-fs', name: 'Frontend Framework (React)', category: 'Specialized' },
      { id: 'nodejs', name: 'Node.js / Backend', category: 'Specialized' },
      { id: 'databases-fs', name: 'Databases (SQL + NoSQL)', category: 'Core' },
      { id: 'apis-fs', name: 'API Design', category: 'Core' },
      { id: 'devops', name: 'DevOps Basics', category: 'Specialized' },
      { id: 'git-fs', name: 'Git & Collaboration', category: 'Tools' },
    ],
    avgSalaryRange: '$70K – $160K',
    difficulty: 'Advanced',
    totalWeeks: 28,
    category: 'Technology',
  },

  // ── Healthcare ───────────────────────────────────────────────────────────────
  {
    id: 'doctor',
    title: 'Doctor (MBBS)',
    tagline: 'Diagnose, treat, and care for patients',
    icon: 'Stethoscope',
    description: 'Become a medical doctor through MBBS and further specialization. Requires clearing NEET and completing residency training.',
    requiredSkills: [
      { id: 'doc-bio', name: 'Biology (Botany & Zoology)', category: 'Core' },
      { id: 'doc-chem', name: 'Chemistry', category: 'Core' },
      { id: 'doc-phys', name: 'Physics', category: 'Core' },
      { id: 'doc-anatomy', name: 'Human Anatomy', category: 'Core' },
      { id: 'doc-neet', name: 'NEET Preparation', category: 'Specialized' },
      { id: 'doc-clinical', name: 'Clinical Skills', category: 'Specialized' },
      { id: 'doc-comm', name: 'Patient Communication', category: 'Soft Skills' },
    ],
    avgSalaryRange: '₹60K – ₹5L/mo',
    difficulty: 'Advanced',
    totalWeeks: 72,
    category: 'Healthcare',
  },
  {
    id: 'nurse',
    title: 'Nurse',
    tagline: 'Provide compassionate patient care',
    icon: 'HeartPulse',
    description: 'Become a registered nurse through B.Sc Nursing or GNM. Covers patient care, anatomy, pharmacology, and clinical practice.',
    requiredSkills: [
      { id: 'nur-anatomy', name: 'Anatomy & Physiology', category: 'Core' },
      { id: 'nur-pharma', name: 'Pharmacology', category: 'Core' },
      { id: 'nur-care', name: 'Patient Care Fundamentals', category: 'Core' },
      { id: 'nur-nutrition', name: 'Nutrition', category: 'Core' },
      { id: 'nur-community', name: 'Community Health', category: 'Core' },
      { id: 'nur-clinical', name: 'Clinical Practice', category: 'Specialized' },
      { id: 'nur-comm', name: 'Communication Skills', category: 'Soft Skills' },
    ],
    avgSalaryRange: '₹20K – ₹80K/mo',
    difficulty: 'Intermediate',
    totalWeeks: 48,
    category: 'Healthcare',
  },
  {
    id: 'pharmacist',
    title: 'Pharmacist',
    tagline: 'Expert in medicines and patient therapy',
    icon: 'Pill',
    description: 'Become a licensed pharmacist through B.Pharm or D.Pharm. Covers pharmaceutical chemistry, pharmacology, and dispensing.',
    requiredSkills: [
      { id: 'pharm-chem', name: 'Pharmaceutical Chemistry', category: 'Core' },
      { id: 'pharm-pharma', name: 'Pharmacology', category: 'Core' },
      { id: 'pharm-formulation', name: 'Formulation & Dispensing', category: 'Core' },
      { id: 'pharm-law', name: 'Pharmacy Law & Ethics', category: 'Core' },
      { id: 'pharm-bio', name: 'Pharmaceutics', category: 'Core' },
      { id: 'pharm-clinical', name: 'Clinical Pharmacy', category: 'Specialized' },
    ],
    avgSalaryRange: '₹20K – ₹60K/mo',
    difficulty: 'Intermediate',
    totalWeeks: 48,
    category: 'Healthcare',
  },
  {
    id: 'lab-technician',
    title: 'Lab Technician',
    tagline: 'Run diagnostic tests that save lives',
    icon: 'FlaskConical',
    description: 'Become a medical lab technician through B.Sc MLT or DMLT. Covers pathology, microbiology, biochemistry, and lab equipment.',
    requiredSkills: [
      { id: 'lab-pathology', name: 'Pathology', category: 'Core' },
      { id: 'lab-micro', name: 'Microbiology', category: 'Core' },
      { id: 'lab-biochem', name: 'Biochemistry', category: 'Core' },
      { id: 'lab-hematology', name: 'Hematology', category: 'Core' },
      { id: 'lab-equipment', name: 'Lab Equipment Operation', category: 'Tools' },
      { id: 'lab-safety', name: 'Lab Safety & QC', category: 'Core' },
    ],
    avgSalaryRange: '₹15K – ₹40K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 36,
    category: 'Healthcare',
  },

  // ── Education ────────────────────────────────────────────────────────────────
  {
    id: 'teacher',
    title: 'Teacher (School)',
    tagline: 'Shape young minds in classrooms',
    icon: 'GraduationCap',
    description: 'Become a school teacher through B.Ed and TET/CTET. Requires subject expertise, pedagogy skills, and classroom management.',
    requiredSkills: [
      { id: 'tch-subject-knowledge', name: 'Subject Expertise', category: 'Core' },
      { id: 'tch-pedagogy-gen', name: 'Pedagogy & Teaching Methods', category: 'Core' },
      { id: 'tch-child-dev', name: 'Child Psychology', category: 'Core' },
      { id: 'tch-classroom', name: 'Classroom Management', category: 'Core' },
      { id: 'tch-tech', name: 'Educational Technology', category: 'Tools' },
      { id: 'tch-assessment', name: 'Assessment & Evaluation', category: 'Core' },
      { id: 'tch-comm-gen', name: 'Communication Skills', category: 'Soft Skills' },
    ],
    avgSalaryRange: '₹25K – ₹55K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 36,
    category: 'Education',
  },
  {
    id: 'professor',
    title: 'Professor (College/University)',
    tagline: 'Teach, research, and mentor at higher education',
    icon: 'BookOpen',
    description: 'Become a professor through NET/SET, PhD, and research publications. Requires deep subject knowledge and academic research.',
    requiredSkills: [
      { id: 'prof-subject', name: 'Advanced Subject Knowledge', category: 'Core' },
      { id: 'prof-research', name: 'Research Methodology', category: 'Core' },
      { id: 'prof-net', name: 'NET / SET Preparation', category: 'Specialized' },
      { id: 'prof-publication', name: 'Academic Writing & Publication', category: 'Core' },
      { id: 'prof-teaching', name: 'Higher Education Pedagogy', category: 'Core' },
      { id: 'prof-phd', name: 'PhD Pursuit', category: 'Specialized' },
    ],
    avgSalaryRange: '₹40K – ₹1.5L/mo',
    difficulty: 'Advanced',
    totalWeeks: 72,
    category: 'Education',
  },
  {
    id: 'researcher',
    title: 'Researcher',
    tagline: 'Discover new knowledge through research',
    icon: 'Microscope',
    description: 'Pursue a career in academic or industrial research. Requires specialized knowledge, research methodology, and publication skills.',
    requiredSkills: [
      { id: 'res-method', name: 'Research Methodology', category: 'Core' },
      { id: 'res-stats', name: 'Statistical Analysis', category: 'Core' },
      { id: 'res-writing', name: 'Academic Writing', category: 'Core' },
      { id: 'res-lit', name: 'Literature Review', category: 'Core' },
      { id: 'res-tools', name: 'Research Tools (SPSS, R, Python)', category: 'Tools' },
      { id: 'res-domain', name: 'Domain Expertise', category: 'Specialized' },
      { id: 'res-funding', name: 'Grant Writing', category: 'Soft Skills' },
    ],
    avgSalaryRange: '₹35K – ₹1.2L/mo',
    difficulty: 'Advanced',
    totalWeeks: 60,
    category: 'Education',
  },

  // ── Business & Finance ───────────────────────────────────────────────────────
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    tagline: 'Build and scale your own venture',
    icon: 'Rocket',
    description: 'Start, build, and grow a business. Requires market understanding, product development, fundraising, and leadership skills.',
    requiredSkills: [
      { id: 'ent-market', name: 'Market Research', category: 'Core' },
      { id: 'ent-product', name: 'Product Development', category: 'Core' },
      { id: 'ent-finance', name: 'Financial Management', category: 'Core' },
      { id: 'ent-strategy', name: 'Business Strategy', category: 'Core' },
      { id: 'ent-sales', name: 'Sales & Marketing', category: 'Core' },
      { id: 'ent-leadership', name: 'Leadership & Team Building', category: 'Soft Skills' },
      { id: 'ent-fundraise', name: 'Fundraising & Pitching', category: 'Specialized' },
      { id: 'ent-legal', name: 'Legal & Compliance Basics', category: 'Core' },
    ],
    avgSalaryRange: 'Variable',
    difficulty: 'Advanced',
    totalWeeks: 26,
    category: 'Business & Finance',
  },
  {
    id: 'accountant',
    title: 'Accountant',
    tagline: 'Manage finances and ensure compliance',
    icon: 'Calculator',
    description: 'Become an accountant managing books, taxes, and financial reporting for organizations. Can progress to CA or CMA.',
    requiredSkills: [
      { id: 'acc-bookkeeping', name: 'Bookkeeping', category: 'Core' },
      { id: 'acc-taxation', name: 'Taxation (Direct & Indirect)', category: 'Core' },
      { id: 'acc-audit', name: 'Auditing', category: 'Core' },
      { id: 'acc-finance-acc', name: 'Financial Accounting', category: 'Core' },
      { id: 'acc-tally', name: 'Tally / Accounting Software', category: 'Tools' },
      { id: 'acc-gst', name: 'GST & Compliance', category: 'Core' },
    ],
    avgSalaryRange: '₹20K – ₹80K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 24,
    category: 'Business & Finance',
  },
  {
    id: 'ca',
    title: 'Chartered Accountant (CA)',
    tagline: 'India\'s premier accounting qualification',
    icon: 'Calculator',
    description: 'Clear CA exams conducted by ICAI across three levels: Foundation, Intermediate, and Final. Requires articleship training.',
    requiredSkills: [
      { id: 'ca-foundation', name: 'Accounting Principles', category: 'Core' },
      { id: 'ca-law', name: 'Corporate & Tax Law', category: 'Core' },
      { id: 'ca-audit', name: 'Auditing & Assurance', category: 'Core' },
      { id: 'ca-finance', name: 'Financial Management', category: 'Core' },
      { id: 'ca-costing', name: 'Cost & Management Accounting', category: 'Core' },
      { id: 'ca-articleship', name: 'Articleship Training', category: 'Specialized' },
      { id: 'ca-dt-idt', name: 'Direct & Indirect Taxation', category: 'Core' },
    ],
    avgSalaryRange: '₹50K – ₹3L/mo',
    difficulty: 'Advanced',
    totalWeeks: 48,
    category: 'Business & Finance',
    isExam: true,
  },
  {
    id: 'marketing',
    title: 'Marketing Professional',
    tagline: 'Drive growth through brand and demand',
    icon: 'Megaphone',
    description: 'Plan and execute marketing campaigns across digital and traditional channels. Covers branding, analytics, content, and strategy.',
    requiredSkills: [
      { id: 'mkt-digital', name: 'Digital Marketing', category: 'Core' },
      { id: 'mkt-seo', name: 'SEO & SEM', category: 'Core' },
      { id: 'mkt-social', name: 'Social Media Marketing', category: 'Core' },
      { id: 'mkt-analytics', name: 'Marketing Analytics', category: 'Core' },
      { id: 'mkt-content-mkt', name: 'Content Marketing', category: 'Core' },
      { id: 'mkt-branding', name: 'Brand Strategy', category: 'Core' },
      { id: 'mkt-tools-mkt', name: 'Marketing Tools (GA, Ads)', category: 'Tools' },
      { id: 'mkt-creativity', name: 'Creativity & Copywriting', category: 'Soft Skills' },
    ],
    avgSalaryRange: '₹25K – ₹1L/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 20,
    category: 'Business & Finance',
  },
  {
    id: 'hr',
    title: 'HR Professional',
    tagline: 'Build and nurture great teams',
    icon: 'Users',
    description: 'Manage recruitment, employee relations, performance, training, and organizational development.',
    requiredSkills: [
      { id: 'hr-recruitment', name: 'Recruitment & Selection', category: 'Core' },
      { id: 'hr-labor-law', name: 'Labor Laws & Compliance', category: 'Core' },
      { id: 'hr-performance', name: 'Performance Management', category: 'Core' },
      { id: 'hr-training', name: 'Training & Development', category: 'Core' },
      { id: 'hr-payroll', name: 'Payroll Management', category: 'Core' },
      { id: 'hr-od', name: 'Organizational Development', category: 'Specialized' },
      { id: 'hr-comm', name: 'Interpersonal Skills', category: 'Soft Skills' },
    ],
    avgSalaryRange: '₹25K – ₹90K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 20,
    category: 'Business & Finance',
  },

  // ── Creative Careers ─────────────────────────────────────────────────────────
  {
    id: 'content-creator',
    title: 'Content Creator',
    tagline: 'Build an audience with compelling content',
    icon: 'Video',
    description: 'Create engaging content for YouTube, Instagram, blogs, or podcasts. Requires video editing, storytelling, and personal branding.',
    requiredSkills: [
      { id: 'cc-video', name: 'Video Production & Editing', category: 'Core' },
      { id: 'cc-storytelling', name: 'Storytelling', category: 'Core' },
      { id: 'cc-scripting', name: 'Script Writing', category: 'Core' },
      { id: 'cc-seo-cc', name: 'SEO & YouTube Algorithm', category: 'Core' },
      { id: 'cc-branding', name: 'Personal Branding', category: 'Core' },
      { id: 'cc-analytics', name: 'Content Analytics', category: 'Core' },
      { id: 'cc-tools', name: 'Editing Tools (Premiere, CapCut)', category: 'Tools' },
      { id: 'cc-consistency', name: 'Consistency & Discipline', category: 'Soft Skills' },
    ],
    avgSalaryRange: 'Variable',
    difficulty: 'Beginner-friendly',
    totalWeeks: 16,
    category: 'Creative Careers',
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    tagline: 'Create visual designs that communicate',
    icon: 'PenTool',
    description: 'Design logos, posters, social media graphics, and brand identities. Requires mastery of design tools and visual principles.',
    requiredSkills: [
      { id: 'gd-principles', name: 'Design Principles', category: 'Core' },
      { id: 'gd-illustrator', name: 'Adobe Illustrator', category: 'Tools' },
      { id: 'gd-photoshop', name: 'Adobe Photoshop', category: 'Tools' },
      { id: 'gd-typography', name: 'Typography', category: 'Core' },
      { id: 'gd-color', name: 'Color Theory', category: 'Core' },
      { id: 'gd-branding', name: 'Branding & Identity', category: 'Core' },
      { id: 'gd-portfolio', name: 'Portfolio Building', category: 'Core' },
    ],
    avgSalaryRange: '₹20K – ₹80K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 18,
    category: 'Creative Careers',
  },
  {
    id: 'writer',
    title: 'Writer / Author',
    tagline: 'Craft words that inform, inspire, and entertain',
    icon: 'PenLine',
    description: 'Write books, articles, scripts, or copy. Specialize in fiction, non-fiction, technical writing, or copywriting.',
    requiredSkills: [
      { id: 'wrt-grammar', name: 'Grammar & Language Mastery', category: 'Core' },
      { id: 'wrt-structure', name: 'Story Structure & Narrative', category: 'Core' },
      { id: 'wrt-research-wrt', name: 'Research Skills', category: 'Core' },
      { id: 'wrt-editing', name: 'Editing & Proofreading', category: 'Core' },
      { id: 'wrt-seo-wrt', name: 'SEO Writing (for web)', category: 'Core' },
      { id: 'wrt-publishing', name: 'Publishing & Self-Publishing', category: 'Specialized' },
      { id: 'wrt-discipline', name: 'Writing Discipline', category: 'Soft Skills' },
    ],
    avgSalaryRange: '₹15K – ₹1L/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 16,
    category: 'Creative Careers',
  },
  {
    id: 'animator',
    title: 'Animator',
    tagline: 'Bring characters and stories to life',
    icon: 'Film',
    description: 'Create 2D or 3D animations for films, games, and digital media. Requires artistic skill and mastery of animation software.',
    requiredSkills: [
      { id: 'ani-drawing', name: 'Drawing & Sketching', category: 'Core' },
      { id: 'ani-principles', name: 'Animation Principles', category: 'Core' },
      { id: 'ani-2d', name: '2D Animation (Animate / Toon Boom)', category: 'Tools' },
      { id: 'ani-3d', name: '3D Animation (Blender / Maya)', category: 'Tools' },
      { id: 'ani-storyboard', name: 'Storyboarding', category: 'Core' },
      { id: 'ani-rigging', name: 'Rigging & Character Setup', category: 'Specialized' },
      { id: 'ani-portfolio', name: 'Showreel & Portfolio', category: 'Core' },
    ],
    avgSalaryRange: '₹25K – ₹90K/mo',
    difficulty: 'Intermediate',
    totalWeeks: 24,
    category: 'Creative Careers',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    tagline: 'Grow brands online with data-driven campaigns',
    icon: 'TrendingUp',
    description: 'Specialize in paid ads, SEO, social media, email marketing, and conversion optimization for businesses.',
    requiredSkills: [
      { id: 'dm-ads', name: 'Google & Meta Ads', category: 'Core' },
      { id: 'dm-seo', name: 'SEO & Content Strategy', category: 'Core' },
      { id: 'dm-analytics', name: 'Google Analytics & Tag Manager', category: 'Tools' },
      { id: 'dm-email', name: 'Email Marketing', category: 'Core' },
      { id: 'dm-funnel', name: 'Funnel Optimization', category: 'Core' },
      { id: 'dm-copy', name: 'Copywriting', category: 'Core' },
      { id: 'dm-cro', name: 'Conversion Rate Optimization', category: 'Specialized' },
    ],
    avgSalaryRange: '₹25K – ₹1L/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 16,
    category: 'Creative Careers',
  },

  // ── Other Careers ────────────────────────────────────────────────────────────
  {
    id: 'agriculture',
    title: 'Agriculture / Agribusiness',
    tagline: 'Modern farming and agricultural innovation',
    icon: 'Wheat',
    description: 'Pursue careers in farming, agronomy, agricultural technology, or agribusiness management.',
    requiredSkills: [
      { id: 'agronomy', name: 'Agronomy & Crop Science', category: 'Core' },
      { id: 'agri-soil', name: 'Soil Management', category: 'Core' },
      { id: 'agri-tech', name: 'Agricultural Technology', category: 'Specialized' },
      { id: 'agri-business', name: 'Agribusiness Management', category: 'Core' },
      { id: 'agri-irrigation', name: 'Irrigation & Water Management', category: 'Core' },
      { id: 'agri-marketing', name: 'Agricultural Marketing', category: 'Core' },
    ],
    avgSalaryRange: '₹20K – ₹70K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 24,
    category: 'Other Careers',
  },
  {
    id: 'law',
    title: 'Lawyer / Legal Professional',
    tagline: 'Advocate for justice and legal counsel',
    icon: 'Scale',
    description: 'Practice law after LLB and Bar Council registration. Can specialize in criminal, civil, corporate, or constitutional law.',
    requiredSkills: [
      { id: 'law-constitutional', name: 'Constitutional Law', category: 'Core' },
      { id: 'law-criminal', name: 'Criminal Law', category: 'Core' },
      { id: 'law-civil', name: 'Civil Law & Procedure', category: 'Core' },
      { id: 'law-corporate', name: 'Corporate Law', category: 'Specialized' },
      { id: 'law-research', name: 'Legal Research', category: 'Core' },
      { id: 'law-argument', name: 'Argument & Drafting', category: 'Core' },
      { id: 'law-clat', name: 'CLAT Preparation (if entering NLU)', category: 'Specialized' },
    ],
    avgSalaryRange: '₹30K – ₹2L/mo',
    difficulty: 'Advanced',
    totalWeeks: 48,
    category: 'Other Careers',
  },
  {
    id: 'civil-engineering',
    title: 'Civil Engineer',
    tagline: 'Design and build infrastructure',
    icon: 'HardHat',
    description: 'Plan, design, and supervise construction of buildings, roads, bridges, and infrastructure projects.',
    requiredSkills: [
      { id: 'ce-maths', name: 'Engineering Mathematics', category: 'Core' },
      { id: 'ce-mechanics', name: 'Engineering Mechanics', category: 'Core' },
      { id: 'ce-structural', name: 'Structural Analysis', category: 'Core' },
      { id: 'ce-concrete', name: 'Concrete & Steel Design', category: 'Core' },
      { id: 'ce-surveying', name: 'Surveying', category: 'Tools' },
      { id: 'ce-geotech', name: 'Geotechnical Engineering', category: 'Core' },
      { id: 'ce-software', name: 'AutoCAD / Civil 3D', category: 'Tools' },
    ],
    avgSalaryRange: '₹25K – ₹80K/mo',
    difficulty: 'Intermediate',
    totalWeeks: 48,
    category: 'Other Careers',
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Hotel Management',
    tagline: 'Create exceptional guest experiences',
    icon: 'Utensils',
    description: 'Work in hotels, restaurants, event management, or tourism. Covers operations, guest services, and management.',
    requiredSkills: [
      { id: 'hos-operations', name: 'Hotel Operations', category: 'Core' },
      { id: 'hos-fnb', name: 'Food & Beverage Service', category: 'Core' },
      { id: 'hos-front-office', name: 'Front Office Management', category: 'Core' },
      { id: 'hos-guest', name: 'Guest Experience', category: 'Core' },
      { id: 'hos-communication', name: 'Communication Skills', category: 'Soft Skills' },
      { id: 'hos-event', name: 'Event Management', category: 'Specialized' },
    ],
    avgSalaryRange: '₹18K – ₹60K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 24,
    category: 'Other Careers',
  },
  {
    id: 'skilled-trades',
    title: 'Skilled Trades',
    tagline: 'Essential hands-on technical careers',
    icon: 'Wrench',
    description: 'Pursue careers in electrician, plumbing, welding, carpentry, or ITI trades. High demand with practical training.',
    requiredSkills: [
      { id: 'trade-basics', name: 'Trade Fundamentals', category: 'Core' },
      { id: 'trade-safety', name: 'Workplace Safety', category: 'Core' },
      { id: 'trade-tools', name: 'Tool Operation', category: 'Tools' },
      { id: 'trade-reading', name: 'Technical Drawing Reading', category: 'Core' },
      { id: 'trade-practical', name: 'Practical Training', category: 'Specialized' },
      { id: 'trade-cert', name: 'ITI / Certification', category: 'Core' },
    ],
    avgSalaryRange: '₹15K – ₹50K/mo',
    difficulty: 'Beginner-friendly',
    totalWeeks: 24,
    category: 'Other Careers',
  },
];

// ─── Category metadata ─────────────────────────────────────────────────────────

export const careerCategories: { name: string; icon: string; color: string }[] = [
  { name: 'Government Jobs', icon: 'Landmark', color: 'from-blue-400 to-blue-500' },
  { name: 'Technology', icon: 'Code2', color: 'from-teal-400 to-teal-500' },
  { name: 'Healthcare', icon: 'Stethoscope', color: 'from-rose-400 to-rose-500' },
  { name: 'Education', icon: 'GraduationCap', color: 'from-amber-400 to-amber-500' },
  { name: 'Business & Finance', icon: 'Briefcase', color: 'from-emerald-400 to-emerald-500' },
  { name: 'Creative Careers', icon: 'Palette', color: 'from-purple-400 to-purple-500' },
  { name: 'Other Careers', icon: 'Compass', color: 'from-cyan-400 to-cyan-500' },
];

export const allSkillPool: string[] = Array.from(new Set(
  careers.flatMap(c => c.requiredSkills.map(s => s.name))
)).sort();

// ─── Roadmap Generation ────────────────────────────────────────────────────────

export function getCareer(id: string): Career | undefined {
  return careers.find(c => c.id === id);
}

export function generateRoadmap(
  careerId: string,
  currentSkills: string[],
  examDetails?: ExamDetails | null,
  customGoal?: CustomGoal | null
): Milestone[] {
  // Handle custom goal
  if (careerId === 'custom' && customGoal) {
    return generateCustomRoadmap(customGoal, currentSkills);
  }

  const career = getCareer(careerId);
  if (!career) return [];

  if (career.isExam) {
    return generateExamRoadmap(career, currentSkills, examDetails);
  }

  return generateStandardRoadmap(career, currentSkills);
}

function generateStandardRoadmap(career: Career, currentSkills: string[]): Milestone[] {
  const all = career.requiredSkills;
  const phases = 4;
  const perPhase = Math.ceil(all.length / phases);
  const milestones: Milestone[] = [];
  const phaseTitles = [
    'Foundation & Core Concepts',
    'Building Practical Skills',
    'Advanced Topics & Projects',
    'Portfolio & Job Readiness',
  ];

  for (let phase = 0; phase < phases; phase++) {
    const phaseSkills = all.slice(phase * perPhase, (phase + 1) * perPhase);
    if (phaseSkills.length === 0) continue;

    const completedCount = phaseSkills.filter(s => currentSkills.includes(s.name)).length;
    const isFullyComplete = completedCount === phaseSkills.length;

    milestones.push({
      id: `${career.id}-phase-${phase + 1}`,
      title: `Phase ${phase + 1}: ${phaseTitles[phase]}`,
      description: `Master ${phaseSkills.map(s => s.name).join(', ')} through guided learning and hands-on exercises.`,
      skills: phaseSkills.map(s => s.name),
      estimatedWeeks: Math.ceil(career.totalWeeks / phases),
      resources: getResourcesForPhase(career.id, phase),
      completed: isFullyComplete,
      phase: phase + 1,
    });
  }

  return milestones;
}

function generateExamRoadmap(
  career: Career,
  currentSkills: string[],
  examDetails?: ExamDetails | null
): Milestone[] {
  const all = career.requiredSkills;
  const level = examDetails?.preparationLevel ?? 'Beginner';
  const baseWeeks = career.totalWeeks;

  // For exam prep, use a 5-phase structure: Foundation, Syllabus Coverage, Revision, Mock Tests, Final Sprint
  const phases: { title: string; description: string; skills: typeof all; weeks: number; resources: Milestone['resources'] }[] = [
    {
      title: 'Phase 1: Foundation & Syllabus Familiarization',
      description: `Understand the exam pattern, syllabus structure, and build foundational knowledge. ${level === 'Beginner' ? 'Start from the basics.' : level === 'Intermediate' ? 'Review and strengthen your foundation.' : 'Quick review and gap filling.'}`,
      skills: all.slice(0, Math.ceil(all.length * 0.3)),
      weeks: Math.ceil(baseWeeks * 0.25),
      resources: getExamResources(career.id, 'foundation'),
    },
    {
      title: 'Phase 2: Complete Syllabus Coverage',
      description: 'Systematically cover all subjects in the syllabus with notes and concept clarity.',
      skills: all.slice(Math.ceil(all.length * 0.3), Math.ceil(all.length * 0.6)),
      weeks: Math.ceil(baseWeeks * 0.3),
      resources: getExamResources(career.id, 'coverage'),
    },
    {
      title: 'Phase 3: Revision & Consolidation',
      description: 'Revise all topics, create short notes, and consolidate key concepts for quick recall.',
      skills: all.slice(Math.ceil(all.length * 0.6), Math.ceil(all.length * 0.8)),
      weeks: Math.ceil(baseWeeks * 0.15),
      resources: getExamResources(career.id, 'revision'),
    },
    {
      title: 'Phase 4: Mock Tests & Practice',
      description: 'Take full-length mock tests, analyze performance, and practice answer writing under time pressure.',
      skills: all.slice(Math.ceil(all.length * 0.8)),
      weeks: Math.ceil(baseWeeks * 0.15),
      resources: getExamResources(career.id, 'mock'),
    },
    {
      title: 'Phase 5: Final Sprint & Interview Prep',
      description: 'Last-mile revision, current affairs update, and personality test / interview preparation.',
      skills: [],
      weeks: Math.ceil(baseWeeks * 0.15),
      resources: getExamResources(career.id, 'final'),
    },
  ];

  return phases.map((phase, idx) => {
    const completedCount = phase.skills.filter(s => currentSkills.includes(s.name)).length;
    const isFullyComplete = phase.skills.length > 0 && completedCount === phase.skills.length;

    return {
      id: `${career.id}-exam-phase-${idx + 1}`,
      title: phase.title,
      description: phase.description,
      skills: phase.skills.map(s => s.name),
      estimatedWeeks: phase.weeks,
      resources: phase.resources,
      completed: isFullyComplete,
      phase: idx + 1,
    };
  });
}

function generateCustomRoadmap(customGoal: CustomGoal, currentSkills: string[]): Milestone[] {
  const skills = customGoal.skills.length > 0
    ? customGoal.skills
    : ['Research & Planning', 'Core Skills Development', 'Practical Application', 'Portfolio & Networking'];

  const phases = 4;
  const perPhase = Math.ceil(skills.length / phases);
  const milestones: Milestone[] = [];

  const phaseTitles = [
    'Foundation & Research',
    'Building Core Skills',
    'Practice & Application',
    'Portfolio & Next Steps',
  ];

  for (let phase = 0; phase < phases; phase++) {
    const phaseSkills = skills.slice(phase * perPhase, (phase + 1) * perPhase);
    if (phaseSkills.length === 0) continue;

    const completedCount = phaseSkills.filter(s => currentSkills.includes(s)).length;
    const isFullyComplete = completedCount === phaseSkills.length;

    milestones.push({
      id: `custom-phase-${phase + 1}`,
      title: `Phase ${phase + 1}: ${phaseTitles[phase]}`,
      description: `Focus on: ${phaseSkills.join(', ')}. ${customGoal.description || 'Work through these skills systematically.'}`,
      skills: phaseSkills,
      estimatedWeeks: 4,
      resources: [
        { name: 'YouTube Tutorials', url: 'https://www.youtube.com', type: 'free' },
        { name: 'Google Search', url: 'https://www.google.com', type: 'free' },
        { name: 'Wikipedia', url: 'https://www.wikipedia.org', type: 'free' },
      ],
      completed: isFullyComplete,
      phase: phase + 1,
    });
  }

  return milestones;
}

function getResourcesForPhase(careerId: string, phase: number): Milestone['resources'] {
  const commonFree = [
    { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', type: 'free' as const },
    { name: 'YouTube Tutorials', url: 'https://www.youtube.com', type: 'free' as const },
    { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'free' as const },
  ];

  const resources: Record<string, Milestone['resources'][]> = {
    'software-developer': [
      [...commonFree, { name: 'The Odin Project', url: 'https://www.theodinproject.com', type: 'free' }],
      [{ name: 'CS50 (Harvard)', url: 'https://cs50.harvard.edu', type: 'free' }, { name: 'LeetCode', url: 'https://leetcode.com', type: 'free' }],
      [{ name: 'Frontend Masters', url: 'https://frontendmasters.com', type: 'paid' }, { name: 'Exercism', url: 'https://exercism.org', type: 'free' }],
      [{ name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'free' }],
    ],
    'ai-ml-engineer': [
      [{ name: 'Andrew Ng ML Course', url: 'https://www.coursera.org/specializations/machine-learning', type: 'free' }, ...commonFree],
      [{ name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', type: 'free' }, { name: 'fast.ai', url: 'https://www.fast.ai', type: 'free' }],
      [{ name: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', type: 'paid' }, { name: 'Papers With Code', url: 'https://paperswithcode.com', type: 'free' }],
      [{ name: 'Hugging Face Course', url: 'https://huggingface.co/learn', type: 'free' }],
    ],
    'ui-ux-designer': [
      [{ name: 'Google UX Course', url: 'https://www.coursera.org/google-gsx', type: 'free' }, { name: 'Figma Academy', url: 'https://www.figma.com/academy', type: 'free' }],
      [{ name: 'Nielsen Norman Group', url: 'https://www.nngroup.com', type: 'free' }, { name: 'Refactoring UI', url: 'https://www.refactoringui.com', type: 'paid' }],
      [{ name: 'Dribbble - Inspire', url: 'https://dribbble.com', type: 'free' }, { name: 'Behance', url: 'https://www.behance.net', type: 'free' }],
      [{ name: 'Case Study Club', url: 'https://www.casestudy.club', type: 'free' }],
    ],
    'data-analyst': [
      [{ name: 'Khan Academy - Stats', url: 'https://www.khanacademy.org', type: 'free' }, { name: 'SQLZoo', url: 'https://sqlzoo.net', type: 'free' }],
      [{ name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', type: 'free' }, { name: 'DataCamp', url: 'https://www.datacamp.com', type: 'paid' }],
      [{ name: 'Tableau Public', url: 'https://public.tableau.com', type: 'free' }, { name: 'Google Data Analytics', url: 'https://www.coursera.org', type: 'paid' }],
      [{ name: 'Analytics Vidhya', url: 'https://www.analyticsvidhya.com', type: 'free' }],
    ],
    'cybersecurity-analyst': [
      [{ name: 'TryHackMe', url: 'https://www.tryhackme.com', type: 'freemium' }, { name: 'Professor Messer', url: 'https://www.professormesser.com', type: 'free' }],
      [{ name: 'HackTheBox Academy', url: 'https://academy.hackthebox.com', type: 'freemium' }, { name: 'Cybrary', url: 'https://www.cybrary.it', type: 'freemium' }],
      [{ name: 'Security+ Prep', url: 'https://www.comptia.org', type: 'paid' }, { name: 'OWASP', url: 'https://owasp.org', type: 'free' }],
      [{ name: 'Blue Team Labs', url: 'https://blueteamlabs.online', type: 'freemium' }],
    ],
    'fullstack-developer': [
      [{ name: 'The Odin Project', url: 'https://www.theodinproject.com', type: 'free' }, { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'free' }],
      [{ name: 'React Docs', url: 'https://react.dev', type: 'free' }, { name: 'Full Stack Open', url: 'https://fullstackopen.com', type: 'free' }],
      [{ name: 'Frontend Masters', url: 'https://frontendmasters.com', type: 'paid' }, { name: 'Node.js Docs', url: 'https://nodejs.org', type: 'free' }],
      [{ name: 'Docker Basics', url: 'https://www.docker.com', type: 'free' }, { name: 'Roadmap.sh', url: 'https://roadmap.sh', type: 'free' }],
    ],
    'web-developer': [
      [{ name: 'The Odin Project', url: 'https://www.theodinproject.com', type: 'free' }, { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'free' }],
      [{ name: 'React Docs', url: 'https://react.dev', type: 'free' }, { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', type: 'free' }],
      [{ name: 'Frontend Masters', url: 'https://frontendmasters.com', type: 'paid' }, { name: 'CSS Tricks', url: 'https://css-tricks.com', type: 'free' }],
      [{ name: 'Vercel Deploy Guide', url: 'https://vercel.com/docs', type: 'free' }],
    ],
  };

  return resources[careerId]?.[phase] ?? commonFree;
}

function getExamResources(careerId: string, stage: string): Milestone['resources'] {
  const generalExamResources: Milestone['resources'] = [
    { name: 'Unacademy', url: 'https://unacademy.com', type: 'freemium' },
    { name: 'StudyIQ', url: 'https://www.studyiq.com', type: 'freemium' },
    { name: 'YouTube - Free Lectures', url: 'https://www.youtube.com', type: 'free' },
    { name: 'BYJU\'S Exam Prep', url: 'https://byjusexamprep.com', type: 'freemium' },
  ];

  const specificResources: Record<string, Record<string, Milestone['resources']>> = {
    'upsc-ias': {
      foundation: [{ name: 'NCERT Books (6-12)', url: 'https://ncert.nic.in', type: 'free' }, ...generalExamResources],
      coverage: [{ name: 'Laxmikanth - Polity', url: 'https://www.amazon.in', type: 'paid' }, { name: 'Spectrum - Modern History', url: 'https://www.amazon.in', type: 'paid' }, ...generalExamResources.slice(0, 2)],
      revision: [{ name: 'Vision IAS Current Affairs', url: 'https://www.visionias.in', type: 'freemium' }, { name: 'PMF IAS', url: 'https://www.pmfias.com', type: 'free' }],
      mock: [{ name: 'Vision IAS Test Series', url: 'https://www.visionias.in', type: 'paid' }, { name: 'Insights Test Series', url: 'https://www.insightsonindia.com', type: 'freemium' }],
      final: [{ name: 'Mock Interviews', url: 'https://www.youtube.com', type: 'free' }, { name: 'PT\'s IAS Academy', url: 'https://www.pteducation.com', type: 'freemium' }],
    },
    'ssc-cgl': {
      foundation: [{ name: 'SSC Study Pack', url: 'https://www.adda247.com', type: 'freemium' }, ...generalExamResources],
      coverage: [{ name: 'Kiran Publications', url: 'https://www.kiranbooks.com', type: 'paid' }, { name: 'Pinnacle SSC', url: 'https://www.pinnaclecoachingcenter.com', type: 'freemium' }],
      revision: [{ name: 'Adda247 Revision', url: 'https://www.adda247.com', type: 'freemium' }, ...generalExamResources.slice(0, 2)],
      mock: [{ name: 'Testbook Mock Tests', url: 'https://www.testbook.com', type: 'freemium' }, { name: 'SSC Tube', url: 'https://www.ssctube.com', type: 'free' }],
      final: [...generalExamResources.slice(0, 2), { name: 'Previous Year Papers', url: 'https://www.testbook.com', type: 'free' }],
    },
    'banking-po': {
      foundation: [{ name: 'Adda247 Banking', url: 'https://www.adda247.com', type: 'freemium' }, ...generalExamResources],
      coverage: [{ name: 'BankersAdda Daily', url: 'https://www.bankersadda.com', type: 'free' }, { name: 'Oliveboard', url: 'https://www.oliveboard.in', type: 'freemium' }],
      revision: [{ name: 'Banking Awareness', url: 'https://www.bankersadda.com', type: 'free' }, ...generalExamResources.slice(0, 2)],
      mock: [{ name: 'Oliveboard Mock Tests', url: 'https://www.oliveboard.in', type: 'freemium' }, { name: 'Smartkeeda', url: 'https://www.smartkeeda.com', type: 'freemium' }],
      final: [{ name: 'Interview Prep - BankersAdda', url: 'https://www.bankersadda.com', type: 'free' }, ...generalExamResources.slice(0, 1)],
    },
  };

  return specificResources[careerId]?.[stage] ?? generalExamResources;
}

// ─── Search helpers ─────────────────────────────────────────────────────────────

export function searchCareers(query: string): Career[] {
  const q = query.toLowerCase().trim();
  if (!q) return careers;
  return careers.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.tagline.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q)
  );
}

export function getCareersByCategory(category: string): Career[] {
  return careers.filter(c => c.category === category);
}
