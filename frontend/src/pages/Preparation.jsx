import React, { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw, Copy, CheckCircle2, BookOpen, Filter, MessageSquare, Save, Download } from 'lucide-react';

const EnhancedInterviewQuestionsGenerator = () => {
  const [jobRole, setJobRole] = useState('Software Engineer');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [showAnswers, setShowAnswers] = useState({});
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const jobRoles = [
    'Software Engineer',
    'Data Analyst',
    'Product Manager',
    'UX Designer',
    'DevOps Engineer',
    'Full Stack Developer'
  ];

  const difficulties = ['All', 'Basic', 'Intermediate', 'Advanced'];

  // Simulated API call to fetch questions
  const fetchQuestions = async (role) => {
    setLoading(true);
    
    // In a real application, this would be an API call to your backend
    // that would either fetch from MongoDB or call OpenAI API
    setTimeout(() => {
      const mockQuestions = generateMockQuestions(role);
      setQuestions(mockQuestions);
      setShowAnswers({});
      setLoading(false);
    }, 1500); // Simulate network delay
  };

  // This function simulates what your backend would do
  const generateMockQuestions = (role) => {
    const commonQuestions = [
      {
        question: "Tell me about your experience with team collaboration.",
        answer: "In my experience, effective team collaboration relies on clear communication, defined roles, and mutual respect. I use tools like Slack, Jira, and regular stand-ups to ensure everyone stays aligned. I believe in addressing conflicts early and focusing on solutions rather than problems.",
        difficulty: "Basic"
      },
      {
        question: "How do you handle tight deadlines?",
        answer: "I approach tight deadlines by first breaking down the project into manageable tasks and prioritizing them. I communicate early if I foresee any blockers, collaborate with team members when needed, and focus on delivering the most critical functionalities first. I'm also honest about what can realistically be accomplished in the timeframe.",
        difficulty: "Intermediate"
      },
      {
        question: "Describe a challenging project you worked on.",
        answer: "I once worked on a project with shifting requirements and a tight deadline. I managed this by implementing an agile approach, maintaining open communication with stakeholders, and setting clear expectations. Despite the challenges, we delivered a successful product by focusing on core requirements and iterating based on feedback.",
        difficulty: "Intermediate"
      }
    ];
    
    const roleSpecificQuestions = {
      'Software Engineer': [
        {
          question: "Explain the concept of time complexity and give an example.",
          answer: "Time complexity describes how the runtime of an algorithm grows as the input size increases. For example, a linear search algorithm has O(n) time complexity because in the worst case, it needs to check each element once. A binary search, on the other hand, has O(log n) complexity since it halves the search space with each comparison.",
          difficulty: "Intermediate"
        },
        {
          question: "How would you optimize a slow-running SQL query?",
          answer: "To optimize a slow SQL query, I would: 1) Analyze the execution plan to identify bottlenecks, 2) Add appropriate indexes for frequently filtered columns, 3) Avoid SELECT * and retrieve only necessary columns, 4) Use JOINs efficiently and consider denormalization for read-heavy operations, 5) Consider query caching if applicable, and 6) Break complex queries into simpler ones when possible.",
          difficulty: "Advanced"
        },
        {
          question: "Describe your experience with CI/CD pipelines.",
          answer: "I've set up CI/CD pipelines using tools like Jenkins, GitHub Actions, and GitLab CI. These pipelines automated the build process, ran unit and integration tests, performed code quality checks, and deployed to staging and production environments. This approach significantly reduced deployment errors and improved team productivity.",
          difficulty: "Intermediate"
        },
        {
          question: "What's your approach to writing maintainable code?",
          answer: "I write maintainable code by following SOLID principles, using descriptive naming conventions, keeping functions small and focused, writing comprehensive tests, and adding meaningful comments when necessary. I also regularly refactor code to improve its structure without changing functionality and conduct code reviews to ensure quality.",
          difficulty: "Basic"
        },
        {
          question: "How do you handle merge conflicts in Git?",
          answer: "When handling merge conflicts in Git, I first understand what caused the conflict by examining the changes in both branches. I then decide how to resolve each conflict, either by keeping one version, combining both, or creating a new solution. After resolving conflicts manually in the code, I run tests to ensure functionality remains intact before committing the merged changes.",
          difficulty: "Basic"
        }
      ],
      'Data Analyst': [
        {
          question: "Explain the difference between supervised and unsupervised learning.",
          answer: "Supervised learning uses labeled data where algorithms learn to map inputs to known outputs (like classification or regression). Unsupervised learning works with unlabeled data to identify patterns or structures (like clustering or dimensionality reduction). While supervised learning evaluates performance against known results, unsupervised learning seeks to discover hidden patterns without predefined correct answers.",
          difficulty: "Intermediate"
        },
        {
          question: "How would you handle missing data in a dataset?",
          answer: "My approach to missing data depends on the amount and pattern. For small random gaps, I might use imputation methods like mean/median replacement, k-nearest neighbors, or regression models. For larger structured missing data, I might use multiple imputation or model-based approaches. In some cases, removing rows or columns might be appropriate if the missing data is substantial and not critical to the analysis.",
          difficulty: "Intermediate"
        },
        {
          question: "Describe a complex data analysis you've performed.",
          answer: "I conducted a churn prediction analysis combining customer behavioral data, demographic information, and service usage patterns. I cleaned and transformed the data, engineered relevant features, and tested various models including logistic regression, random forests, and gradient boosting. The final model achieved 85% accuracy and identified key factors driving customer churn, which informed business strategy changes that reduced churn by 12%.",
          difficulty: "Advanced"
        },
        {
          question: "How do you validate the accuracy of your analysis?",
          answer: "I validate analysis accuracy through cross-validation techniques, testing on hold-out data, and comparing results against baselines. I also use statistical significance tests, examine confidence intervals, perform sensitivity analysis, and validate findings with domain experts. For predictive models, I evaluate using appropriate metrics (accuracy, precision, recall, F1, etc.) depending on the problem context.",
          difficulty: "Advanced"
        },
        {
          question: "What visualization tools do you have experience with?",
          answer: "I'm proficient with various visualization tools including Tableau, Power BI, and programming libraries like Matplotlib, Seaborn, and ggplot2 in Python and R. I select tools based on the audience and complexity - using interactive dashboards for stakeholders and code-based visualizations for detailed technical analysis or when automation is needed.",
          difficulty: "Basic"
        }
      ],
      'Product Manager': [
        {
          question: "How do you prioritize product features?",
          answer: "I prioritize features using a framework that considers business value, user impact, strategic alignment, and implementation effort. I use methods like the RICE scoring model (Reach, Impact, Confidence, Effort) or the MoSCoW method (Must-have, Should-have, Could-have, Won't-have). I also incorporate quantitative data from analytics and qualitative feedback from user research to inform these decisions.",
          difficulty: "Intermediate"
        },
        {
          question: "Describe how you would launch a new product.",
          answer: "For a product launch, I follow a structured approach: 1) Define clear success metrics and launch objectives; 2) Create a detailed go-to-market plan with marketing, sales, and customer support; 3) Develop comprehensive documentation and training materials; 4) Implement a phased rollout strategy starting with beta users; 5) Monitor performance closely post-launch; and 6) Gather feedback for immediate improvements and future iterations.",
          difficulty: "Advanced"
        },
        {
          question: "How do you gather and incorporate user feedback?",
          answer: "I gather user feedback through multiple channels: direct user interviews, usability testing, surveys, analytics data, support tickets, and social media monitoring. I categorize feedback by theme, prioritize based on frequency and impact, and then incorporate insights into the product roadmap. I believe in closing the feedback loop by communicating to users how their input shaped product decisions.",
          difficulty: "Basic"
        },
        {
          question: "Describe your experience with agile methodologies.",
          answer: "I've worked extensively with Scrum and Kanban methodologies. I facilitate sprint planning, daily stand-ups, retrospectives, and work closely with development teams to ensure proper backlog grooming and story point estimation. I've found that agile approaches lead to better products by enabling quick iterations based on user feedback and changing requirements.",
          difficulty: "Intermediate"
        },
        {
          question: "How do you balance business needs with technical constraints?",
          answer: "Balancing business needs with technical constraints requires strong communication between product and engineering teams. I facilitate this by ensuring engineers understand business objectives and priorities, while helping business stakeholders appreciate technical complexities and trade-offs. I focus on finding solutions that meet core business needs while respecting technical limitations, sometimes by phasing implementation or finding creative alternatives.",
          difficulty: "Advanced"
        }
      ],
      'UX Designer': [
        {
          question: "Walk me through your design process.",
          answer: "My design process begins with research to understand user needs and business goals. I then define the problem and create user personas. Next, I sketch ideas and develop wireframes to establish information architecture. After validating these with stakeholders, I create high-fidelity mockups and interactive prototypes for user testing. Finally, I work with developers during implementation and gather post-launch feedback for future improvements.",
          difficulty: "Basic"
        },
        {
          question: "How do you incorporate user feedback into your designs?",
          answer: "I collect user feedback through usability testing, interviews, surveys, and analytics. I organize findings into patterns and prioritize them based on frequency and impact. For major issues, I create alternative solutions and test them with users before implementation. I maintain a collaborative approach with stakeholders throughout this process and document design decisions influenced by user feedback.",
          difficulty: "Intermediate"
        },
        {
          question: "Describe a time when you had to compromise on a design.",
          answer: "I once designed an ideal checkout flow that was estimated to take three development sprints to implement. Due to business priorities, we needed to launch sooner. I worked with developers to identify a simplified version that preserved the core user experience improvements while reducing technical complexity. This compromise allowed us to launch on schedule while planning for the full implementation in a future release.",
          difficulty: "Intermediate"
        },
        {
          question: "How do you balance aesthetics with functionality?",
          answer: "I believe good design must be both beautiful and functional. I start by ensuring core functionality and usability needs are met through user flows and information architecture. Then I apply visual design principles to create an aesthetically pleasing experience that supports these functions. I validate designs through user testing to ensure aesthetic choices enhance rather than hinder usability.",
          difficulty: "Advanced"
        },
        {
          question: "What methods do you use for user research?",
          answer: "I use various research methods depending on project needs: interviews and contextual inquiry for deep qualitative insights; surveys for quantitative data; card sorting and tree testing for information architecture; usability testing for evaluation; and analytics review for behavioral patterns. I select methods based on research questions, project stage, timeline, and available resources.",
          difficulty: "Basic"
        }
      ],
      'DevOps Engineer': [
        {
          question: "Explain your experience with container orchestration.",
          answer: "I've worked extensively with Kubernetes for container orchestration, managing clusters across multiple environments. I've implemented auto-scaling, rolling updates, service discovery, and load balancing. I've also used Helm for package management and set up monitoring with Prometheus and Grafana. This orchestration significantly improved our deployment reliability and resource utilization.",
          difficulty: "Advanced"
        },
        {
          question: "How would you set up a CI/CD pipeline from scratch?",
          answer: "To set up a CI/CD pipeline from scratch, I would: 1) Choose appropriate tools (e.g., Jenkins, GitHub Actions, or GitLab CI); 2) Configure version control integration; 3) Implement automated builds and testing; 4) Set up code quality checks; 5) Configure deployment to staging and production environments; 6) Implement monitoring and alerting; and 7) Document the process for the team. I'd use infrastructure as code to make the pipeline itself reproducible and maintainable.",
          difficulty: "Advanced"
        },
        {
          question: "Describe your approach to infrastructure as code.",
          answer: "I approach infrastructure as code by using tools like Terraform, CloudFormation, or Pulumi to define all infrastructure components declaratively. I maintain these configurations in version control alongside application code, apply the same review process, and automate testing and deployment of infrastructure changes. This ensures consistency across environments, simplifies rollbacks, and provides documentation of the entire infrastructure.",
          difficulty: "Intermediate"
        },
        {
          question: "How do you handle security in a cloud environment?",
          answer: "For cloud security, I implement defense in depth with multiple security layers. This includes: proper IAM configuration with least privilege principles; network security through VPCs, security groups, and NACLs; encryption for data at rest and in transit; regular security scanning and patching; monitoring and alerting for suspicious activities; and automated compliance checks. I also follow security best practices specific to each cloud provider.",
          difficulty: "Advanced"
        },
        {
          question: "What monitoring tools have you worked with?",
          answer: "I've worked with various monitoring tools including Prometheus, Grafana, ELK Stack (Elasticsearch, Logstash, Kibana), Datadog, and New Relic. I set up comprehensive monitoring covering infrastructure metrics, application performance, logs, and alerts. I believe in monitoring not just for detecting issues but also for capacity planning and performance optimization.",
          difficulty: "Basic"
        }
      ],
      'Full Stack Developer': [
        {
          question: "Describe your experience with both frontend and backend technologies.",
          answer: "On the frontend, I've worked with React, Vue.js, and Angular, implementing responsive designs with CSS frameworks like Bootstrap and Tailwind. On the backend, I've built REST and GraphQL APIs using Node.js, Django, and Spring Boot, and worked with databases including PostgreSQL, MongoDB, and Redis. I'm comfortable with the entire development lifecycle from setup to deployment using Docker and cloud services.",
          difficulty: "Intermediate"
        },
        {
          question: "How do you decide which framework to use for a project?",
          answer: "When choosing a framework, I consider: project requirements and complexity; team expertise and learning curve; community support and documentation; performance needs; long-term maintenance; scalability requirements; and integration with existing systems. For small projects with tight deadlines, I might choose familiar tools, while for larger strategic projects, I evaluate multiple options based on specific requirements and future scalability.",
          difficulty: "Intermediate"
        },
        {
          question: "Explain how you would optimize a website's performance.",
          answer: "To optimize website performance, I focus on: minimizing HTTP requests; enabling compression and caching; optimizing images and implementing lazy loading; code splitting and bundling JavaScript; using efficient CSS selectors; implementing CDN for static assets; optimizing critical rendering path; reducing server response time with database query optimization; and utilizing browser hints like preconnect and prefetch. I regularly measure performance using tools like Lighthouse and WebPageTest.",
          difficulty: "Advanced"
        },
        {
          question: "What's your approach to handling state in a web application?",
          answer: "My approach to state management depends on the application's complexity. For simpler apps, I might use React's Context API or Vue's Composition API. For complex applications, I prefer dedicated state management libraries like Redux or Vuex. I organize state logically, minimize unnecessary state, keep UI and application state separate, and implement proper data flow patterns to maintain predictability.",
          difficulty: "Advanced"
        },
        {
          question: "How do you ensure your code is secure?",
          answer: "I ensure code security by following best practices like input validation, proper authentication and authorization, parameterized queries to prevent SQL injection, XSS prevention through output encoding, implementing CSRF tokens, using secure HTTP headers, keeping dependencies updated, and following the principle of least privilege. I also perform regular security code reviews and stay updated on common vulnerabilities.",
          difficulty: "Basic"
        }
      ]
    };
    
    return [...commonQuestions, ...roleSpecificQuestions[role]];
  };

  const handleCopyQuestion = (index) => {
    navigator.clipboard.writeText(questions[index].question);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleAnswer = (index) => {
    setShowAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const saveQuestion = (question) => {
    if (!savedQuestions.some(q => q.question === question.question)) {
      setSavedQuestions([...savedQuestions, question]);
    }
  };

  const removeSavedQuestion = (index) => {
    setSavedQuestions(savedQuestions.filter((_, i) => i !== index));
  };

  const exportSavedQuestions = () => {
    const content = savedQuestions.map(q => 
      `Q: ${q.question}\nA: ${q.answer}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jobRole}_Interview_Questions.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredQuestions = difficultyFilter === 'All' 
    ? questions 
    : questions.filter(q => q.difficulty === difficultyFilter);

  useEffect(() => {
    fetchQuestions(jobRole);
  }, [jobRole]);

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">AI-Generated Interview Questions & Answers</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-md transition-colors duration-300 ${!showSaved ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setShowSaved(false)}
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Questions
        </button>
        <button 
          className={`px-4 py-2 rounded-md transition-colors duration-300 ${showSaved ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setShowSaved(true)}
        >
          <BookOpen className="w-4 h-4 inline mr-2" />
          Saved ({savedQuestions.length})
        </button>
      </div>
      
      {!showSaved ? (
        <>
          {/* Job Role Selector */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Job Role</label>
            <div className="relative">
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{jobRole}</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
              
              {dropdownOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {jobRoles.map((role) => (
                    <li
                      key={role}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setJobRole(role);
                        setDropdownOpen(false);
                      }}
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Generate Button */}
            <button
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              onClick={() => fetchQuestions(jobRole)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Generate New Questions
                </>
              )}
            </button>
            
            {/* Difficulty Filter */}
            <div className="relative">
              <select
                className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
              <Filter className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Questions Display */}
          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-md border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{question.question}</p>
                    <span className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                      question.difficulty === 'Basic' ? 'bg-green-100 text-green-800' :
                      question.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveQuestion(question)}
                      className="p-1 text-gray-500 hover:text-blue-600 focus:outline-none"
                      title="Save question"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleCopyQuestion(index)}
                      className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      title="Copy question"
                    >
                      {copiedIndex === index ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleAnswer(index)}
                  className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  {showAnswers[index] ? 'Hide Answer' : 'Show Answer'}
                </button>
                
                {showAnswers[index] && (
                  <div className="mt-3 p-3 bg-white border border-gray-200 rounded">
                    <p className="text-gray-700">{question.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Saved Questions</h3>
            {savedQuestions.length > 0 && (
              <button
                onClick={exportSavedQuestions}
                className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            )}
          </div>
          
          {savedQuestions.length === 0 ? (
            <div className="p-6 text-center bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-500">No saved questions yet. Save questions from the questions tab.</p>
            </div>
          ) : (
            savedQuestions.map((question, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-md border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{question.question}</p>
                    <span className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                      question.difficulty === 'Basic' ? 'bg-green-100 text-green-800' :
                      question.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={() => removeSavedQuestion(index)}
                    className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                    title="Remove saved question"
                  >
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
                
                <div className="mt-3 p-3 bg-white border border-gray-200 rounded">
                  <p className="text-gray-700">{question.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedInterviewQuestionsGenerator;