// Event Templates Data
// Pre-defined templates with default values for different event types

export const EVENT_TEMPLATES = {
    CUSTOM: {
        id: 'custom',
        name: 'Custom Event',
        description: 'Start from scratch and create your unique event',
        icon: 'Sparkles',
        color: 'slate',
        gradient: 'from-slate-500 to-slate-700',
        fields: [],
        defaultValues: {}
    },

    HACKATHON: {
        id: 'hackathon',
        name: 'Hackathon',
        description: 'Coding competition for developers and tech enthusiasts',
        icon: 'Code2',
        color: 'blue',
        gradient: 'from-blue-500 to-indigo-600',
        category: 'Technology',
        tags: ['hackathon', 'coding', 'technology', 'competition', 'developers'],
        fields: [
            { name: 'teamSize', label: 'Team Size', type: 'select', options: ['1', '2', '3', '4', '5', '6'], default: '4' },
            { name: 'maxTeams', label: 'Maximum Teams', type: 'number', default: 50 },
            { name: 'duration', label: 'Duration (Hours)', type: 'select', options: ['12', '24', '36', '48', '72'], default: '24' },
            { name: 'themes', label: 'Hackathon Themes', type: 'tags', placeholder: 'Add themes (e.g., AI, Web3, FinTech)' },
            { name: 'prizePools', label: 'Prize Pool Details', type: 'textarea', placeholder: '1st Prize: ₹50,000\n2nd Prize: ₹30,000\n3rd Prize: ₹20,000' },
            { name: 'mentors', label: 'Number of Mentors', type: 'number', default: 10 },
            { name: 'judgingCriteria', label: 'Judging Criteria', type: 'textarea', placeholder: 'Innovation, Technical Complexity, Design, Presentation' },
            { name: 'techStack', label: 'Allowed Tech Stacks', type: 'tags', placeholder: 'Add allowed technologies' },
            { name: 'requirements', label: 'Participant Requirements', type: 'textarea', placeholder: 'Laptop, Valid College ID, etc.' }
        ],
        defaultValues: {
            title: 'Hackathon 2026',
            shortDescription: 'Build innovative solutions and compete for exciting prizes!',
            description: `Join us for an exciting hackathon where you'll collaborate with fellow developers, learn from industry mentors, and build innovative solutions to real-world problems.

**What to Expect:**
• 24 hours of intense coding
• Expert mentorship and guidance
• Networking with industry professionals
• Amazing prizes and swag

**Who Can Participate:**
• Students from any branch/year
• Beginners to advanced developers welcome
• Individual or team participation`,
            fee: 299,
            capacity: 200
        }
    },

    WORKSHOP: {
        id: 'workshop',
        name: 'Workshop',
        description: 'Hands-on learning session with expert guidance',
        icon: 'GraduationCap',
        color: 'purple',
        gradient: 'from-purple-500 to-pink-600',
        category: 'Workshop',
        tags: ['workshop', 'learning', 'hands-on', 'training', 'skill-development'],
        fields: [
            { name: 'instructor', label: 'Instructor Name', type: 'text', placeholder: 'Name of the instructor' },
            { name: 'instructorBio', label: 'Instructor Bio', type: 'textarea', placeholder: 'Brief bio of the instructor' },
            { name: 'skillLevel', label: 'Skill Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'], default: 'Beginner' },
            { name: 'prerequisites', label: 'Prerequisites', type: 'textarea', placeholder: 'What participants should know beforehand' },
            { name: 'topics', label: 'Topics Covered', type: 'tags', placeholder: 'Add topics that will be covered' },
            { name: 'materials', label: 'Materials Provided', type: 'textarea', placeholder: 'Notes, Certificates, Tools, etc.' },
            { name: 'takeaways', label: 'Key Takeaways', type: 'textarea', placeholder: 'What participants will learn' },
            { name: 'laptopRequired', label: 'Laptop Required?', type: 'toggle', default: true }
        ],
        defaultValues: {
            title: 'Workshop: [Topic Name]',
            shortDescription: 'Learn practical skills with hands-on exercises',
            description: `Join this intensive workshop to master practical skills with expert guidance.

**What You'll Learn:**
• Fundamentals and core concepts
• Hands-on practical exercises
• Real-world applications
• Best practices and tips

**Who Should Attend:**
• Students eager to learn new skills
• Professionals looking to upskill
• Anyone interested in the topic

**Certificate:** Participation certificate will be provided`,
            fee: 499,
            capacity: 50
        }
    },

    TECH_TALK: {
        id: 'tech_talk',
        name: 'Tech Talk / Seminar',
        description: 'Guest lecture or technical presentation',
        icon: 'Mic2',
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-600',
        category: 'Technology',
        tags: ['tech-talk', 'seminar', 'guest-lecture', 'keynote', 'presentation'],
        fields: [
            { name: 'speaker', label: 'Speaker Name', type: 'text', placeholder: 'Name of the speaker' },
            { name: 'speakerTitle', label: 'Speaker Title/Designation', type: 'text', placeholder: 'e.g., CTO at Google' },
            { name: 'speakerBio', label: 'Speaker Bio', type: 'textarea', placeholder: 'Brief bio of the speaker' },
            { name: 'speakerPhoto', label: 'Speaker Photo URL', type: 'text', placeholder: 'Link to speaker photo' },
            { name: 'topic', label: 'Talk Topic', type: 'text', placeholder: 'Main topic of the talk' },
            { name: 'agenda', label: 'Session Agenda', type: 'textarea', placeholder: 'Outline of the session' },
            { name: 'qnaSession', label: 'Q&A Session', type: 'toggle', default: true },
            { name: 'recordingAvailable', label: 'Recording Available?', type: 'toggle', default: false }
        ],
        defaultValues: {
            title: 'Tech Talk: [Topic]',
            shortDescription: 'Insights and knowledge from industry experts',
            description: `Join us for an insightful session with an industry expert.

**About the Session:**
Gain valuable insights and learn from real-world experiences shared by our distinguished speaker.

**What to Expect:**
• Deep dive into the topic
• Real-world examples and case studies
• Interactive Q&A session
• Networking opportunities`,
            fee: 0,
            capacity: 200
        }
    },

    CULTURAL_FEST: {
        id: 'cultural_fest',
        name: 'Cultural Fest',
        description: 'Music, dance, drama and cultural celebrations',
        icon: 'Music',
        color: 'orange',
        gradient: 'from-orange-500 to-red-600',
        category: 'Cultural',
        tags: ['cultural', 'music', 'dance', 'drama', 'art', 'celebration'],
        fields: [
            { name: 'eventTypes', label: 'Event Categories', type: 'multiselect', options: ['Solo Singing', 'Group Singing', 'Solo Dance', 'Group Dance', 'Drama', 'Stand-up Comedy', 'Fashion Show', 'Art Exhibition', 'Poetry', 'Debate'] },
            { name: 'performances', label: 'Number of Performances', type: 'number', default: 20 },
            { name: 'judges', label: 'Judges Panel', type: 'textarea', placeholder: 'Names and credentials of judges' },
            { name: 'prizes', label: 'Prizes for Each Category', type: 'textarea', placeholder: 'Prize details for winners' },
            { name: 'dressCode', label: 'Dress Code', type: 'text', placeholder: 'e.g., Traditional, Formal, Casual' },
            { name: 'foodStalls', label: 'Food Stalls Available?', type: 'toggle', default: true },
            { name: 'schedule', label: 'Event Schedule', type: 'textarea', placeholder: 'Timeline of performances and activities' }
        ],
        defaultValues: {
            title: 'Cultural Night 2026',
            shortDescription: 'Celebrate talent with music, dance, and more!',
            description: `Experience an evening of incredible performances and cultural celebrations!

**Highlights:**
• Mesmerizing music performances
• Spectacular dance shows
• Dramatic plays and skits
• Stand-up comedy
• Food and fun

**Participate or Watch:**
Register to perform or come watch and enjoy the festivities!`,
            fee: 149,
            capacity: 500
        }
    },

    SPORTS_EVENT: {
        id: 'sports_event',
        name: 'Sports Event',
        description: 'Athletics, tournaments and sports competitions',
        icon: 'Trophy',
        color: 'green',
        gradient: 'from-green-500 to-emerald-600',
        category: 'Sports',
        tags: ['sports', 'athletics', 'tournament', 'competition', 'fitness'],
        fields: [
            { name: 'sportType', label: 'Sport Type', type: 'select', options: ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Badminton', 'Table Tennis', 'Chess', 'Athletics', 'Kabaddi', 'Multiple Sports'], default: 'Cricket' },
            { name: 'teamSize', label: 'Team Size', type: 'number', default: 11 },
            { name: 'maxTeams', label: 'Maximum Teams/Participants', type: 'number', default: 16 },
            { name: 'format', label: 'Tournament Format', type: 'select', options: ['Knockout', 'League', 'Round Robin', 'Mixed'], default: 'Knockout' },
            { name: 'prizes', label: 'Prizes', type: 'textarea', placeholder: 'Winner Trophy, Runner-up Medal, etc.' },
            { name: 'eligibility', label: 'Eligibility Criteria', type: 'textarea', placeholder: 'Age limit, college students only, etc.' },
            { name: 'equipment', label: 'Equipment Provided?', type: 'toggle', default: true },
            { name: 'refreshments', label: 'Refreshments Provided?', type: 'toggle', default: true }
        ],
        defaultValues: {
            title: 'Sports Meet 2026',
            shortDescription: 'Compete, play, and showcase your athletic skills!',
            description: `Get ready for an exciting sports competition!

**Events:**
• Multiple sport categories
• Individual and team events
• Exciting prizes for winners

**Who Can Participate:**
• All college students welcome
• Prior experience not mandatory
• Competitive spirit required!`,
            fee: 0,
            capacity: 500
        }
    },

    COMPETITION: {
        id: 'competition',
        name: 'Competition',
        description: 'Quiz, debate, coding contests and more',
        icon: 'Award',
        color: 'amber',
        gradient: 'from-amber-500 to-yellow-600',
        category: 'Competition',
        tags: ['competition', 'contest', 'quiz', 'debate', 'challenge'],
        fields: [
            { name: 'competitionType', label: 'Competition Type', type: 'select', options: ['Quiz', 'Debate', 'Coding Contest', 'Case Study', 'Business Plan', 'Paper Presentation', 'Project Exhibition', 'Photography', 'Video Making', 'Other'], default: 'Quiz' },
            { name: 'rounds', label: 'Number of Rounds', type: 'number', default: 3 },
            { name: 'roundDetails', label: 'Round Details', type: 'textarea', placeholder: 'Describe each round' },
            { name: 'teamSize', label: 'Team Size', type: 'select', options: ['1 (Individual)', '2', '3', '4', '5'], default: '1 (Individual)' },
            { name: 'prizes', label: 'Prizes', type: 'textarea', placeholder: 'Prizes for winners' },
            { name: 'rules', label: 'Competition Rules', type: 'textarea', placeholder: 'Rules and guidelines' },
            { name: 'judgingCriteria', label: 'Judging Criteria', type: 'textarea', placeholder: 'How participants will be evaluated' }
        ],
        defaultValues: {
            title: 'Competition: [Name]',
            shortDescription: 'Test your skills and compete for glory!',
            description: `Showcase your talent and compete against the best!

**Competition Format:**
• Multiple rounds of increasing difficulty
• Fair and transparent judging
• Exciting prizes for winners

**What You Need:**
• Knowledge and preparation
• Team (if applicable)
• Competitive spirit!`,
            fee: 99,
            capacity: 100
        }
    },

    NETWORKING: {
        id: 'networking',
        name: 'Networking Event',
        description: 'Meet and connect with professionals',
        icon: 'Users',
        color: 'cyan',
        gradient: 'from-cyan-500 to-blue-600',
        category: 'Networking',
        tags: ['networking', 'meetup', 'connect', 'professionals', 'career'],
        fields: [
            { name: 'focus', label: 'Networking Focus', type: 'select', options: ['Industry Professionals', 'Startups', 'Alumni', 'Recruiters', 'General'], default: 'General' },
            { name: 'companies', label: 'Participating Companies/People', type: 'textarea', placeholder: 'List of companies or professionals attending' },
            { name: 'activities', label: 'Activities', type: 'multiselect', options: ['Speed Networking', 'Panel Discussion', 'Keynote', 'Informal Meetup', 'Career Fair', 'Startup Pitches'] },
            { name: 'resumeRequired', label: 'Resume Required?', type: 'toggle', default: false },
            { name: 'dressCode', label: 'Dress Code', type: 'text', placeholder: 'Business Casual, Formal, etc.' },
            { name: 'refreshments', label: 'Refreshments', type: 'toggle', default: true }
        ],
        defaultValues: {
            title: 'Networking Meetup',
            shortDescription: 'Connect with industry professionals and expand your network',
            description: `Expand your professional network at this exclusive meetup!

**What to Expect:**
• Meet industry professionals
• Learn about career opportunities
• Build valuable connections
• Get career advice

**Who Should Attend:**
• Final year students
• Job seekers
• Career changers
• Anyone looking to network`,
            fee: 0,
            capacity: 100
        }
    },

    BOOTCAMP: {
        id: 'bootcamp',
        name: 'Bootcamp',
        description: 'Intensive multi-day learning program',
        icon: 'Rocket',
        color: 'rose',
        gradient: 'from-rose-500 to-pink-600',
        category: 'Workshop',
        tags: ['bootcamp', 'intensive', 'training', 'learning', 'skill-building'],
        fields: [
            { name: 'duration', label: 'Duration (Days)', type: 'select', options: ['3', '5', '7', '10', '14', '30'], default: '5' },
            { name: 'dailyHours', label: 'Daily Hours', type: 'select', options: ['4', '6', '8'], default: '6' },
            { name: 'curriculum', label: 'Curriculum Overview', type: 'textarea', placeholder: 'Day-wise breakdown of topics' },
            { name: 'instructors', label: 'Instructors', type: 'textarea', placeholder: 'Names and bios of instructors' },
            { name: 'projects', label: 'Projects Included', type: 'textarea', placeholder: 'Hands-on projects participants will build' },
            { name: 'certification', label: 'Certification Provided?', type: 'toggle', default: true },
            { name: 'placementAssistance', label: 'Placement Assistance?', type: 'toggle', default: false },
            { name: 'materials', label: 'Materials/Resources', type: 'textarea', placeholder: 'What participants will receive' }
        ],
        defaultValues: {
            title: 'Bootcamp: [Technology/Skill]',
            shortDescription: 'Intensive learning program to master new skills',
            description: `Transform your skills with our intensive bootcamp!

**Program Highlights:**
• Comprehensive curriculum
• Hands-on projects
• Expert instructors
• Industry-relevant skills
• Certification upon completion

**What You'll Build:**
• Real-world projects
• Portfolio pieces
• Practical experience`,
            fee: 2999,
            capacity: 30
        }
    },

    WEBINAR: {
        id: 'webinar',
        name: 'Webinar',
        description: 'Online session or virtual event',
        icon: 'Video',
        color: 'violet',
        gradient: 'from-violet-500 to-purple-600',
        category: 'Technology',
        tags: ['webinar', 'online', 'virtual', 'live', 'streaming'],
        fields: [
            { name: 'platform', label: 'Platform', type: 'select', options: ['Zoom', 'Google Meet', 'Microsoft Teams', 'YouTube Live', 'Custom'], default: 'Zoom' },
            { name: 'meetingLink', label: 'Meeting Link', type: 'text', placeholder: 'Link will be shared with registrants' },
            { name: 'speaker', label: 'Speaker Name', type: 'text', placeholder: 'Name of the speaker' },
            { name: 'speakerBio', label: 'Speaker Bio', type: 'textarea', placeholder: 'Brief bio of the speaker' },
            { name: 'duration', label: 'Duration (Minutes)', type: 'select', options: ['30', '45', '60', '90', '120'], default: '60' },
            { name: 'recordingAvailable', label: 'Recording Available?', type: 'toggle', default: true },
            { name: 'qnaSession', label: 'Q&A Session', type: 'toggle', default: true },
            { name: 'materialProvided', label: 'Materials Provided?', type: 'toggle', default: true }
        ],
        defaultValues: {
            title: 'Webinar: [Topic]',
            shortDescription: 'Join us online for an interactive session',
            description: `Attend this virtual session from the comfort of your home!

**Session Details:**
• Live interactive webinar
• Expert speaker
• Q&A session at the end
• Recording available for registered participants

**How to Join:**
Meeting link will be shared via email before the event`,
            fee: 0,
            capacity: 500
        }
    },

    CONFERENCE: {
        id: 'conference',
        name: 'Conference',
        description: 'Multi-session event with multiple speakers',
        icon: 'Building',
        color: 'indigo',
        gradient: 'from-indigo-500 to-blue-600',
        category: 'Seminar',
        tags: ['conference', 'summit', 'symposium', 'multi-track', 'keynote'],
        fields: [
            { name: 'theme', label: 'Conference Theme', type: 'text', placeholder: 'Main theme of the conference' },
            { name: 'tracks', label: 'Number of Tracks', type: 'number', default: 3 },
            { name: 'sessions', label: 'Total Sessions', type: 'number', default: 15 },
            { name: 'keynoteSpeakers', label: 'Keynote Speakers', type: 'textarea', placeholder: 'List of keynote speakers' },
            { name: 'schedule', label: 'Day-wise Schedule', type: 'textarea', placeholder: 'Session schedule' },
            { name: 'sponsors', label: 'Sponsors', type: 'textarea', placeholder: 'List of sponsors' },
            { name: 'lunch', label: 'Lunch Provided?', type: 'toggle', default: true },
            { name: 'kitProvided', label: 'Conference Kit Provided?', type: 'toggle', default: true }
        ],
        defaultValues: {
            title: 'Conference 2026: [Theme]',
            shortDescription: 'Multi-day event with industry leaders and experts',
            description: `Join us for an immersive conference experience!

**What's in Store:**
• Keynote sessions by industry leaders
• Multiple parallel tracks
• Panel discussions
• Networking breaks
• Exhibition area

**Who Should Attend:**
• Professionals and students
• Industry enthusiasts
• Anyone seeking knowledge and networking`,
            fee: 999,
            capacity: 300
        }
    },

    ANNUAL_FEST: {
        id: 'annual_fest',
        name: 'Annual Fest / College Fest',
        description: 'Large-scale college festival with multiple events',
        icon: 'PartyPopper',
        color: 'pink',
        gradient: 'from-pink-500 to-rose-600',
        category: 'Cultural',
        tags: ['fest', 'annual', 'college-fest', 'celebration', 'multiple-events'],
        fields: [
            { name: 'festName', label: 'Fest Name', type: 'text', placeholder: 'e.g., Technovanza, Mood Indigo' },
            { name: 'duration', label: 'Duration (Days)', type: 'select', options: ['1', '2', '3', '4', '5'], default: '3' },
            { name: 'categories', label: 'Event Categories', type: 'multiselect', options: ['Technical', 'Cultural', 'Sports', 'Gaming', 'Literary', 'Art', 'Music', 'Dance', 'Fashion', 'Food'] },
            { name: 'totalEvents', label: 'Total Number of Events', type: 'number', default: 50 },
            { name: 'proCelebrity', label: 'Pro Night Celebrity', type: 'text', placeholder: 'Celebrity performer (if any)' },
            { name: 'sponsors', label: 'Sponsors', type: 'textarea', placeholder: 'List of sponsors' },
            { name: 'externalAllowed', label: 'External Participation?', type: 'toggle', default: true },
            { name: 'accommodationAvailable', label: 'Accommodation Available?', type: 'toggle', default: false }
        ],
        defaultValues: {
            title: 'Annual Fest 2026',
            shortDescription: 'The biggest college festival of the year!',
            description: `Get ready for the most awaited event of the year!

**Highlights:**
• 50+ exciting events across categories
• Celebrity pro night performance
• Inter-college competitions
• Food stalls and entertainment
• Amazing prizes worth lakhs

**Categories:**
• Technical events
• Cultural performances
• Sports tournaments
• Gaming competitions
• And much more!`,
            fee: 499,
            capacity: 2000
        }
    },

    EXHIBITION: {
        id: 'exhibition',
        name: 'Exhibition / Expo',
        description: 'Showcase projects, products, or artwork',
        icon: 'Presentation',
        color: 'teal',
        gradient: 'from-teal-500 to-cyan-600',
        category: 'Technology',
        tags: ['exhibition', 'expo', 'showcase', 'projects', 'demo'],
        fields: [
            { name: 'exhibitionType', label: 'Exhibition Type', type: 'select', options: ['Project Exhibition', 'Art Exhibition', 'Science Exhibition', 'Startup Expo', 'Career Fair', 'Product Launch', 'Trade Fair'], default: 'Project Exhibition' },
            { name: 'totalStalls', label: 'Total Stalls/Booths', type: 'number', default: 30 },
            { name: 'exhibitors', label: 'Exhibitors', type: 'textarea', placeholder: 'List of exhibitors/participants' },
            { name: 'judgingRequired', label: 'Judging Required?', type: 'toggle', default: true },
            { name: 'prizes', label: 'Prizes', type: 'textarea', placeholder: 'Prizes for best exhibits' },
            { name: 'openForPublic', label: 'Open for Public?', type: 'toggle', default: true },
            { name: 'timing', label: 'Exhibition Hours', type: 'text', placeholder: 'e.g., 10 AM - 6 PM' }
        ],
        defaultValues: {
            title: 'Project Exhibition 2026',
            shortDescription: 'Showcasing innovation and creativity',
            description: `Explore amazing projects and innovations!

**What to See:**
• Innovative student projects
• Cutting-edge technology demos
• Creative solutions to real problems
• Interactive exhibits

**Participate:**
• Display your project
• Get feedback from judges
• Win exciting prizes`,
            fee: 0,
            capacity: 500
        }
    },

    ORIENTATION: {
        id: 'orientation',
        name: 'Orientation / Welcome Event',
        description: 'Welcome session for new students or members',
        icon: 'HandWaving',
        color: 'sky',
        gradient: 'from-sky-500 to-blue-600',
        category: 'Seminar',
        tags: ['orientation', 'welcome', 'introduction', 'freshers', 'induction'],
        fields: [
            { name: 'targetAudience', label: 'Target Audience', type: 'select', options: ['Freshers', 'New Members', 'New Employees', 'Club Members', 'All'], default: 'Freshers' },
            { name: 'agenda', label: 'Session Agenda', type: 'textarea', placeholder: 'Topics to be covered' },
            { name: 'speakers', label: 'Speakers/Presenters', type: 'textarea', placeholder: 'Who will be speaking' },
            { name: 'campusTour', label: 'Campus Tour Included?', type: 'toggle', default: true },
            { name: 'refreshments', label: 'Refreshments Provided?', type: 'toggle', default: true },
            { name: 'kitProvided', label: 'Welcome Kit Provided?', type: 'toggle', default: true }
        ],
        defaultValues: {
            title: 'Fresher\'s Orientation 2026',
            shortDescription: 'Welcome to our college family!',
            description: `A warm welcome awaits you!

**Session Includes:**
• Introduction to college life
• Meet the faculty and seniors
• Campus tour
• Club and committee introductions
• Q&A session

**What You'll Get:**
• Welcome kit
• Important information
• Refreshments`,
            fee: 0,
            capacity: 500
        }
    },

    PLACEMENT_DRIVE: {
        id: 'placement_drive',
        name: 'Placement Drive / Job Fair',
        description: 'Recruitment event with companies',
        icon: 'Briefcase',
        color: 'slate',
        gradient: 'from-slate-600 to-gray-800',
        category: 'Networking',
        tags: ['placement', 'recruitment', 'job-fair', 'career', 'hiring'],
        fields: [
            { name: 'companies', label: 'Participating Companies', type: 'textarea', placeholder: 'List of companies' },
            { name: 'positions', label: 'Positions Available', type: 'textarea', placeholder: 'Types of roles being offered' },
            { name: 'eligibility', label: 'Eligibility Criteria', type: 'textarea', placeholder: 'Who can apply' },
            { name: 'rounds', label: 'Selection Rounds', type: 'textarea', placeholder: 'e.g., Aptitude, Technical, HR' },
            { name: 'documentsRequired', label: 'Documents Required', type: 'textarea', placeholder: 'Resume, ID, Marksheets, etc.' },
            { name: 'dressCode', label: 'Dress Code', type: 'text', placeholder: 'Formal' },
            { name: 'preRegistrationRequired', label: 'Pre-registration Required?', type: 'toggle', default: true }
        ],
        defaultValues: {
            title: 'Campus Placement Drive 2026',
            shortDescription: 'Top companies recruiting on campus',
            description: `Your gateway to career opportunities!

**Participating Companies:**
• Top MNCs and startups
• Multiple roles available
• Competitive packages

**Selection Process:**
• Aptitude Test
• Technical Interview
• HR Interview

**Eligibility:**
• Final year students
• Minimum CGPA requirement
• No active backlogs`,
            fee: 0,
            capacity: 200
        }
    },

    GAMING_EVENT: {
        id: 'gaming_event',
        name: 'Gaming Tournament',
        description: 'Esports and gaming competitions',
        icon: 'Gamepad2',
        color: 'fuchsia',
        gradient: 'from-fuchsia-500 to-purple-600',
        category: 'Competition',
        tags: ['gaming', 'esports', 'tournament', 'competition', 'lan'],
        fields: [
            { name: 'games', label: 'Games', type: 'multiselect', options: ['Valorant', 'CS:GO', 'BGMI', 'Free Fire', 'FIFA', 'Tekken', 'Call of Duty', 'Minecraft', 'Among Us', 'Other'] },
            { name: 'format', label: 'Tournament Format', type: 'select', options: ['Solo', 'Duo', 'Squad', 'Mixed'], default: 'Squad' },
            { name: 'platform', label: 'Platform', type: 'select', options: ['PC', 'Mobile', 'Console', 'Mixed'], default: 'PC' },
            { name: 'maxTeams', label: 'Maximum Teams', type: 'number', default: 32 },
            { name: 'prizePool', label: 'Prize Pool', type: 'textarea', placeholder: 'Prize distribution' },
            { name: 'rules', label: 'Tournament Rules', type: 'textarea', placeholder: 'Rules and regulations' },
            { name: 'streamingLive', label: 'Live Streaming?', type: 'toggle', default: true },
            { name: 'byodRequired', label: 'BYOD (Bring Your Own Device)?', type: 'toggle', default: true }
        ],
        defaultValues: {
            title: 'Gaming Tournament 2026',
            shortDescription: 'Battle it out for gaming glory!',
            description: `The ultimate gaming showdown is here!

**Games Featured:**
• Multiple popular games
• Solo and team competitions
• Exciting prize pool

**What to Expect:**
• Competitive gameplay
• Live streaming
• Gaming zone
• Prizes and swag`,
            fee: 199,
            capacity: 128
        }
    }
};

// Banner/Poster specifications
export const BANNER_SPECS = {
    recommendedRatio: '210:297', // A4 ratio
    minWidth: 595, // A4 at 72 DPI
    minHeight: 842,
    maxWidth: 2480, // A4 at 300 DPI
    maxHeight: 3508,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    aspectRatio: 0.707 // Width/Height for A4
};

// Event categories list
export const EVENT_CATEGORIES = [
    'Technology',
    'Cultural',
    'Sports',
    'Workshop',
    'Competition',
    'Networking',
    'Seminar',
    'Other'
];

// Get template by ID
export const getTemplateById = (id) => {
    return Object.values(EVENT_TEMPLATES).find(template => template.id === id);
};

// Get all templates except custom
export const getEventTemplates = () => {
    return Object.values(EVENT_TEMPLATES).filter(t => t.id !== 'custom');
};

export default EVENT_TEMPLATES;
