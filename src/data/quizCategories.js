export const quizCategories = [
    {
      category: "Time-Based Quizzes",
      description: "Quizzes scheduled or recurring over time.",
      quizzes: [
        { name: "Schedule Quiz", link: "/quiz/schedule",status:"willmaking" },
        { name: "One-Time Quiz", link: "/quiz/one-time" ,status:"available"},
        { name: "Daily Quiz", link: "/quiz/daily",status:"willmaking"  },
        { name: "Weekly Quiz", link: "/quiz/weekly",status:"willmaking"  },
        { name: "Monthly Quiz", link: "/quiz/monthly" },
        { name: "Timed Quiz", link: "/quiz/timed",status:"willmaking"  },
      ],
    },
    {
      category: "Purpose-Oriented Quizzes",
      description: "Quizzes designed with specific goals like learning or competition.",
      quizzes: [
        { name: "Practice Quiz", link: "/quiz/practice" ,status:"available"},
        { name: "Educational Quiz", link: "/quiz/educational",status:"willmaking"  },
        { name: "Competition Quiz", link: "/quiz/competition" },
        { name: "Team Quiz", link: "/quiz/team",status:"willmaking" },
        { name: "Feedback Quiz", link: "/quiz/feedback" ,status:"willmaking" },
      ],
    },
    {
      category: "Engagement & Opinion Quizzes",
      description: "Quizzes aimed at gathering opinions or entertaining users.",
      quizzes: [
        { name: "Survey Quiz", link: "/quiz/survey",status:"willmaking"  },
        { name: "Opinion Quiz/Poll", link: "/quiz/opinion",status:"willmaking" },
        { name: "Poll Quiz", link: "/quiz/poll" },
        { name: "Personality Quiz", link: "/quiz/personality" ,status:"willmaking" },
        { name: "Trivia Quiz", link: "/quiz/trivia" },
      ],
    },
    {
      category: "Customization & Advanced Quizzes",
      description: "Feature-rich quizzes with adaptive or customizable options.",
      quizzes: [
        { name: "Adaptive Quiz", link: "/quiz/adaptive" },
        { name: "One Question Quiz", link: "/quiz/one-question" ,status:"willmaking" },
        { name: "Custom Quiz", link: "/quiz/custom" },
        { name: "Instant Result Quiz", link: "/quiz/instant-result",status:"available" },
      ],
    },
  ];